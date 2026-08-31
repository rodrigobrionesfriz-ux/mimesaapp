import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Calendar, CalendarDays, ShoppingCart, BookOpen, History as HistoryIcon,
  FileText, Sun, Moon, LogOut, Menu, X,
} from 'lucide-react';

import { RECETARIO } from './datos/recetas';
import { TIPOS, iso, sumarDias, lunesDe, barajar, diaVacio } from './utiles';
import {
  useSesion, useHogar, useSemana, useHistorial, useRecetasPropias, usePauta,
} from './datos/nube';

import { Entrar, ElegirHogar } from './componentes/Acceso';
import Semana from './componentes/Semana';
import Mes from './componentes/Mes';
import Compras from './componentes/Compras';
import Recetas from './componentes/Recetas';
import Historial from './componentes/Historial';
import Pauta from './componentes/Pauta';
import HojaComida from './componentes/HojaComida';

const SECCIONES = [
  { k: 'semana', label: 'Semana', Icono: Calendar },
  { k: 'mes', label: 'Mes', Icono: CalendarDays },
  { k: 'compras', label: 'Compras', Icono: ShoppingCart },
  { k: 'recetas', label: 'Recetas', Icono: BookOpen },
  { k: 'historial', label: 'Historial', Icono: HistoryIcon },
  { k: 'pauta', label: 'Pauta', Icono: FileText },
];

function useTema() {
  const [tema, setTema] = useState(() => document.documentElement.dataset.tema || 'claro');
  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    localStorage.setItem('mimesa:tema', tema);
  }, [tema]);
  return [tema, () => setTema((t) => (t === 'claro' ? 'oscuro' : 'claro'))];
}

// A partir de 900px la barra lateral queda fija y el botón de menú desaparece.
function usePantallaAncha() {
  const [ancha, setAncha] = useState(() => window.matchMedia('(min-width: 900px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const cambio = (e) => setAncha(e.matches);
    mq.addEventListener('change', cambio);
    return () => mq.removeEventListener('change', cambio);
  }, []);
  return ancha;
}

export default function App() {
  const [tema, alternarTema] = useTema();
  const { usuario, cargando: cargandoSesion, entrar, salir } = useSesion();
  const { hogarId, cargando: cargandoHogar, crearHogar, unirseHogar } = useHogar(usuario);

  if (cargandoSesion || (usuario && cargandoHogar)) {
    return <div className="centro-pantalla">Abriendo la cocina…</div>;
  }
  if (!usuario) return <Entrar onEntrar={entrar} />;
  if (!hogarId) return <ElegirHogar onCrear={crearHogar} onUnirse={unirseHogar} onSalir={salir} />;

  return (
    <Aplicacion
      hogarId={hogarId} usuario={usuario} onSalir={salir}
      tema={tema} alternarTema={alternarTema}
    />
  );
}

