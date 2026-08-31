import React, { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import { GRUPOS, CONSERVACION, REFRIGERADOR, MEAL_PREP, COMPRAS_GUIA } from '../datos/pauta';
import { Chips } from './Comunes';

const VISTAS = [
  ['porciones', 'Porciones'],
  ['prep', 'Meal prep'],
  ['conservar', 'Conservación'],
  ['compras', 'En el súper'],
];

export default function Porciones() {
  const [vista, setVista] = useState('porciones');
  const [busca, setBusca] = useState('');

  const q = busca.trim().toLowerCase();
  const grupos = GRUPOS
    .map((g) => ({ ...g, items: q ? g.items.filter(([a]) => a.toLowerCase().includes(q)) : g.items }))
    .filter((g) => g.items.length);

  return (
    <>
      <Chips opciones={VISTAS} valor={vista} onCambio={setVista} />
      <div className="espacio" />

      {vista === 'porciones' && (
        <>
          <p className="parrafo">
            Cuánto equivale a una porción de cada grupo, según la guía de la nutricionista.
            Sirve para armar o reemplazar comidas sin salirse de la pauta.
          </p>

          <div style={{ position: 'relative', marginBottom: 16 }}>
            <Search size={15} style={{
              position: 'absolute', left: 11, top: 12, color: 'var(--texto-tenue)', pointerEvents: 'none',
            }} />
            <input value={busca} onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar un alimento…" style={{ paddingLeft: 33 }} />
          </div>

          {grupos.length === 0 && (
            <div className="vacio">No hay alimentos que coincidan con esa búsqueda.</div>
          )}

          {grupos.map((g) => (
            <section key={g.k} className="tarjeta">
              <div className="tarjeta-cabecera" style={{ borderLeft: `3px solid ${g.color}` }}>
                <h4 style={{ fontSize: 14 }}>{g.nombre}</h4>
                <span className="dato" style={{ fontSize: 11.5 }}>1 porción =</span>
              </div>
              {g.items.map(([alimento, porcion], i) => (
                <div key={i} className="lista-item" style={{ alignItems: 'flex-start' }}>
                  <span style={{ flex: 1 }}>{alimento}</span>
                  <span className="dato" style={{ textAlign: 'right', flexShrink: 0, maxWidth: '42%' }}>
                    {porcion}
                  </span>
                </div>
              ))}
              {g.nota && (
                <div className="alerta alerta-error" style={{
                  margin: 12, display: 'flex', gap: 8, alignItems: 'flex-start',
                }}>
                  <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>{g.nota}</span>
                </div>
              )}
            </section>
          ))}
        </>
      )}

      {vista === 'prep' && (
        <>
          <p className="parrafo">
            Adelantar preparaciones un día de la semana es lo que sostiene el plan cuando hay poco tiempo.
          </p>
          <section className="tarjeta">
            <div className="tarjeta-cuerpo">
              {MEAL_PREP.map((x, i) => (
                <p key={i} style={{ margin: '0 0 10px', fontSize: 14 }}>· {x}</p>
              ))}
            </div>
          </section>
          <div className="espacio" />
          <h4 className="subtitulo">Dónde va cada cosa en el refrigerador</h4>
          <section className="tarjeta">
            {REFRIGERADOR.map(([lugar, que], i) => (
              <div key={i} className="lista-item" style={{ alignItems: 'flex-start' }}>
                <span style={{ flex: '0 0 38%', fontWeight: 600 }}>{lugar}</span>
                <span className="dato" style={{ flex: 1 }}>{que}</span>
              </div>
            ))}
          </section>
        </>
      )}

      {vista === 'conservar' && (
        <>
          <p className="parrafo">Cuánto dura cada alimento una vez preparado o abierto.</p>
          <section className="tarjeta">
            <div className="tarjeta-cabecera">
              <h4 style={{ fontSize: 14 }}>Alimento</h4>
              <span className="dato" style={{ fontSize: 11.5 }}>Refrigerador · Congelador</span>
            </div>
            {CONSERVACION.map(([alimento, refri, cong], i) => (
              <div key={i} className="lista-item" style={{ alignItems: 'flex-start' }}>
                <span style={{ flex: 1 }}>
                  {alimento}
                  <span className="dato" style={{ display: 'block', fontSize: 12 }}>
                    Congelador: {cong}
                  </span>
                </span>
                <span style={{ flexShrink: 0, color: 'var(--marca)', fontSize: 13.5 }}>{refri}</span>
              </div>
            ))}
          </section>
        </>
      )}

      {vista === 'compras' && (
        <>
          <p className="parrafo">El orden del recorrido importa para no cortar la cadena de frío.</p>
          <section className="tarjeta">
            <div className="tarjeta-cuerpo">
              {COMPRAS_GUIA.map((x, i) => (
                <p key={i} style={{ margin: '0 0 10px', fontSize: 14 }}>· {x}</p>
              ))}
            </div>
          </section>
          <div className="espacio" />
          <div className="nota">
            <div className="nota-titulo">No olvides</div>
            Condimentos y aliños, endulzante o azúcar, aceite, y potes de vidrio con cierre hermético
            suficientes para guardar comida de 3 a 4 días.
          </div>
        </>
      )}
    </>
  );
}
