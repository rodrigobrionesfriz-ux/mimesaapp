import React from 'react';
import { Clock, Leaf, Milk, ShieldCheck, AlertTriangle, Scale } from 'lucide-react';
import { PLAN, describirPorciones } from '../datos/pauta';
import { Etiqueta } from './Comunes';

export default function DetalleReceta({ receta }) {
  if (!receta) return null;

  const objetivo = PLAN[receta.t]?.objetivo;

  return (
    <>
      <div className="etiquetas" style={{ marginTop: 0, marginBottom: 14 }}>
        <Etiqueta><Clock size={11} />{receta.min} min</Etiqueta>
        <Etiqueta tono="marca"><Milk size={11} />sin lactosa</Etiqueta>
        <Etiqueta tono="positiva"><ShieldCheck size={11} />sin maní</Etiqueta>
        {receta.leg === 'oculta' && <Etiqueta tono="marca"><Leaf size={11} />legumbre camuflada</Etiqueta>}
      </div>

      {receta.al?.length > 0 && (
        <div className="alerta alerta-error" style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>Contiene {receta.al.join(', ')}. No es para el plato de la hija.</span>
        </div>
      )}

      {receta.p && (
        <section className="tarjeta" style={{ marginBottom: 16 }}>
          <div className="tarjeta-cuerpo" style={{ padding: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <Scale size={14} style={{ color: 'var(--marca)' }} />
              <span className="nota-titulo" style={{ margin: 0 }}>Porciones que aporta</span>
            </div>
            <div style={{ fontSize: 14 }}>{describirPorciones(receta.p)}</div>
            {objetivo && (
              <div className="dato" style={{ fontSize: 12, marginTop: 6 }}>
                La pauta pide {describirPorciones(objetivo)} en este tiempo de comida.
              </div>
            )}
          </div>
        </section>
      )}

      <h4 className="subtitulo">Ingredientes por adulto</h4>
      <ul className="ingredientes">
        {receta.ing.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
      <p className="dato" style={{ fontSize: 12.5, marginTop: -8, marginBottom: 16 }}>
        Para los tres, multiplica por dos y sirve a la hija cerca de un tercio del plato adulto.
      </p>

      <h4 className="subtitulo">Preparación</h4>
      <ol className="pasos">
        {receta.pasos.map((x, i) => <li key={i}><b>{i + 1}</b><span>{x}</span></li>)}
      </ol>

      <div className="nota" style={{ margin: '16px 0 0' }}>
        <div className="nota-titulo">Truco de cocina</div>
        {receta.truco}
      </div>
    </>
  );
}
