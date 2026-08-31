import React, { useState, useEffect } from 'react';
import { X, Check, Replace, Clock, Leaf, Milk } from 'lucide-react';
import { etiquetaTipo, fechaLegible } from '../utiles';
import { Boton, Etiqueta } from './Comunes';

const MOTIVOS = [
  'No alcancé el tiempo',
  'Faltaba un ingrediente',
  'A la hija no le gustó',
  'Comimos fuera',
  'Aproveché las sobras',
  'Cambio de antojo',
];

export default function HojaComida({ fecha, tipo, slot, receta, recetas, onCerrar, onMarcar, onCambiar }) {
  const [vista, setVista] = useState('receta');
  const [real, setReal] = useState('');
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onCerrar();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onCerrar]);

  const alternativas = recetas.filter((r) => r.t === tipo);
  const puedeGuardar = vista === 'omitir' ? !!motivo : real.trim() && motivo;

  return (
    <div className="velo" onClick={onCerrar} role="dialog" aria-modal="true">
      <div className="hoja" onClick={(e) => e.stopPropagation()}>
        <div className="hoja-cabecera">
          <div>
            <div className="dato">{etiquetaTipo(tipo)} · {fechaLegible(fecha)}</div>
            <h3 style={{ fontSize: 17, marginTop: 2 }}>{receta ? receta.n : 'Sin asignar'}</h3>
          </div>
          <button className="hoja-cerrar" onClick={onCerrar} aria-label="Cerrar"><X size={19} /></button>
        </div>

        <div className="hoja-cuerpo">
          {vista === 'receta' && (
            <>
              {receta ? (
                <>
                  <div className="etiquetas" style={{ marginTop: 0, marginBottom: 16 }}>
                    <Etiqueta><Clock size={11} />{receta.min} min</Etiqueta>
                    <Etiqueta tono="marca"><Milk size={11} />sin lactosa</Etiqueta>
                    {receta.leg === 'oculta' && <Etiqueta tono="marca"><Leaf size={11} />legumbre camuflada</Etiqueta>}
                  </div>

                  <h4 className="subtitulo">Ingredientes para 3</h4>
                  <ul className="ingredientes">
                    {receta.ing.map((x, i) => <li key={i}>{x}</li>)}
                  </ul>

                  <h4 className="subtitulo">Preparación</h4>
                  <ol className="pasos">
                    {receta.pasos.map((x, i) => <li key={i}><b>{i + 1}</b><span>{x}</span></li>)}
                  </ol>

                  <div className="nota" style={{ margin: '16px 0 20px' }}>
                    <div className="nota-titulo">Truco de cocina</div>
                    {receta.truco}
                  </div>

                  <Boton bloque onClick={() => onMarcar(fecha, tipo, 'cumplido')}>
                    <Check size={16} />Se preparó tal cual
                  </Boton>
                  <div className="espacio" />
                  <Boton bloque variante="secundario" onClick={() => setVista('reemplazo')}>
                    <Replace size={16} />Preparé otra cosa
                  </Boton>
                  <div className="espacio" />
                  <Boton bloque variante="secundario" onClick={() => setVista('omitir')}>
                    <X size={16} />No se preparó
                  </Boton>
                  <div className="espacio" />
                </>
              ) : (
                <p className="parrafo">Todavía no hay nada asignado a esta comida.</p>
              )}
              <Boton bloque variante="plano" onClick={() => setVista('cambiar')}>
                Cambiar la sugerencia del plan
              </Boton>
            </>
          )}

          {(vista === 'reemplazo' || vista === 'omitir') && (
            <>
              {vista === 'reemplazo' && (
                <>
                  <label className="subtitulo" htmlFor="que-prepararon">¿Qué prepararon en realidad?</label>
                  <input id="que-prepararon" value={real} autoFocus
                    onChange={(e) => setReal(e.target.value)} placeholder="Ej: fideos con salsa" />
                  <div className="espacio" />
                </>
              )}
              <div className="subtitulo">¿Por qué cambió?</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                {MOTIVOS.map((m) => (
                  <button key={m} className="chip" aria-pressed={motivo === m} onClick={() => setMotivo(m)}>{m}</button>
                ))}
              </div>
              <div className="fila">
                <Boton variante="secundario" onClick={() => setVista('receta')}>Volver</Boton>
                <Boton disabled={!puedeGuardar} style={{ flex: 2 }}
                  onClick={() => onMarcar(fecha, tipo, vista === 'reemplazo' ? 'reemplazado' : 'omitido', real, motivo)}>
                  Guardar registro
                </Boton>
              </div>
            </>
          )}

          {vista === 'cambiar' && (
            <>
              <p className="parrafo">Elige otra preparación para este tiempo de comida.</p>
              {alternativas.map((r) => (
                <button key={r.id} className="lista-item"
                  style={{
                    border: `1px solid ${receta?.id === r.id ? 'var(--marca)' : 'var(--borde)'}`,
                    borderRadius: 6, marginBottom: 8,
                    background: receta?.id === r.id ? 'var(--marca-suave)' : 'transparent',
                  }}
                  onClick={() => { onCambiar(fecha, tipo, r.id); setVista('receta'); }}>
                  <span>
                    <span style={{ display: 'block' }}>{r.n}</span>
                    <span className="dato" style={{ fontSize: 12 }}>
                      {r.min} min{r.leg === 'oculta' ? ' · legumbre camuflada' : ''}
                    </span>
                  </span>
                </button>
              ))}
              <div className="espacio" />
              <Boton bloque variante="secundario" onClick={() => setVista('receta')}>Volver</Boton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
