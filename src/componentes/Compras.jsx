import React, { useMemo, useState } from 'react';
import { Check, Info, Printer } from 'lucide-react';
import { iso, categoria } from '../utiles';
import { consolidar } from '../datos/ingredientes';
import { Vacio, Chips, Boton } from './Comunes';

const RACIONES = [
  ['1', '1 ración'],
  ['2', '2 raciones'],
  ['2.5', '2 adultos + hija'],
  ['3', '3 raciones'],
];

export default function Compras({ fechas, plan, porId, compras, onMarcar, tipos, perfil, onImprimir }) {
  const [factor, setFactor] = useState(perfil === 'hija' ? '1' : '2.5');

  // Todas las líneas de ingrediente de la semana, con sus repeticiones.
  const lineas = useMemo(() => {
    const out = [];
    for (const f of fechas.map(iso)) {
      const dia = plan[f];
      if (!dia) continue;
      for (const t of tipos) {
        const r = porId[dia[t.k]?.id];
        if (r) out.push(...r.ing);
      }
    }
    return out;
  }, [fechas, plan, porId, tipos]);

  const porCategoria = useMemo(() => {
    const items = consolidar(lineas, Number(factor));
    const m = {};
    for (const it of items) {
      const cat = categoria(it.nombre);
      (m[cat] = m[cat] || []).push(it);
    }
    return m;
  }, [lineas, factor]);

  const cats = Object.keys(porCategoria).sort();
  if (!cats.length) {
    return <Vacio>Arma primero la semana y aquí aparece la lista de compras consolidada.</Vacio>;
  }

  const todos = cats.flatMap((c) => porCategoria[c]);
  const listos = todos.filter((i) => compras[i.clave]).length;

  return (
    <>
      <h3 className="subtitulo" style={{ marginBottom: 2 }}>Compras de la semana</h3>
      <p className="parrafo" style={{ marginBottom: 10 }}>
        {todos.length} productos, {listos} en el carro. Las cantidades vienen sumadas
        de todas las preparaciones de la semana.
      </p>

      <Chips opciones={RACIONES} valor={factor} onCambio={setFactor} />
      <div className="espacio" />
      <Boton bloque variante="secundario"
        onClick={() => onImprimir(porCategoria, RACIONES.find(([v]) => v === factor)?.[1])}>
        <Printer size={16} />Imprimir la lista para el supermercado
      </Boton>
      <div className="espacio" />

      {cats.map((cat) => (
        <section key={cat} className="tarjeta">
          <div className="tarjeta-cabecera"><h4 style={{ fontSize: 14 }}>{cat}</h4></div>
          {porCategoria[cat].map((it) => (
            <button key={it.clave} className="lista-item" onClick={() => onMarcar(it.clave)}>
              <span className={`casilla${compras[it.clave] ? ' casilla-marcada' : ''}`}>
                {compras[it.clave] && <Check size={12} />}
              </span>
              <span style={{ flex: 1 }} className={compras[it.clave] ? 'tachado' : undefined}>
                {it.nombre}
                {it.veces > 1 && (
                  <span className="dato" style={{ display: 'block', fontSize: 12 }}>
                    en {it.veces} preparaciones
                  </span>
                )}
              </span>
              <span className="cantidad-compra">{it.cantidad || 'a gusto'}</span>
            </button>
          ))}
        </section>
      ))}

      <div className="nota" style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <Info size={15} style={{ flexShrink: 0, marginTop: 1, color: 'var(--marca)' }} />
        <span>
          Las cantidades se redondean hacia arriba y las medidas equivalentes se unifican:
          media taza más dos cucharadas de avena aparecen como una sola línea. Lo que va
          «a gusto» son condimentos y aliños que conviene tener siempre en la despensa.
        </span>
      </div>
    </>
  );
}
