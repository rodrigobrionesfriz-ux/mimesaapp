import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MESES, TIPOS, iso, lunesDe, sumarDias } from '../utiles';
import { semanasEnRango } from '../datos/nube';
import { Kpi } from './Comunes';

export default function Mes({ hogarId }) {
  const [ref, setRef] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [dias, setDias] = useState({});
  const [cargando, setCargando] = useState(true);

  const anio = ref.getFullYear();
  const mes = ref.getMonth();

  useEffect(() => {
    let vivo = true;
    (async () => {
      setCargando(true);
      const desde = iso(lunesDe(new Date(anio, mes, 1)));
      const hasta = iso(sumarDias(new Date(anio, mes + 1, 0), 1));
      const semanas = await semanasEnRango(hogarId, desde, hasta).catch(() => []);
      if (!vivo) return;
      const acum = {};
      for (const s of semanas) {
        for (const [fecha, dia] of Object.entries(s.plan || {})) {
          let p = 0, c = 0, r = 0, o = 0;
          for (const t of TIPOS) {
            const sl = dia[t.k];
            if (!sl) continue;
            p++;
            if (sl.estado === 'cumplido') c++;
            else if (sl.estado === 'reemplazado') r++;
            else if (sl.estado === 'omitido') o++;
          }
          if (p) acum[fecha] = { p, c, r, o };
        }
      }
      setDias(acum);
      setCargando(false);
    })();
    return () => { vivo = false; };
  }, [hogarId, anio, mes]);

  const primero = new Date(anio, mes, 1);
  const offset = (primero.getDay() + 6) % 7;
  const total = new Date(anio, mes + 1, 0).getDate();
  const celdas = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];

  const delMes = Object.entries(dias).filter(([f]) => f.startsWith(`${anio}-${String(mes + 1).padStart(2, '0')}`));
  const acum = delMes.reduce((a, [, v]) => ({ p: a.p + v.p, c: a.c + v.c, r: a.r + v.r, o: a.o + v.o }), { p: 0, c: 0, r: 0, o: 0 });
  const registrados = acum.c + acum.r + acum.o;

  const colorDia = (d) => {
    const f = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const v = dias[f];
    if (!v) return null;
    const reg = v.c + v.r + v.o;
    if (!reg) return 'var(--borde)';
    const pct = v.c / reg;
    if (pct >= 0.75) return 'var(--positivo)';
    if (pct >= 0.4) return 'var(--critico)';
    return 'var(--negativo)';
  };

  return (
    <>
      <div className="periodo">
        <button className="icono-btn" aria-label="Mes anterior" onClick={() => setRef(new Date(anio, mes - 1, 1))}>
          <ChevronLeft size={17} />
        </button>
        <div className="periodo-titulo">
          <strong style={{ textTransform: 'capitalize' }}>{MESES[mes]} {anio}</strong>
        </div>
        <button className="icono-btn" aria-label="Mes siguiente" onClick={() => setRef(new Date(anio, mes + 1, 1))}>
          <ChevronRight size={17} />
        </button>
      </div>

      <div className="tarjeta">
        <div className="tarjeta-cuerpo">
          <div className="mes-grilla" style={{ marginBottom: 6 }}>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
              <div key={i} className="dato" style={{ textAlign: 'center', fontSize: 11.5 }}>{d}</div>
            ))}
          </div>
          <div className="mes-grilla">
            {celdas.map((d, i) => (
              <div key={i} className={d ? 'mes-dia' : 'mes-dia mes-dia-vacio'}>
                {d && <>
                  <span>{d}</span>
                  <span className="punto" style={{ background: colorDia(d) || 'transparent' }} />
                </>}
              </div>
            ))}
          </div>
          <div className="leyenda">
            <span><i className="punto" style={{ background: 'var(--positivo)' }} />día bien seguido</span>
            <span><i className="punto" style={{ background: 'var(--critico)' }} />parcial</span>
            <span><i className="punto" style={{ background: 'var(--negativo)' }} />mayoría cambiada</span>
          </div>
        </div>
      </div>

      <div className="espacio" />
      <h3 className="subtitulo">Resumen del mes</h3>
      {cargando ? <p className="parrafo">Cargando el mes…</p> : (
        <div className="kpis">
          <Kpi valor={registrados ? `${Math.round(acum.c / registrados * 100)}%` : '—'} etiqueta="se preparó como estaba planificado" />
          <Kpi valor={acum.p} etiqueta="comidas planificadas" />
          <Kpi valor={acum.r} etiqueta="cambios sobre la marcha" color="var(--critico)" />
          <Kpi valor={acum.o} etiqueta="comidas que no se hicieron" color="var(--negativo)" />
        </div>
      )}
    </>
  );
}