function Aplicacion({ hogarId, usuario, onSalir, tema, alternarTema }) {
  const [seccion, setSeccion] = useState('semana');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [inicio, setInicio] = useState(() => lunesDe(new Date()));
  const [modal, setModal] = useState(null);
  const [brindis, setBrindis] = useState(null);
  const [generando, setGenerando] = useState(false);
  const anchaFija = usePantallaAncha();

  // Escape cierra el menú; en pantalla ancha nunca está en modo cajón.
  useEffect(() => {
    if (!menuAbierto) return;
    const esc = (e) => e.key === 'Escape' && setMenuAbierto(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [menuAbierto]);

  useEffect(() => { if (anchaFija) setMenuAbierto(false); }, [anchaFija]);

  const claveSemana = iso(inicio);
  const { semana, guardar } = useSemana(hogarId, claveSemana);
  const { historial, registrar, quitar, vaciar } = useHistorial(hogarId);
  const { propias, agregar, borrar } = useRecetasPropias(hogarId);
  const { pauta, guardar: guardarPauta, quitar: quitarPauta } = usePauta(hogarId);

  const recetas = useMemo(() => [...RECETARIO, ...propias], [propias]);
  const porId = useMemo(() => Object.fromEntries(recetas.map((r) => [r.id, r])), [recetas]);
  const fechas = useMemo(() => Array.from({ length: 7 }, (_, i) => sumarDias(inicio, i)), [inicio]);

  const avisar = useCallback((t) => {
    setBrindis(t);
    setTimeout(() => setBrindis(null), 2400);
  }, []);

  /* ---------------- generación automática de la semana ---------------- */
  const generar = async () => {
    setGenerando(true);
    const rondas = {};
    for (const t of TIPOS) rondas[t.k] = barajar(recetas.filter((r) => r.t === t.k));

    const plan = {};
    fechas.forEach((f, i) => {
      const dia = diaVacio();
      for (const t of TIPOS) {
        const lista = rondas[t.k];
        if (!lista.length) continue;
        let r = lista[i % lista.length];
        // De lunes a viernes se privilegian preparaciones cortas.
        if (i < 5 && r.min > 40) r = lista.find((x) => x.min <= 35) || r;
        dia[t.k] = { id: r.id, estado: 'planificado', real: null, motivo: null };
      }
      plan[iso(f)] = dia;
    });

    // Garantiza al menos 4 preparaciones con legumbre camuflada por semana.
    const contarOcultas = () => Object.values(plan)
      .reduce((n, d) => n + TIPOS.filter((t) => porId[d[t.k]?.id]?.leg === 'oculta').length, 0);
    const ocultas = barajar(recetas.filter((r) => r.leg === 'oculta'));
    let k = 0;
    while (contarOcultas() < 4 && k < ocultas.length) {
      const r = ocultas[k++];
      const libres = fechas.map(iso).filter((f) => porId[plan[f][r.t]?.id]?.leg !== 'oculta');
      if (libres.length) {
        const f = libres[Math.floor(Math.random() * libres.length)];
        plan[f][r.t] = { id: r.id, estado: 'planificado', real: null, motivo: null };
      }
    }

    await guardar(plan, {});
    setGenerando(false);
    avisar('Semana generada');
  };

  /* ------------------- registro de lo realmente preparado ------------------- */
  const marcar = async (fecha, tipo, estado, real, motivo) => {
    const plan = { ...semana.plan };
    const dia = { ...(plan[fecha] || diaVacio()) };
    const previo = dia[tipo];
    if (!previo) return;

    dia[tipo] = {
      ...previo, estado,
      real: real || null,
      motivo: motivo || null,
      marcado: new Date().toISOString(),
      por: usuario.displayName || usuario.email || '',
    };
    plan[fecha] = dia;
    await guardar(plan, semana.compras);

    if (estado === 'cumplido') {
      await quitar(fecha, tipo);
    } else {
      await registrar({
        fecha, tipo, estado,
        motivo: motivo || 'Sin motivo',
        sugerido: porId[previo.id]?.n || '—',
        real: estado === 'omitido' ? null : (real || 'Otra preparación'),
        por: usuario.displayName || '',
        ts: new Date().toISOString(),
      });
    }

    setModal(null);
    avisar(estado === 'cumplido' ? 'Registrado como preparado' : 'Discrepancia registrada');
  };

  const cambiarSugerencia = async (fecha, tipo, id) => {
    const plan = { ...semana.plan };
    const dia = { ...(plan[fecha] || diaVacio()) };
    dia[tipo] = { id, estado: 'planificado', real: null, motivo: null };
    plan[fecha] = dia;
    await guardar(plan, semana.compras);
    await quitar(fecha, tipo);
  };

  const marcarCompra = (ing) =>
    guardar(semana.plan, { ...semana.compras, [ing]: !semana.compras[ing] });

  const slotActivo = modal ? semana.plan[modal.fecha]?.[modal.tipo] : null;
  const seccionActual = SECCIONES.find((s) => s.k === seccion);

  const irA = (k) => { setSeccion(k); setMenuAbierto(false); };

  return (
    <div className="app">
      {menuAbierto && <div className="velo-menu" onClick={() => setMenuAbierto(false)} />}

      <aside className={`lateral${menuAbierto ? ' lateral-abierta' : ''}`}
        aria-label="Navegación principal" aria-hidden={!menuAbierto && !anchaFija}>
        <div className="lateral-cabecera">
          <h2>Mi Mesa</h2>
          <button className="shell-boton boton-menu" onClick={() => setMenuAbierto(false)}
            aria-label="Cerrar menú">
            <X size={17} />
          </button>
        </div>
        <nav className="lateral-menu">
          {SECCIONES.map(({ k, label, Icono }) => (
            <button key={k} className="lateral-item" onClick={() => irA(k)}
              aria-current={seccion === k ? 'page' : undefined}>
              <Icono size={18} />{label}
            </button>
          ))}
        </nav>
        <div className="lateral-pie">{usuario.displayName || usuario.email}</div>
      </aside>

      <header className="shell">
        <button className="shell-boton boton-menu" onClick={() => setMenuAbierto(true)}
          aria-label="Abrir menú" aria-expanded={menuAbierto}>
          <Menu size={18} />
        </button>
        <div className="shell-titulo">
          <h1>{seccionActual?.label || 'Mi Mesa'}</h1>
          <p>Esposo 43 · Esposa 40, sin lactosa · Hija 3 años, legumbres camufladas</p>
        </div>
        <div className="shell-acciones">
          <button className="shell-boton" onClick={alternarTema}
            aria-label={tema === 'claro' ? 'Activar modo oscuro' : 'Activar modo claro'}>
            {tema === 'claro' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button className="shell-boton" onClick={onSalir} aria-label="Cerrar sesión">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="contenido">
        {seccion === 'semana' && (
          <Semana
            inicio={inicio} setInicio={setInicio} fechas={fechas}
            plan={semana.plan} porId={porId} generar={generar} generando={generando}
            abrir={(fecha, tipo) => setModal({ fecha, tipo })} pauta={pauta}
          />
        )}
        {seccion === 'mes' && <Mes hogarId={hogarId} />}
        {seccion === 'compras' && (
          <Compras fechas={fechas} plan={semana.plan} porId={porId}
            compras={semana.compras} onMarcar={marcarCompra} />
        )}
        {seccion === 'recetas' && <Recetas recetas={recetas} onAgregar={agregar} onBorrar={borrar} />}
        {seccion === 'historial' && <Historial historial={historial} onVaciar={vaciar} />}
        {seccion === 'pauta' && (
          <>
            <Pauta pauta={pauta} onGuardar={guardarPauta} onQuitar={quitarPauta} />
            <div className="espacio" />
            <div className="tarjeta">
              <div className="tarjeta-cuerpo">
                <h4 className="subtitulo">Código de este hogar</h4>
                <p className="parrafo">
                  Compártelo con tu pareja para que vea y edite el mismo plan desde su teléfono.
                </p>
                <div className="codigo-hogar">{hogarId}</div>
              </div>
            </div>
          </>
        )}
      </main>

      {brindis && <div className="brindis">{brindis}</div>}

      {modal && (
        <HojaComida
          fecha={modal.fecha} tipo={modal.tipo} slot={slotActivo}
          receta={porId[slotActivo?.id]} recetas={recetas}
          onCerrar={() => setModal(null)} onMarcar={marcar} onCambiar={cambiarSugerencia}
        />
      )}
    </div>
  );
}
