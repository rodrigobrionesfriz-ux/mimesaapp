import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Leaf } from 'lucide-react';
import { TIPOS_HIJA, PLAN_HIJA, PORCIONES_HIJA, SEGURIDAD_HIJA, CONDUCTA_HIJA, RECETARIO_HIJA } from '../datos/hija';
import { Chips } from './Comunes';

const VISTAS = [
  ['estructura', 'Su día'],
  ['porciones', 'Porciones'],
  ['seguridad', 'Alergia'],
  ['conducta', 'Que coma'],
];

export default function GuiaHija() {
  const [vista, setVista] = useState('estructura');
  const ocultas = RECETARIO_HIJA.filter((r) => r.leg === 'oculta');

  return (
    <>
      <div className="alerta alerta-error" style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
        <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          Este plan no viene de la consulta. La pauta que entregó la nutricionista está personalizada
          para una adulta. Esto es una guía de estructura y porciones para organizar la semana, y
          conviene validarla con su pediatra o con una nutricionista infantil, sobre todo por la alergia.
        </span>
      </div>

      <Chips opciones={VISTAS} valor={vista} onCambio={setVista} />
      <div className="espacio" />

      {vista === 'estructura' && (
        <>
          <p className="parrafo">
            Cinco tiempos de comida al día, con horarios estables. La regularidad importa más que
            la perfección de cada plato.
          </p>
          <section className="tarjeta">
            {TIPOS_HIJA.map((t) => (
              <div key={t.k} className="lista-item"
                style={{ alignItems: 'flex-start', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontWeight: 600 }}>{t.label}</span>
                <span style={{ color: 'var(--marca)', fontSize: 13.5 }}>{PLAN_HIJA[t.k]?.objetivo}</span>
                <span className="dato" style={{ fontSize: 12.5 }}>Ej: {PLAN_HIJA[t.k]?.ejemplo}</span>
              </div>
            ))}
          </section>

          <div className="espacio" />
          <div className="tarjeta">
            <div className="tarjeta-cuerpo" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Leaf size={16} style={{ color: 'var(--marca)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Legumbres camufladas</div>
                <div className="dato" style={{ fontSize: 13 }}>
                  {ocultas.length} de sus {RECETARIO_HIJA.length} recetas llevan legumbre escondida.
                  El planificador reparte cinco por semana entre distintos tiempos de comida.
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {vista === 'porciones' && (
        <>
          <p className="parrafo">
            A los 3 años se mide con sus manos, no con balanza. Sirve poco y deja que pida más.
          </p>
          <section className="tarjeta">
            {PORCIONES_HIJA.map(([alimento, cantidad], i) => (
              <div key={i} className="lista-item" style={{ alignItems: 'flex-start' }}>
                <span style={{ flex: 1 }}>{alimento}</span>
                <span className="dato" style={{ textAlign: 'right', flexShrink: 0, maxWidth: '46%' }}>
                  {cantidad}
                </span>
              </div>
            ))}
          </section>
          <div className="espacio" />
          <div className="nota">
            <div className="nota-titulo">Regla rápida</div>
            Su plato es cerca de un tercio del plato de un adulto. Si tienes dudas con una preparación
            del recetario de ustedes, sírvele un tercio y observa.
          </div>
        </>
      )}

      {vista === 'seguridad' && (
        <>
          <div className="tarjeta" style={{ borderColor: 'var(--negativo)' }}>
            <div className="tarjeta-cuerpo" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <ShieldAlert size={17} style={{ color: 'var(--negativo)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Alergia al maní</div>
                <div className="dato" style={{ fontSize: 13 }}>
                  Ninguna de las {RECETARIO_HIJA.length} recetas de su plan contiene maní ni frutos secos.
                  Si aún no tienen un plan de acción escrito ante una reacción, pídelo en el control.
                </div>
              </div>
            </div>
          </div>

          <div className="espacio" />
          <h4 className="subtitulo">Al servirle</h4>
          <section className="tarjeta">
            <div className="tarjeta-cuerpo">
              {SEGURIDAD_HIJA.map((x, i) => (
                <p key={i} style={{ margin: '0 0 10px', fontSize: 14 }}>· {x}</p>
              ))}
            </div>
          </section>
        </>
      )}

      {vista === 'conducta' && (
        <>
          <p className="parrafo">
            A esta edad el rechazo a los alimentos nuevos es una etapa esperable, no un problema de
            crianza. Lo que funciona es la exposición repetida sin presión.
          </p>
          <section className="tarjeta">
            <div className="tarjeta-cuerpo">
              {CONDUCTA_HIJA.map((x, i) => (
                <p key={i} style={{ margin: '0 0 10px', fontSize: 14 }}>· {x}</p>
              ))}
            </div>
          </section>
          <div className="espacio" />
          <div className="nota">
            <div className="nota-titulo">Sobre camuflar</div>
            Camuflar sirve para asegurar el aporte nutricional, pero no le enseña a comer legumbres.
            En paralelo, ofrécele de vez en cuando lentejas o garbanzos a la vista, sin obligarla a
            probarlos. El objetivo a largo plazo es que las reconozca y las acepte.
          </div>
        </>
      )}
    </>
  );
}
