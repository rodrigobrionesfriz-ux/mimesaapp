import React from 'react';
import { Clock, Leaf, Milk, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Etiqueta } from './Comunes';

export default function DetalleReceta({ receta }) {
  if (!receta) return null;

  return (
    <>
      <div className="etiquetas" style={{ marginTop: 0, marginBottom: 16 }}>
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

      <h4 className="subtitulo">Ingredientes para 3</h4>
      <ul className="ingredientes">
        {receta.ing.map((x, i) => <li key={i}>{x}</li>)}
      </ul>

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
