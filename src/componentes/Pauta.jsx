import React, { useState, useRef } from 'react';
import { Upload, FileText, Pill, AlertTriangle } from 'lucide-react';
import { TIPOS, etiquetaTipo } from '../utiles';
import { PLAN, SUPLEMENTO, OBSERVACIONES, describirPorciones } from '../datos/pauta';
import { Boton } from './Comunes';

const CLAVE = /(desayuno|colaci|almuerzo|cena|once|porci|evitar|preferir|aumentar|reducir|lactosa|legumbre|fibra|prote|agua|az[úu]car|verdura|fruta|integral|sal\b|grasa)/i;

const extraerPautas = (texto) =>
  texto.split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 15 && l.length < 220 && CLAVE.test(l))
    .slice(0, 30);

export default function Pauta({ pauta, onGuardar, onQuitar }) {
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState(null);
  const entrada = useRef(null);

  const subir = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError(null);

    if (!/\.docx$/i.test(file.name)) {
      setError('El archivo debe ser .docx. Si tienes un .doc antiguo, ábrelo en Word y guárdalo como .docx.');
      return;
    }

    setSubiendo(true);
    try {
      const mammoth = (await import('mammoth')).default;
      const buffer = await file.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer: buffer });
      await onGuardar({
        nombre: file.name,
        fecha: new Date().toISOString(),
        texto: value.slice(0, 400000),
        pautas: extraerPautas(value),
      });
    } catch {
      setError('No se pudo leer el documento. Verifica que sea un .docx válido y vuelve a intentarlo.');
    }
    setSubiendo(false);
  };

  return (
    <>
      <h3 className="subtitulo" style={{ marginBottom: 4 }}>Pauta de la nutricionista</h3>
      <p className="parrafo">
        Esta es la planificación entregada en consulta. Toda la app está construida sobre ella:
        los tiempos de comida, las porciones de cada grupo y el recetario.
      </p>

      <section className="tarjeta">
        <div className="tarjeta-cabecera">
          <h4 style={{ fontSize: 14 }}>Estructura del día</h4>
          <span className="dato" style={{ fontSize: 11.5 }}>porciones por tiempo</span>
        </div>
        {TIPOS.map((t) => (
          <div key={t.k} className="lista-item" style={{ alignItems: 'flex-start', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontWeight: 600 }}>{etiquetaTipo(t.k)}</span>
            <span style={{ color: 'var(--marca)', fontSize: 13.5 }}>
              {describirPorciones(PLAN[t.k]?.objetivo)}
            </span>
            <span className="dato" style={{ fontSize: 12.5 }}>Ej: {PLAN[t.k]?.ejemplo}</span>
          </div>
        ))}
      </section>

      <div className="espacio" />
      <div className="tarjeta">
        <div className="tarjeta-cuerpo" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 13 }}>
          <Pill size={16} style={{ color: 'var(--marca)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{SUPLEMENTO.nombre}</div>
            <div className="dato" style={{ fontSize: 13 }}>
              {SUPLEMENTO.momento} · {SUPLEMENTO.cantidad} · {SUPLEMENTO.frecuencia.toLowerCase()}
            </div>
          </div>
        </div>
      </div>

      <div className="espacio" />
      <div className="alerta alerta-error" style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
        <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          Las porciones de esta pauta están calculadas para una sola persona adulta. No las apliques
          a la hija de 3 años ni asumas que sirven igual para los dos adultos: eso hay que preguntarlo
          en la próxima consulta.
        </span>
      </div>

      <div className="espacio" />
      <section className="tarjeta">
        <div className="tarjeta-cabecera"><h4 style={{ fontSize: 14 }}>Observaciones de la consulta</h4></div>
        <div className="tarjeta-cuerpo">
          {OBSERVACIONES.map((o, i) => (
            <p key={i} style={{ margin: '0 0 10px', fontSize: 14 }}>· {o}</p>
          ))}
        </div>
      </section>

      <div className="espacio" />
      <h4 className="subtitulo" style={{ marginBottom: 4 }}>Documento de respaldo</h4>
      <p className="parrafo">
        Si la nutricionista entrega una versión nueva en Word, súbela aquí. Las indicaciones que se
        detecten aparecerán sobre el planificador semanal.
      </p>

      <input ref={entrada} type="file" accept=".docx" onChange={subir} hidden />
      {error && <div className="alerta alerta-error">{error}</div>}

      {!pauta ? (
        <div className="vacio">
          <Upload size={22} style={{ marginBottom: 12, opacity: .6 }} />
          <p style={{ marginTop: 0 }}>Ningún documento cargado todavía.</p>
          <Boton onClick={() => entrada.current?.click()} disabled={subiendo}>
            {subiendo ? 'Leyendo el documento…' : 'Elegir archivo .docx'}
          </Boton>
        </div>
      ) : (
        <>
          <div className="tarjeta">
            <div className="tarjeta-cuerpo">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <FileText size={16} style={{ color: 'var(--marca)' }} />
                <span style={{ fontSize: 14 }}>{pauta.nombre}</span>
              </div>
              <div className="dato" style={{ fontSize: 12 }}>
                Cargado el {new Date(pauta.fecha).toLocaleDateString('es-CL')}
              </div>
              <div className="espacio" />
              <div className="fila">
                <Boton variante="secundario" chico onClick={() => entrada.current?.click()} disabled={subiendo}>
                  {subiendo ? 'Leyendo…' : 'Reemplazar'}
                </Boton>
                <Boton variante="peligro" chico onClick={onQuitar}>Quitar</Boton>
              </div>
            </div>
          </div>

          {pauta.pautas?.length > 0 && (
            <>
              <div className="espacio" />
              <div className="nota">
                <div className="nota-titulo">Indicaciones detectadas</div>
                {pauta.pautas.map((p, i) => <p key={i} style={{ margin: '0 0 6px' }}>· {p}</p>)}
              </div>
            </>
          )}

          <div className="espacio" />
          <section className="tarjeta">
            <div className="tarjeta-cuerpo">
              <h4 className="subtitulo">Documento completo</h4>
              <pre className="documento">{pauta.texto}</pre>
            </div>
          </section>
        </>
      )}
    </>
  );
}
