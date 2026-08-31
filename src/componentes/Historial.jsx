import React, { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { etiquetaTipo, fechaLegible } from '../utiles';
import { Boton, Etiqueta, Kpi, Chips, Vacio } from './Comunes';

const FILTROS = [['todos', 'Todo'], ['reemplazado', 'Cambios'], ['omitido', 'No preparados']];

export default function Historial({ historial, onVaciar }) {
  const [filtro, setFiltro] = useState('todos');
  const [confirmar, setConfirmar] = useState(false);

  const stats = useMemo(() => {
    const motivos = {};
    const platos = {};
    let r = 0, o = 0;
    for (const h of historial) {
      motivos[h.motivo] = (motivos[h.motivo] || 0) + 1;
      platos[h.sugerido] = (platos[h.sugerido] || 0) + 1;
      if (h.estado === 'reemplazado') r++; else o++;
    }
    return {
      r, o,
      motivos: Object.entries(motivos).sort((a, b) => b[1] - a[1]),
      platos: Object.entries(platos).sort((a, b) => b[1] - a[1]).slice(0, 5),
    };
  }, [historial]);

  const visibles = historial.filter((h) => filtro === 'todos' || h.estado === filtro);

  return (
    <>
      <div className="kpis kpis-3">
        <Kpi valor={historial.length} etiqueta="discrepancias registradas" />
        <Kpi valor={stats.r} etiqueta="cambios" color="var(--critico)" />
        <Kpi valor={stats.o} etiqueta="omitidos" color="var(--negativo)" />
      </div>
      <div className="espacio" />

      {stats.motivos.length > 0 && (
        <section className="tarjeta">
          <div className="tarjeta-cuerpo">
            <h4 className="subtitulo">Por qué se cae el plan</h4>
            {stats.motivos.map(([m, n]) => (
              <div key={m} className="barra-fila">
                <div className="barra-cabecera"><span>{m}</span><span className="dato">{n}</span></div>
                <div className="barra-pista">
                  <div className="barra-valor" style={{ width: `${(n / stats.motivos[0][1]) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {stats.platos.length > 0 && (
        <section className="tarjeta">
          <div className="tarjeta-cuerpo">
            <h4 className="subtitulo" style={{ marginBottom: 2 }}>Preparaciones que más se reemplazan</h4>
            <p className="parrafo">Considera sacarlas del plan o simplificarlas.</p>
            {stats.platos.map(([p, n]) => (
              <div key={p} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--borde-sutil)', fontSize: 14 }}>
                <span>{p}</span><span style={{ color: 'var(--critico)' }}>{n}x</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="espacio" />
      <Chips opciones={FILTROS} valor={filtro} onCambio={setFiltro} />
      <div className="espacio" />

      {visibles.length === 0 ? (
        <Vacio>
          Sin discrepancias registradas. A medida que marques las comidas de la semana,
          aquí se acumula el contraste entre lo sugerido y lo real.
        </Vacio>
      ) : (
        <>
          {visibles.map((h) => (
            <article key={h._id} className="tarjeta">
              <div className="tarjeta-cuerpo" style={{ padding: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
                  <span className="dato" style={{ fontSize: 12 }}>
                    {fechaLegible(h.fecha)} · {etiquetaTipo(h.tipo)}
                  </span>
                  {h.estado === 'omitido'
                    ? <Etiqueta tono="negativa">no se preparó</Etiqueta>
                    : <Etiqueta tono="critica">cambiado</Etiqueta>}
                </div>
                <div className="tachado" style={{ fontSize: 14 }}>{h.sugerido}</div>
                {h.real && <div style={{ fontSize: 14, marginTop: 2 }}>{h.real}</div>}
                <div className="dato" style={{ fontSize: 12, marginTop: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <AlertCircle size={12} />{h.motivo}
                </div>
              </div>
            </article>
          ))}
          <div className="espacio" />
          {confirmar ? (
            <div className="fila">
              <Boton variante="secundario" onClick={() => setConfirmar(false)}>Cancelar</Boton>
              <Boton variante="peligro" onClick={() => { onVaciar(); setConfirmar(false); }}>
                Sí, borrar todo
              </Boton>
            </div>
          ) : (
            <Boton bloque variante="peligro" chico onClick={() => setConfirmar(true)}>
              Borrar todo el historial
            </Boton>
          )}
        </>
      )}
    </>
  );
}
