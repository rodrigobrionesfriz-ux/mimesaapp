import React, { useState } from 'react';
import { Plus, Trash2, Clock, Leaf, ChevronRight, AlertTriangle, ShieldCheck, Printer } from 'lucide-react';
import { TIPOS, etiquetaTipo } from '../utiles';
import { PLAN, describirPorciones } from '../datos/pauta';
import { Boton, Etiqueta, Chips } from './Comunes';
import Hoja from './Hoja';
import DetalleReceta from './DetalleReceta';

const FILTROS = [
  ['todas', 'Todas'], ['propias', 'Mías'],
  ['desayuno', 'Desayunos'], ['colacion_am', 'Colación AM'], ['almuerzo', 'Almuerzos'],
  ['colacion_pm', 'Colación PM'], ['cena', 'Once / cena'], ['colacion_opcional', 'Opcional'],
  ['hija', 'De la hija'], ['salsa', 'Salsas'], ['base', 'Bases y untables'],
  ['oculta', 'Con legumbre oculta'], ['rapida', '20 min o menos'],
];

const EN_BLANCO = {
  n: '', t: 'almuerzo', min: '20', ing: '', pasos: '', truco: '', leg: false,
  cer: '', pro: '', fru: '', lac: '', ver: '', arl: '',
};

const CAMPOS_PORCION = [
  ['cer', 'Cereal'], ['pro', 'Proteína'], ['fru', 'Fruta'],
  ['lac', 'Lácteo'], ['ver', 'Verduras'], ['arl', 'ARL'],
];

// La hija es alérgica al maní: ninguna receta puede entrar con él.
const MANI = /man[íi]|cacahuat|cacahuet|peanut/i;

