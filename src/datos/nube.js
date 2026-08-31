import { useEffect, useState, useCallback } from 'react';
import {
  onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut,
} from 'firebase/auth';
import {
  doc, getDoc, setDoc, deleteDoc, collection, onSnapshot,
  query, orderBy, limit, getDocs, addDoc, arrayUnion, updateDoc, documentId, where,
} from 'firebase/firestore';
import { auth, db, proveedorGoogle } from '../firebase';

/* ------------------------------ sesión ------------------------------ */
// Casos en los que el navegador no deja abrir la ventana emergente de Google.
// Pasa sobre todo en la PWA instalada en iPhone, donde Safari corre en modo standalone.
const SIN_VENTANA = new Set([
  'auth/popup-blocked',
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
  'auth/operation-not-supported-in-this-environment',
]);

export function useSesion() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Si volvemos de la redirección de Google, esto recoge el resultado.
    getRedirectResult(auth).catch(() => {});
    return onAuthStateChanged(auth, (u) => { setUsuario(u); setCargando(false); });
  }, []);

  // Único método: cuenta de Google. Primero ventana emergente; si el navegador
  // la bloquea, se reintenta redirigiendo la pestaña completa.
  const entrar = useCallback(async () => {
    try {
      await signInWithPopup(auth, proveedorGoogle);
    } catch (e) {
      if (SIN_VENTANA.has(e?.code)) {
        await signInWithRedirect(auth, proveedorGoogle);
        return;
      }
      throw e;
    }
  }, []);

  const salir = useCallback(() => signOut(auth), []);

  return { usuario, cargando, entrar, salir };
}

/* ------------------------------- hogar ------------------------------- */
// Un "hogar" agrupa a la familia: los dos adultos ven y editan el mismo plan.
export function useHogar(usuario) {
  const [hogarId, setHogarId] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!usuario) { setHogarId(null); setCargando(false); return; }
    setCargando(true);
    return onSnapshot(doc(db, 'usuarios', usuario.uid), (s) => {
      setHogarId(s.exists() ? s.data().hogarId : null);
      setCargando(false);
    }, () => setCargando(false));
  }, [usuario]);

  const crearHogar = useCallback(async (nombre) => {
    const ref = await addDoc(collection(db, 'hogares'), {
      nombre: nombre || 'Mi familia',
      miembros: [usuario.uid],
      creado: new Date().toISOString(),
    });
    await setDoc(doc(db, 'usuarios', usuario.uid), {
      hogarId: ref.id,
      nombre: usuario.displayName || '',
      correo: usuario.email || '',
    });
    return ref.id;
  }, [usuario]);

  const unirseHogar = useCallback(async (codigo) => {
    const id = codigo.trim();
    const snap = await getDoc(doc(db, 'hogares', id));
    if (!snap.exists()) throw new Error('Ese código de hogar no existe. Revísalo con quien lo creó.');
    await updateDoc(doc(db, 'hogares', id), { miembros: arrayUnion(usuario.uid) });
    await setDoc(doc(db, 'usuarios', usuario.uid), {
      hogarId: id,
      nombre: usuario.displayName || '',
      correo: usuario.email || '',
    });
    return id;
  }, [usuario]);

  return { hogarId, cargando, crearHogar, unirseHogar };
}

/* ------------------------------ semana ------------------------------ */
// coleccion: 'semanas' para el plan de los adultos, 'semanas_hija' para el de la niña.
export function useSemana(hogarId, clave, coleccion = 'semanas') {
  const [semana, setSemana] = useState({ plan: {}, compras: {} });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!hogarId) return;
    setCargando(true);
    return onSnapshot(doc(db, 'hogares', hogarId, coleccion, clave), (s) => {
      setSemana(s.exists() ? { plan: s.data().plan || {}, compras: s.data().compras || {} } : { plan: {}, compras: {} });
      setCargando(false);
    }, () => setCargando(false));
  }, [hogarId, clave, coleccion]);

  const guardar = useCallback(async (plan, compras) => {
    await setDoc(doc(db, 'hogares', hogarId, coleccion, clave), {
      plan, compras: compras || {}, actualizado: new Date().toISOString(),
    });
  }, [hogarId, clave, coleccion]);

  return { semana, cargando, guardar };
}

/* ----------------------------- historial ----------------------------- */
export function useHistorial(hogarId) {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    if (!hogarId) return;
    const q = query(collection(db, 'hogares', hogarId, 'historial'), orderBy('ts', 'desc'), limit(300));
    return onSnapshot(q, (s) => setHistorial(s.docs.map((d) => ({ _id: d.id, ...d.data() }))));
  }, [hogarId]);

  // Un registro por perfil+fecha+tiempo de comida: si se corrige, se sobrescribe.
  const registrar = useCallback(async (entrada) => {
    const id = `${entrada.perfil || 'adultos'}_${entrada.fecha}_${entrada.tipo}`;
    await setDoc(doc(db, 'hogares', hogarId, 'historial', id), entrada);
  }, [hogarId]);

  const quitar = useCallback(async (fecha, tipo, perfil = 'adultos') => {
    await deleteDoc(doc(db, 'hogares', hogarId, 'historial', `${perfil}_${fecha}_${tipo}`)).catch(() => {});
  }, [hogarId]);

  const vaciar = useCallback(async () => {
    const s = await getDocs(collection(db, 'hogares', hogarId, 'historial'));
    await Promise.all(s.docs.map((d) => deleteDoc(d.ref)));
  }, [hogarId]);

  return { historial, registrar, quitar, vaciar };
}

/* --------------------------- recetas propias --------------------------- */
export function useRecetasPropias(hogarId) {
  const [propias, setPropias] = useState([]);

  useEffect(() => {
    if (!hogarId) return;
    return onSnapshot(collection(db, 'hogares', hogarId, 'recetas'),
      (s) => setPropias(s.docs.map((d) => ({ ...d.data(), id: d.id, propia: true }))));
  }, [hogarId]);

  const agregar = useCallback((r) => addDoc(collection(db, 'hogares', hogarId, 'recetas'), r), [hogarId]);
  const borrar = useCallback((id) => deleteDoc(doc(db, 'hogares', hogarId, 'recetas', id)), [hogarId]);

  return { propias, agregar, borrar };
}

/* ---------------------- pauta de la nutricionista ---------------------- */
export function usePauta(hogarId) {
  const [pauta, setPauta] = useState(null);

  useEffect(() => {
    if (!hogarId) return;
    return onSnapshot(doc(db, 'hogares', hogarId, 'config', 'pauta'),
      (s) => setPauta(s.exists() ? s.data() : null));
  }, [hogarId]);

  const guardar = useCallback((p) => setDoc(doc(db, 'hogares', hogarId, 'config', 'pauta'), p), [hogarId]);
  const quitar = useCallback(() => deleteDoc(doc(db, 'hogares', hogarId, 'config', 'pauta')), [hogarId]);

  return { pauta, guardar, quitar };
}

/* ------------------- semanas de un mes (vista mensual) ------------------- */
export async function semanasEnRango(hogarId, desde, hasta, coleccion = 'semanas') {
  const q = query(
    collection(db, 'hogares', hogarId, coleccion),
    where(documentId(), '>=', desde),
    where(documentId(), '<=', hasta),
  );
  const s = await getDocs(q);
  return s.docs.map((d) => ({ clave: d.id, ...d.data() }));
}
