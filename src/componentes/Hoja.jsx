import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Hoja({ titulo, sobretitulo, onCerrar, children }) {
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onCerrar();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onCerrar]);

  return (
    <div className="velo" onClick={onCerrar} role="dialog" aria-modal="true">
      <div className="hoja" onClick={(e) => e.stopPropagation()}>
        <div className="hoja-cabecera">
          <div style={{ minWidth: 0 }}>
            {sobretitulo && <div className="dato">{sobretitulo}</div>}
            <h3 style={{ fontSize: 17, marginTop: 2 }}>{titulo}</h3>
          </div>
          <button className="hoja-cerrar" onClick={onCerrar} aria-label="Cerrar"><X size={19} /></button>
        </div>
        <div className="hoja-cuerpo">{children}</div>
      </div>
    </div>
  );
}
