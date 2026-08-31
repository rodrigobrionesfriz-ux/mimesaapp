import React, { useState, useRef } from 'react';
import { Upload, FileText } from 'lucide-react';
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
        Sube el documento Word que entregó la nutricionista. Las indicaciones detectadas aparecerán
        sobre el planificador semanal como referencia al armar los menús.
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
