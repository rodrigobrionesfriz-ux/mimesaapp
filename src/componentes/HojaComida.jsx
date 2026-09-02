import React, { useState } from 'react';
import { Check, Replace, X, Printer, Pencil } from 'lucide-react';
import { fechaLegible } from '../utiles';
import { Boton } from './Comunes';
import Hoja from './Hoja';
import DetalleReceta from './DetalleReceta';

const MOTIVOS = [
  'No alcancé el tiempo',
  'Faltaba un ingrediente',
  'A la hija no le gustó',
  'Comimos fuera',
  'Aproveché las sobras',
  'Cambio de antojo',
];

const OTRA = '__otra__';

export default function HojaComida({
  fecha, tipo, receta, recetas, tipos, onCerrar, onMarcar, onCambiar, onImprimir, onEditar,
}) {
  const etiquetaTipo = (k) => tipos.find((t) => t.k === k)?.label || k;
  const [vista, setVista] = useState('receta');
  const [eleccion, setEleccion] = useState('');
  const [textoLibre, setTextoLibre] = useState('');
  const [motivo, setMotivo] = useState('');

  const mismoTipo = recetas.filter((r) => r.t === tipo);
  const otrosTipos = tipos.filter((t) => t.k !== tipo)
    .map((t) => ({ ...t, lista: recetas.filter((r) => r.t === t.k) }))
    .filter((g) => g.lista.length);

  const nombreElegido = eleccion === OTRA
    ? textoLibre.trim()
    : recetas.find((r) => r.id === eleccion)?.n || '';

  const puedeGuardar = vista === 'omitir' ? !!motivo : !!motivo && !!nombreElegido;

  const guardarReemplazo = () => onMarcar(
    fecha, tipo, 'reemplazado', nombreElegido, motivo,
    eleccion === OTRA ? null : eleccion,
  );

  const listaMotivos = (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
      {MOTIVOS.map((m) => (
        <button key={m} className="chip" aria-pressed={motivo === m} onClick={() => setMotivo(m)}>{m}</button>
      ))}
    </div>
  );

  return (
    <Hoja
      sobretitulo={`${etiquetaTipo(tipo)} · ${fechaLegible(fecha)}`}
      titulo={receta ? receta.n : 'Sin asignar'}
      onCerrar={onCerrar}
    >
      {vista === 'receta' && (
        <>
          {receta ? (
            <>
              <DetalleReceta receta={receta} />
              <div className="espacio" />
              <div className="fila">
                <Boton variante="secundario" onClick={() => onImprimir(receta)}>
                  <Printer size={16} />Imprimir
                </Boton>
                <Boton variante="secundario" onClick={() => onEditar(receta)}>
                  <Pencil size={16} />Editar
                </Boton>
              </div>
              <div className="espacio" />
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

      {vista === 'reemplazo' && (
        <>
          <label className="subtitulo" htmlFor="que-prepararon">¿Qué prepararon en realidad?</label>
          <select id="que-prepararon" value={eleccion} onChange={(e) => setEleccion(e.target.value)}>
            <option value="">Elige una preparación…</option>
            <optgroup label={etiquetaTipo(tipo)}>
              {mismoTipo.map((r) => <option key={r.id} value={r.id}>{r.n}</option>)}
            </optgroup>
            {otrosTipos.map((g) => (
              <optgroup key={g.k} label={g.label}>
                {g.lista.map((r) => <option key={r.id} value={r.id}>{r.n}</option>)}
              </optgroup>
            ))}
            <optgroup label="No está en la lista">
              <option value={OTRA}>Otra (escribirla)</option>
            </optgroup>
          </select>

          {eleccion === OTRA && (
            <>
              <div className="espacio" />
              <input autoFocus value={textoLibre} onChange={(e) => setTextoLibre(e.target.value)}
                placeholder="Ej: arroz con huevo frito" />
              <p className="dato" style={{ fontSize: 12, marginTop: 6 }}>
                Si es un plato que repiten, agrégalo después en Recetas para tenerlo a mano.
              </p>
            </>
          )}

          <div className="espacio" />
          <div className="subtitulo">¿Por qué cambió?</div>
          {listaMotivos}
          <div className="fila">
            <Boton variante="secundario" onClick={() => setVista('receta')}>Volver</Boton>
            <Boton disabled={!puedeGuardar} style={{ flex: 2 }} onClick={guardarReemplazo}>
              Guardar registro
            </Boton>
          </div>
        </>
      )}

      {vista === 'omitir' && (
        <>
          <div className="subtitulo">¿Por qué no se preparó?</div>
          {listaMotivos}
          <div className="fila">
            <Boton variante="secundario" onClick={() => setVista('receta')}>Volver</Boton>
            <Boton disabled={!puedeGuardar} style={{ flex: 2 }}
              onClick={() => onMarcar(fecha, tipo, 'omitido', null, motivo)}>
              Guardar registro
            </Boton>
          </div>
        </>
      )}

      {vista === 'cambiar' && (
        <>
          <p className="parrafo">Elige otra preparación para este tiempo de comida.</p>
          {mismoTipo.map((r) => (
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
    </Hoja>
  );
}
