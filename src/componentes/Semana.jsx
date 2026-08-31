import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Clock, Leaf, Check, Replace, X, Pill } from 'lucide-react';
import { TIPOS, DIAS, iso, sumarDias, lunesDe, fechaCorta } from '../utiles';
import { PLAN, SUPLEMENTO, describirPorciones } from '../datos/pauta';
import { Boton, Etiqueta, Vacio } from './Comunes';

export default function Semana({ inicio, setInicio, fechas, plan, porId, generar, abrir, pauta, generando }) {
  const hoy = iso(new Date());
  const vacia = Object.keys(plan).length === 0;

  const legumbresLogradas = fechas.reduce((n, f) => {
    const d = plan[iso(f)];
    if (!d) return n;
    return n + TIPOS.filter((t) => porId[d[t.k]?.id]?.leg === 'oculta' && d[t.k]?.estado === 'cumplido').length;
  }, 0);

  return (
    <>
      <div className="periodo">
        <button className="icono-btn" aria-label="Semana anterior" onClick={() => setInicio(sumarDias(inicio, -7))}>
          <ChevronLeft size={17} />
        </button>
        <div className="periodo-titulo">
          <strong>{fechaCorta(fechas[0])} – {fechaCorta(fechas[6])}</strong>
          <span>{fechas[0].getFullYear()}</span>
        </div>
        <button className="icono-btn" aria-label="Semana siguiente" onClick={() => setInicio(sumarDias(inicio, 7))}>
          <ChevronRight size={17} />
        </button>
      </div>

      <div className="fila" style={{ marginBottom: 16 }}>
        <Boton chico onClick={generar} disabled={generando}>
          <Sparkles size={15} />{generando ? 'Armando…' : vacia ? 'Armar la semana' : 'Rearmar la semana'}
        </Boton>
        <Boton chico variante="secundario" style={{ flex: '0 0 auto' }} onClick={() => setInicio(lunesDe(new Date()))}>
          Hoy
        </Boton>
      </div>

      {pauta?.pautas?.length > 0 && (
        <div className="nota" style={{ marginBottom: 14 }}>
          <div className="nota-titulo">Del documento cargado</div>
          {pauta.pautas.slice(0, 3).map((p, i) => <div key={i}>· {p}</div>)}
        </div>
      )}

      {!vacia && (
        <div className="tarjeta" style={{ marginBottom: 14 }}>
          <div className="tarjeta-cuerpo" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: 12 }}>
            <Leaf size={17} style={{ color: 'var(--marca)', flexShrink: 0 }} />
            <span className="dato">
              Legumbres camufladas ya comidas esta semana: <strong style={{ color: 'var(--texto)' }}>{legumbresLogradas}</strong> de 4
            </span>
          </div>
        </div>
      )}

      {vacia ? (
        <Vacio>
          Esta semana está sin planificar.<br />
          Arma la semana y después ajusta cualquier comida tocándola.
        </Vacio>
      ) : fechas.map((f, i) => {
        const fk = iso(f);
        const dia = plan[fk];
        const esHoy = fk === hoy;
        return (
          <section key={fk} className={`tarjeta${esHoy ? ' tarjeta-hoy' : ''}`}>
            <div className="tarjeta-cabecera">
              <h3>{DIAS[i]}</h3>
              <span className="dato">{fechaCorta(f)}{esHoy ? ' · hoy' : ''}</span>
            </div>
            {TIPOS.map((t) => {
              const slot = dia?.[t.k];
              const r = slot ? porId[slot.id] : null;
              const objetivo = PLAN[t.k]?.objetivo;
              return (
                <button key={t.k} className="comida" onClick={() => abrir(fk, t.k)}>
                  <span className="comida-tipo">
                    {t.corto}
                    {objetivo && (
                      <span className="comida-objetivo">{describirPorciones(objetivo)}</span>
                    )}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className={`comida-plato${slot?.estado === 'omitido' ? ' comida-omitida' : ''}`}>
                      {r ? r.n : '—'}
                    </span>
                    {slot?.estado === 'reemplazado' && <span className="comida-real">Se preparó: {slot.real}</span>}
                    <span className="etiquetas">
                      {r && <Etiqueta><Clock size={11} />{r.min} min</Etiqueta>}
                      {r?.leg === 'oculta' && <Etiqueta tono="marca"><Leaf size={11} />legumbre oculta</Etiqueta>}
                      {slot?.estado === 'cumplido' && <Etiqueta tono="positiva"><Check size={11} />preparado</Etiqueta>}
                      {slot?.estado === 'reemplazado' && <Etiqueta tono="critica"><Replace size={11} />cambiado</Etiqueta>}
                      {slot?.estado === 'omitido' && <Etiqueta tono="negativa"><X size={11} />no se hizo</Etiqueta>}
                    </span>
                  </span>
                </button>
              );
            })}
            <div className="suplemento">
              <Pill size={13} />
              {SUPLEMENTO.nombre} · {SUPLEMENTO.momento.toLowerCase()} · {SUPLEMENTO.cantidad}
            </div>
          </section>
        );
      })}
    </>
  );
}
