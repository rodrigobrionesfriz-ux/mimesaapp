import React, { useState, useEffect } from 'react';
import {
  Plus, Trash2, Clock, Leaf, ChevronRight, AlertTriangle, ShieldCheck,
  Printer, Pencil, RotateCcw, ArrowUp, ArrowDown, X,
} from 'lucide-react';
import { TIPOS, EXTRAS, etiquetaTipo } from '../utiles';
import { PLAN, describirPorciones } from '../datos/pauta';
import { Boton, Etiqueta, Chips } from './Comunes';
import Hoja from './Hoja';
import DetalleReceta from './DetalleReceta';

const FILTROS = [
  ['todas', 'Todas'], ['propias', 'Mías'], ['editadas', 'Editadas'],
  ['desayuno', 'Desayunos'], ['colacion_am', 'Colación AM'], ['almuerzo', 'Almuerzos'],
  ['colacion_pm', 'Colación PM'], ['cena', 'Once / cena'], ['colacion_opcional', 'Opcional'],
  ['hija', 'De la hija'], ['salsa', 'Salsas'], ['base', 'Bases y untables'],
  ['oculta', 'Con legumbre oculta'], ['rapida', '20 min o menos'],
];

const CAMPOS_PORCION = [
  ['cer', 'Cereal'], ['pro', 'Proteína'], ['fru', 'Fruta'],
  ['lac', 'Lácteo'], ['ver', 'Verduras'], ['arl', 'ARL'],
];

// La hija es alérgica al maní: ninguna receta puede entrar con él.
const MANI = /man[íi]|cacahuat|cacahuet|peanut/i;

const TIPOS_EDITABLES = [
  ...TIPOS.map((t) => [t.k, t.label]),
  ['once', EXTRAS.once],
  ['salsa', EXTRAS.salsa],
  ['base', EXTRAS.base],
];

const enBlanco = () => ({
  id: null, n: '', t: 'almuerzo', min: '20', leg: false,
  ing: [''], pasos: [''], truco: '',
  cer: '', pro: '', fru: '', lac: '', ver: '', arl: '',
});

const aFormulario = (r) => ({
  id: r.id,
  n: r.n, t: r.t, min: String(r.min ?? 20),
  leg: r.leg === 'oculta',
  ing: r.ing?.length ? [...r.ing] : [''],
  pasos: r.pasos?.length ? [...r.pasos] : [''],
  truco: r.truco || '',
  cer: r.p?.cer ?? '', pro: r.p?.pro ?? '', fru: r.p?.fru ?? '',
  lac: r.p?.lac ?? '', ver: r.p?.ver ?? '', arl: r.p?.arl ?? '',
  // Se conservan los datos que el formulario no edita.
  extra: { al: r.al || null, origen: r.origen || null, perfil: r.perfil || null },
});

