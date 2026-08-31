import React, { useState } from 'react';
import { Plus, Trash2, Clock, Leaf } from 'lucide-react';
import { TIPOS, etiquetaTipo } from '../utiles';
import { Boton, Etiqueta, Chips } from './Comunes';

const FILTROS = [
  ['todas', 'Todas'], ['desayuno', 'Desayunos'], ['colacion', 'Colaciones'],
  ['almuerzo', 'Almuerzos'], ['cena', 'Cenas'],
  ['oculta', 'Con legumbre oculta'], ['rapida', '20 min o menos'],
];

const EN_BLANCO = { n: '', t: 'almuerzo', min: '20', ing: '', pasos: '', truco: '', leg: false };

export default function Recetas({ recetas, onAgregar, onBorrar }) {
  const [filtro, setFiltro] = useState('todas');
  const [nueva, setNueva] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const visibles = recetas.filter((r) =>
    filtro === 'todas' ? true
      : filtro === 'oculta' ? r.leg === 'oculta'
      : filtro === 'rapida' ? r.min <= 20
      : r.t === filtro);

  const guardar = async () => {
    if (!nueva.n.trim()) return;
    setGuardando(true);
    await onAgregar({
      n: nueva.n.trim(),
      t: nueva.t,
      min: Number(nueva.min) || 20,
      leg: nueva.leg ? 'oculta' : null,
      ing: nueva.ing.split('\n').map((x) => x.trim()).filter(Boolean),
      pasos: nueva.pasos.split('\n').map((x) => x.trim()).filter(Boolean),
      truco: nueva.truco.trim() || 'Receta propia de la familia.',
    });
    setGuardando(false);
    setNueva(null);
  };

  if (nueva) {
    const set = (k) => (e) => setNueva({ ...nueva, [k]: e.target.value });
    return (
      <>
        <h3 className="subtitulo">Agregar una receta de la casa</h3>
        <input placeholder="Nombre de la preparación" value={nueva.n} onChange={set('n')} />
        <div className="espacio" />
        <select value={nueva.t} onChange={set('t')}>
          {TIPOS.map((t) => <option key={t.k} value={t.k}>{t.label}</option>)}
        </select>
        <div className="espacio" />
        <input type="number" inputMode="numeric" placeholder="Minutos" value={nueva.min} onChange={set('min')} />
        <div className="espacio" />
        <textarea rows={4} placeholder="Ingredientes, uno por línea" value={nueva.ing} onChange={set('ing')} />
        <div className="espacio" />
        <textarea rows={4} placeholder="Pasos, uno por línea" value={nueva.pasos} onChange={set('pasos')} />
        <div className="espacio" />
        <input placeholder="Truco o nota" value={nueva.truco} onChange={set('truco')} />
        <div className="espacio" />
        <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14 }}>
          <input type="checkbox" style={{ width: 'auto' }} checked={nueva.leg}
            onChange={(e) => setNueva({ ...nueva, leg: e.target.checked })} />
          Lleva legumbre camuflada
        </label>
        <div className="espacio" />
        <div className="fila">
          <Boton variante="secundario" onClick={() => setNueva(null)}>Cancelar</Boton>
          <Boton style={{ flex: 2 }} disabled={guardando} onClick={guardar}>
            {guardando ? 'Guardando…' : 'Guardar receta'}
          </Boton>
        </div>
      </>
    );
  }

  return (
    <>
      <Chips opciones={FILTROS} valor={filtro} onCambio={setFiltro} />
      <div className="espacio" />
      <Boton bloque variante="secundario" onClick={() => setNueva(EN_BLANCO)}>
        <Plus size={15} />Agregar receta propia
      </Boton>
      <div className="espacio" />

      {visibles.map((r) => (
        <article key={r.id} className="tarjeta">
          <div className="tarjeta-cuerpo">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <h4 style={{ fontSize: 15 }}>{r.n}</h4>
              {r.propia && (
                <button onClick={() => onBorrar(r.id)} aria-label={`Borrar ${r.n}`}
                  style={{ background: 'none', border: 'none', color: 'var(--texto-tenue)', padding: 2 }}>
                  <Trash2 size={15} />
                </button>
              )}
            </div>
            <div className="etiquetas">
              <Etiqueta><Clock size={11} />{r.min} min</Etiqueta>
              <Etiqueta>{etiquetaTipo(r.t)}</Etiqueta>
              {r.leg === 'oculta' && <Etiqueta tono="marca"><Leaf size={11} />legumbre oculta</Etiqueta>}
            </div>
            <p className="dato" style={{ marginTop: 10, marginBottom: 0 }}>{r.truco}</p>
          </div>
        </article>
      ))}
    </>
  );
}
