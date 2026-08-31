import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Calendar, CalendarDays, ShoppingCart, BookOpen, History as HistoryIcon,
  FileText, Sun, Moon, LogOut,
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
  const [inicio, setInicio] = useState(() => lunesDe(new Date()));
  const [modal, setModal] = useState(null);
  const [brindis, setBrindis] = useState(null);
  const [generando, setGenerando] = useState(false);

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

  return (
    <div className="app">
      <header className="shell">
        <div>
          <h1>Mi Mesa</h1>
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

      <nav className="navbar">
        {SECCIONES.map(({ k, label, Icono }) => (
          <button key={k} onClick={() => setSeccion(k)}
            aria-current={seccion === k ? 'page' : undefined}>
            <Icono size={18} />{label}
          </button>
        ))}
      </nav>

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
