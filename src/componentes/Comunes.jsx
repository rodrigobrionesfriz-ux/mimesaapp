import React from 'react';

export function Boton({ children, variante = 'primario', chico, bloque, ...rest }) {
  const clases = ['btn', `btn-${variante}`];
  if (chico) clases.push('btn-chico');
  if (bloque) clases.push('btn-bloque');
  return <button className={clases.join(' ')} {...rest}>{children}</button>;
}

export function Etiqueta({ tono = 'neutra', children }) {
  return <span className={`etiqueta etiqueta-${tono}`}>{children}</span>;
}

export function Kpi({ valor, etiqueta, color }) {
  return (
    <div className="kpi">
      <div className="kpi-valor" style={color ? { color } : undefined}>{valor}</div>
      <div className="kpi-etiqueta">{etiqueta}</div>
    </div>
  );
}

export function Chips({ opciones, valor, onCambio }) {
  return (
    <div className="chips">
      {opciones.map(([k, l]) => (
        <button key={k} className="chip" aria-pressed={valor === k} onClick={() => onCambio(k)}>{l}</button>
      ))}
    </div>
  );
}

export function Vacio({ children }) {
  return <div className="vacio">{children}</div>;
}