export default function Recetas({
  recetas, onAgregar, onEditar, onBorrar, onImprimir, editarInicial, onConsumirEditar,
}) {
  const [filtro, setFiltro] = useState('todas');
  const [form, setForm] = useState(null);
  const [abierta, setAbierta] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  // Cuando se pide editar desde el planificador, se abre el formulario cargado.
  useEffect(() => {
    if (editarInicial) {
      setForm(aFormulario(editarInicial));
      setAbierta(null);
      onConsumirEditar?.();
    }
  }, [editarInicial, onConsumirEditar]);

  const visibles = recetas.filter((r) =>
    filtro === 'todas' ? true
      : filtro === 'propias' ? r.propia
      : filtro === 'editadas' ? r.editada
      : filtro === 'hija' ? (r.deLaHija || r.perfil === 'hija')
      : filtro === 'oculta' ? r.leg === 'oculta'
      : filtro === 'rapida' ? r.min <= 20
      : r.t === filtro);

  /* ------------------------------ guardar ------------------------------ */
  const guardar = async () => {
    setError(null);
    if (!form.n.trim()) { setError('Ponle un nombre a la receta.'); return; }

    const ing = form.ing.map((x) => x.trim()).filter(Boolean);
    const pasos = form.pasos.map((x) => x.trim()).filter(Boolean);
    if (!ing.length) { setError('Agrega al menos un ingrediente.'); return; }
    if (!pasos.length) { setError('Agrega al menos un paso de preparación.'); return; }

    if ([form.n, ...ing, ...pasos].some((x) => MANI.test(x))) {
      setError('Esta receta menciona maní y la hija es alérgica. Cámbialo antes de guardar.');
      return;
    }

    const porciones = {};
    for (const [k] of CAMPOS_PORCION) {
      const v = Number(form[k]);
      if (v > 0) porciones[k] = v;
    }

    const datos = {
      n: form.n.trim(),
      t: form.t,
      min: Number(form.min) || 20,
      leg: form.leg ? 'oculta' : null,
      p: Object.keys(porciones).length ? porciones : null,
      ing,
      pasos,
      truco: form.truco.trim() || 'Receta de la familia.',
      ...(form.extra?.al ? { al: form.extra.al } : {}),
      ...(form.extra?.origen ? { origen: form.extra.origen } : {}),
      ...(form.extra?.perfil ? { perfil: form.extra.perfil } : {}),
    };

    setGuardando(true);
    try {
      if (form.id) {
        if (typeof onEditar !== 'function') throw new Error('sin-editar');
        await onEditar(form.id, datos);
      } else {
        await onAgregar(datos);
      }
      setForm(null);
    } catch (e) {
      // Sin esto, un fallo de escritura dejaba el botón en "Guardando…" sin explicar nada.
      const codigo = e?.code || e?.message || '';
      if (codigo === 'sin-editar') {
        setError('Falta actualizar la app. Sube de nuevo App.jsx y src/datos/nube.js: '
          + 'sin esos dos archivos el botón de guardar no tiene a dónde escribir.');
      } else if (String(codigo).includes('permission-denied')) {
        setError('Firestore rechazó la escritura. Revisa que las reglas publicadas incluyan '
          + 'la subcolección recetas del hogar (archivo firestore.rules).');
      } else if (String(codigo).includes('unavailable')) {
        setError('Sin conexión. El cambio se guardará solo cuando vuelva la señal.');
      } else {
        setError(`No se pudo guardar: ${codigo || 'error desconocido'}.`);
      }
    } finally {
      setGuardando(false);
    }
  };

  /* ---------------------------- formulario ---------------------------- */
  if (form) {
    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    const editando = Boolean(form.id);
    const objetivoTexto = describirPorciones(PLAN[form.t]?.objetivo) || 'lo que estimes';

    // Listas dinámicas de ingredientes y pasos.
    const cambiarLista = (campo, i, valor) => {
      const lista = [...form[campo]];
      lista[i] = valor;
      setForm({ ...form, [campo]: lista });
    };
    const agregarFila = (campo) => setForm({ ...form, [campo]: [...form[campo], ''] });
    const quitarFila = (campo, i) => {
      const lista = form[campo].filter((_, j) => j !== i);
      setForm({ ...form, [campo]: lista.length ? lista : [''] });
    };
    const mover = (campo, i, dir) => {
      const lista = [...form[campo]];
      const j = i + dir;
      if (j < 0 || j >= lista.length) return;
      [lista[i], lista[j]] = [lista[j], lista[i]];
      setForm({ ...form, [campo]: lista });
    };

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <h3 className="subtitulo" style={{ marginBottom: 0 }}>
            {editando ? 'Editar receta' : 'Nueva receta'}
          </h3>
          <button onClick={() => { setForm(null); setError(null); }} aria-label="Cerrar"
            style={{ background: 'none', border: 'none', color: 'var(--texto-tenue)', padding: 4 }}>
            <X size={19} />
          </button>
        </div>
        <p className="parrafo">
          {editando
            ? 'Los cambios quedan guardados para el hogar y reemplazan a la versión original.'
            : 'Queda guardada en el hogar y aparece de inmediato en el planificador y en los reemplazos.'}
        </p>
        {error && <div className="alerta alerta-error">{error}</div>}

        <input placeholder="Nombre de la preparación" value={form.n} onChange={set('n')} />
        <div className="espacio" />
        <div className="fila">
          <select value={form.t} onChange={set('t')} style={{ flex: 2 }}>
            {TIPOS_EDITABLES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
          <input type="number" inputMode="numeric" placeholder="Minutos"
            value={form.min} onChange={set('min')} style={{ flex: 1 }} />
        </div>

        {/* ---------- ingredientes ---------- */}
        <div className="espacio" />
        <div className="subtitulo" style={{ marginBottom: 8 }}>Ingredientes</div>
        {form.ing.map((valor, i) => (
          <div key={i} className="fila-editable">
            <input value={valor} onChange={(e) => cambiarLista('ing', i, e.target.value)}
              placeholder={`Ingrediente ${i + 1}`} />
            <button className="icono-fila" onClick={() => quitarFila('ing', i)}
              aria-label={`Quitar ingrediente ${i + 1}`}>
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <Boton bloque variante="plano" chico onClick={() => agregarFila('ing')}>
          <Plus size={14} />Agregar ingrediente
        </Boton>

        {/* ---------- pasos ---------- */}
        <div className="espacio" />
        <div className="subtitulo" style={{ marginBottom: 8 }}>Preparación</div>
        {form.pasos.map((valor, i) => (
          <div key={i} className="fila-editable fila-paso">
            <span className="numero-paso">{i + 1}</span>
            <textarea rows={2} value={valor} placeholder={`Paso ${i + 1}`}
              onChange={(e) => cambiarLista('pasos', i, e.target.value)} />
            <div className="acciones-paso">
              <button className="icono-fila" onClick={() => mover('pasos', i, -1)}
                disabled={i === 0} aria-label="Subir paso"><ArrowUp size={14} /></button>
              <button className="icono-fila" onClick={() => mover('pasos', i, 1)}
                disabled={i === form.pasos.length - 1} aria-label="Bajar paso"><ArrowDown size={14} /></button>
              <button className="icono-fila" onClick={() => quitarFila('pasos', i)}
                aria-label="Quitar paso"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        <Boton bloque variante="plano" chico onClick={() => agregarFila('pasos')}>
          <Plus size={14} />Agregar paso
        </Boton>

        {/* ---------- resto ---------- */}
        <div className="espacio" />
        <input placeholder="Truco o nota (opcional)" value={form.truco} onChange={set('truco')} />
        <div className="espacio" />
        <div className="subtitulo" style={{ marginBottom: 4 }}>Porciones que aporta</div>
        <p className="dato" style={{ fontSize: 12.5, marginBottom: 10 }}>
          Según la guía de la nutricionista. La pauta de este tiempo pide {objetivoTexto}.
        </p>
        <div className="grilla-porciones">
          {CAMPOS_PORCION.map(([k, l]) => (
            <label key={k} className="campo-porcion">
              <span>{l}</span>
              <input type="number" min="0" step="0.5" inputMode="decimal"
                value={form[k]} onChange={set(k)} placeholder="0" />
            </label>
          ))}
        </div>
        <div className="espacio" />
        <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14 }}>
          <input type="checkbox" style={{ width: 'auto' }} checked={form.leg}
            onChange={(e) => setForm({ ...form, leg: e.target.checked })} />
          Lleva legumbre camuflada
        </label>
        <div className="espacio" />
        <div className="nota">
          <div className="nota-titulo">Recordatorio</div>
          Sin lactosa y sin maní. Si la receta original los lleva, reemplázalos antes de guardar.
        </div>
        <div className="espacio" />
        <div className="fila">
          <Boton variante="secundario" onClick={() => { setForm(null); setError(null); }}>
            Cancelar
          </Boton>
          <Boton style={{ flex: 2 }} disabled={guardando} onClick={guardar}>
            {guardando ? 'Guardando…' : 'Guardar receta'}
          </Boton>
        </div>
      </>
    );
  }

  /* ------------------------------ listado ------------------------------ */
  return (
    <>
      <Chips opciones={FILTROS} valor={filtro} onCambio={setFiltro} />
      <div className="espacio" />
      <Boton bloque onClick={() => setForm(enBlanco())}>
        <Plus size={15} />Agregar receta propia
      </Boton>
      <div className="espacio" />
      <p className="dato" style={{ marginBottom: 12 }}>
        {visibles.length} {visibles.length === 1 ? 'receta' : 'recetas'}. Toca cualquiera para ver
        el detalle y editarla.
      </p>

      {visibles.map((r) => (
        <div key={r.id} className="tarjeta">
          <button className="receta-fila" onClick={() => setAbierta(r)}>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="receta-nombre">{r.n}</span>
              <span className="etiquetas">
                <Etiqueta><Clock size={11} />{r.min} min</Etiqueta>
                <Etiqueta>{etiquetaTipo(r.t)}</Etiqueta>
                {r.leg === 'oculta' && <Etiqueta tono="marca"><Leaf size={11} />legumbre oculta</Etiqueta>}
                {r.al?.length > 0 && <Etiqueta tono="negativa"><AlertTriangle size={11} />{r.al[0]}</Etiqueta>}
                {r.propia && <Etiqueta tono="marca">mía</Etiqueta>}
                {r.editada && <Etiqueta tono="critica"><Pencil size={10} />editada</Etiqueta>}
                {(r.deLaHija || r.perfil === 'hija') && <Etiqueta tono="positiva">de la hija</Etiqueta>}
                {r.origen && !r.editada && <Etiqueta>{r.origen}</Etiqueta>}
              </span>
            </span>
            <ChevronRight size={17} style={{ color: 'var(--texto-tenue)', flexShrink: 0 }} />
          </button>
        </div>
      ))}

      {abierta && (
        <Hoja
          sobretitulo={`${etiquetaTipo(abierta.t)}${abierta.propia ? ' · receta propia' : ''}${abierta.editada ? ' · editada' : ''}`}
          titulo={abierta.n}
          onCerrar={() => setAbierta(null)}
        >
          <DetalleReceta receta={abierta} />
          <div className="espacio" />
          <Boton bloque onClick={() => { setForm(aFormulario(abierta)); setAbierta(null); }}>
            <Pencil size={16} />Editar esta receta
          </Boton>
          <div className="espacio" />
          <Boton bloque variante="secundario" onClick={() => onImprimir(abierta)}>
            <Printer size={16} />Imprimir esta receta
          </Boton>
          {abierta.editada && (
            <>
              <div className="espacio" />
              <Boton bloque variante="secundario"
                onClick={() => { onBorrar(abierta.id); setAbierta(null); }}>
                <RotateCcw size={15} />Restaurar la receta original
              </Boton>
            </>
          )}
          {abierta.propia && (
            <>
              <div className="espacio" />
              <Boton bloque variante="peligro" chico
                onClick={() => { onBorrar(abierta.id); setAbierta(null); }}>
                <Trash2 size={14} />Borrar esta receta
              </Boton>
            </>
          )}
        </Hoja>
      )}

      <div className="nota" style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <ShieldCheck size={15} style={{ flexShrink: 0, marginTop: 1, color: 'var(--marca)' }} />
        <span>
          Todas las recetas del listado están libres de lactosa y de maní. Las marcadas como
          de la hija están además pensadas en porciones y texturas para una niña de 3 años.
        </span>
      </div>
    </>
  );
}
