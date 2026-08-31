import React, { useMemo } from 'react';
import { Check } from 'lucide-react';
import { TIPOS, iso, categoria } from '../utiles';
import { Vacio } from './Comunes';

export default function Compras({ fechas, plan, porId, compras, onMarcar }) {
  const lista = useMemo(() => {
    const m = {};
    for (const f of fechas.map(iso)) {
      const dia = plan[f];
      if (!dia) continue;
      for (const t of TIPOS) {
        const r = porId[dia[t.k]?.id];
        if (!r) continue;
        for (const ing of r.ing) {
          const cat = categoria(ing);
          m[cat] = m[cat] || {};
          m[cat][ing] = (m[cat][ing] || 0) + 1;
        }
      }
    }
    return m;
  }, [fechas, plan, porId]);

  const cats = Object.keys(lista).sort();
  if (!cats.length) {
    return <Vacio>Arma primero la semana y aquí aparece la lista de compras agrupada por pasillo.</Vacio>;
  }

  const total = cats.reduce((n, c) => n + Object.keys(lista[c]).length, 0);
  const listos = cats.reduce((n, c) => n + Object.keys(lista[c]).filter((i) => compras[i]).length, 0);

  return (
    <>
      <h3 className="subtitulo" style={{ marginBottom: 2 }}>Compras de la semana</h3>
      <p className="parrafo">{listos} de {total} en el carro</p>
      {cats.map((cat) => (
        <section key={cat} className="tarjeta">
          <div className="tarjeta-cabecera"><h4 style={{ fontSize: 14 }}>{cat}</h4></div>
          {Object.entries(lista[cat]).map(([ing, veces]) => (
            <button key={ing} className="lista-item" onClick={() => onMarcar(ing)}>
              <span className={`casilla${compras[ing] ? ' casilla-marcada' : ''}`}>
                {compras[ing] && <Check size={12} />}
              </span>
              <span style={{ flex: 1 }} className={compras[ing] ? 'tachado' : undefined}>{ing}</span>
              {veces > 1 && <span className="dato" style={{ color: 'var(--marca)' }}>x{veces}</span>}
            </button>
          ))}
        </section>
      ))}
    </>
  );
}