export default function Recetas({ recetas, onAgregar, onBorrar, onImprimir }) {
  const [filtro, setFiltro] = useState('todas');
  const [nueva, setNueva] = useState(null);
  const [abierta, setAbierta] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const visibles = recetas.filter((r) =>
    filtro === 'todas' ? true
      : filtro === 'propias' ? r.propia
      : filtro === 'hija' ? (r.deLaHija || r.perfil === 'hija')
      : filtro === 'oculta' ? r.leg === 'oculta'
      : filtro === 'rapida' ? r.min <= 20
      : r.t === filtro);

  const guardar = async () => {
    setError(null);
    if (!nueva.n.trim()) { setError('Ponle un nombre a la receta.'); return; }

    const ing = nueva.ing.split('\n').map((x) => x.trim()).filter(Boolean);
    const conflictivo = [nueva.n, ...ing, nueva.pasos].filter((x) => MANI.test(x));
    if (conflictivo.length) {
      setError('Esta receta menciona maní y la hija es alérgica. Cámbialo por otro ingrediente antes de guardar.');
      return;
    }

    const porciones = {};
    for (const [k] of CAMPOS_PORCION) {
      const v = Number(nueva[k]);
      if (v > 0) porciones[k] = v;
    }

    setGuardando(true);
    await onAgregar({
      n: nueva.n.trim(),
      t: nueva.t,
      min: Number(nueva.min) || 20,
      leg: nueva.leg ? 'oculta' : null,
      p: Object.keys(porciones).length ? porciones : null,
      ing,
      pasos: nueva.pasos.split('\n').map((x) => x.trim()).filter(Boolean),
      truco: nueva.truco.trim() || 'Receta propia de la familia.',
    });
    setGuardando(false);
    setNueva(null);
  };

  /* ---------------------- formulario de receta propia ---------------------- */
  if (nueva) {
    const set = (k) => (e) => setNueva({ ...nueva, [k]: e.target.value });
    const objetivoTexto = describirPorciones(PLAN[nueva.t]?.objetivo) || 'lo que estimes';
    return (
      <>
        <h3 className="subtitulo">Agregar una receta de la casa</h3>
        <p className="parrafo">
          Queda guardada en el hogar y aparece de inmediato en el planificador y en los reemplazos.
        </p>
        {error && <div className="alerta alerta-error">{error}</div>}

        <input placeholder="Nombre de la preparación" value={nueva.n} onChange={set('n')} />
        <div className="espacio" />
        <select value={nueva.t} onChange={set('t')}>
          {TIPOS.map((t) => <option key={t.k} value={t.k}>{t.label}</option>)}
        </select>
        <div className="espacio" />
        <input type="number" inputMode="numeric" placeholder="Minutos de preparación"
          value={nueva.min} onChange={set('min')} />
        <div className="espacio" />
        <textarea rows={5} placeholder="Ingredientes, uno por línea" value={nueva.ing} onChange={set('ing')} />
        <div className="espacio" />
        <textarea rows={5} placeholder="Pasos, uno por línea" value={nueva.pasos} onChange={set('pasos')} />
        <div className="espacio" />
        <input placeholder="Truco o nota (opcional)" value={nueva.truco} onChange={set('truco')} />
        <div className="espacio" />
        <div className="subtitulo" style={{ marginBottom: 4 }}>Porciones que aporta</div>
        <p className="dato" style={{ fontSize: 12.5, marginBottom: 10 }}>
          Según la guía de la nutricionista. La pauta de este tiempo pide {objetivoTexto}.
        </p>
        <div className="grilla-porciones">
          {CAMPOS_PORCION.map(([k, l]) => (
            <label key={k} className="campo-porcion">
              <span>{l}</span>
              <input type="number" min="0" step="0.5" inputMode="decimal"
                value={nueva[k]} onChange={set(k)} placeholder="0" />
            </label>
          ))}
        </div>
        <div className="espacio" />
        <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14 }}>
          <input type="checkbox" style={{ width: 'auto' }} checked={nueva.leg}
            onChange={(e) => setNueva({ ...nueva, leg: e.target.checked })} />
          Lleva legumbre camuflada
        </label>
        <div className="espacio" />
        <div className="nota">
          <div className="nota-titulo">Recordatorio</div>
          Sin lactosa y sin maní. Si la receta original los lleva, reemplázalos antes de guardarla.
        </div>
        <div className="espacio" />
        <div className="fila">
          <Boton variante="secundario" onClick={() => { setNueva(null); setError(null); }}>Cancelar</Boton>
          <Boton style={{ flex: 2 }} disabled={guardando} onClick={guardar}>
            {guardando ? 'Guardando…' : 'Guardar receta'}
          </Boton>
        </div>
      </>
    );
  }

  /* ------------------------------ listado ------------------------------ */
  return (
    <>
      <Chips opciones={FILTROS} valor={filtro} onCambio={setFiltro} />
      <div className="espacio" />
      <Boton bloque onClick={() => setNueva(EN_BLANCO)}>
        <Plus size={15} />Agregar receta propia
      </Boton>
      <div className="espacio" />
      <p className="dato" style={{ marginBottom: 12 }}>
        {visibles.length} {visibles.length === 1 ? 'receta' : 'recetas'}. Toca cualquiera para ver el detalle.
      </p>

      {visibles.map((r) => (
        <div key={r.id} className="tarjeta">
          <button className="receta-fila" onClick={() => setAbierta(r)}>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="receta-nombre">{r.n}</span>
              <span className="etiquetas">
                <Etiqueta><Clock size={11} />{r.min} min</Etiqueta>
                <Etiqueta>{etiquetaTipo(r.t)}</Etiqueta>
                {r.leg === 'oculta' && <Etiqueta tono="marca"><Leaf size={11} />legumbre oculta</Etiqueta>}
                {r.al?.length > 0 && <Etiqueta tono="negativa"><AlertTriangle size={11} />{r.al[0]}</Etiqueta>}
                {r.propia && <Etiqueta tono="marca">mía</Etiqueta>}
                {(r.deLaHija || r.perfil === 'hija') && <Etiqueta tono="positiva">de la hija</Etiqueta>}
                {r.origen && <Etiqueta>{r.origen}</Etiqueta>}
              </span>
            </span>
            <ChevronRight size={17} style={{ color: 'var(--texto-tenue)', flexShrink: 0 }} />
          </button>
        </div>
      ))}

      {abierta && (
        <Hoja
          sobretitulo={`${etiquetaTipo(abierta.t)}${abierta.propia ? ' · receta propia' : ''}`}
          titulo={abierta.n}
          onCerrar={() => setAbierta(null)}
        >
          <DetalleReceta receta={abierta} />
          <div className="espacio" />
          <Boton bloque variante="secundario" onClick={() => onImprimir(abierta)}>
            <Printer size={16} />Imprimir esta receta
          </Boton>
          {abierta.propia && (
            <>
              <div className="espacio" />
              <Boton bloque variante="peligro" chico
                onClick={() => { onBorrar(abierta.id); setAbierta(null); }}>
                <Trash2 size={14} />Borrar esta receta
              </Boton>
            </>
          )}
        </Hoja>
      )}

      <div className="nota" style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <ShieldCheck size={15} style={{ flexShrink: 0, marginTop: 1, color: 'var(--marca)' }} />
        <span>Todas las recetas del listado están libres de lactosa y de maní.</span>
      </div>
    </>
  );
}
