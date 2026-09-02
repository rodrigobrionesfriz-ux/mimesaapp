// ============================================================================
// Consolidación de ingredientes para la lista de compras.
//
// Los ingredientes de las recetas están escritos en lenguaje de cocina
// ("2 huevos", "½ taza de avena", "Jugo de ½ limón"). Aquí se interpretan
// para poder sumarlos: si tres preparaciones de la semana usan 2, 2 y 4
// huevos, la lista muestra una sola línea con 8 huevos.
// ============================================================================

const FRACCIONES = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125 };

// Unidades que se pueden convertir entre sí dentro de una misma familia.
const UNIDADES = [
  // cucharas y tazas, todo medido en cucharaditas
  { rx: /^(tazas?)\b/, u: 'taza', fam: 'cuchara', f: 48 },
  { rx: /^(cucharadas? soperas?|cucharadas?|cdas?\.?)\b/, u: 'cda', fam: 'cuchara', f: 3 },
  { rx: /^(cucharaditas?|cdtas?\.?)\b/, u: 'cdta', fam: 'cuchara', f: 1 },
  // peso, todo en gramos
  { rx: /^(kilos?|kg)\b/, u: 'g', fam: 'peso', f: 1000 },
  { rx: /^(gramos?|grs?\.?|g)\b/, u: 'g', fam: 'peso', f: 1 },
  // volumen, todo en mililitros
  { rx: /^(litros?|lt?s?)\b/, u: 'ml', fam: 'volumen', f: 1000 },
  { rx: /^(mililitros?|ml)\b/, u: 'ml', fam: 'volumen', f: 1 },
  // unidades que se cuentan y no se convierten
  { rx: /^(rebanadas?)\b/, u: 'rebanada', fam: null, f: 1 },
  { rx: /^(dientes?)\b/, u: 'diente', fam: null, f: 1 },
  { rx: /^(latas?)\b/, u: 'lata', fam: null, f: 1 },
  { rx: /^(tarros?)\b/, u: 'tarro', fam: null, f: 1 },
  { rx: /^(unidades?)\b/, u: 'unidad', fam: null, f: 1 },
  { rx: /^(ramas?)\b/, u: 'rama', fam: null, f: 1 },
  { rx: /^(varillas?)\b/, u: 'varilla', fam: null, f: 1 },
  { rx: /^(atados?)\b/, u: 'atado', fam: null, f: 1 },
];

// Estados de preparación: describen cómo se usa el alimento, no qué se compra.
const ESTADOS = new RegExp(
  '\\s+(cocid[oa]s?|hervid[oa]s?|crud[oa]s?|dur[oa]s?|madur[oa]s?|rallad[oa]s?|'
  + 'picad[oa]s?|escurrid[oa]s?|tostad[oa]s?|pelad[oa]s?|remojad[oa]s?|'
  + 'desmenuzad[oa]s?|chic[oa]s?|pequeñ[oa]s?|median[oa]s?|grandes?|'
  + 'fortificad[oa]s?|opcional(es)?|a gusto|a elección|muy picad[oa]s?|'
  + 'sin carozo|sin cocer|sin remojo)$', 'i',
);

const limpiarEstados = (s) => {
  let previo;
  do { previo = s; s = s.replace(ESTADOS, '').trim(); } while (s !== previo);
  return s;
};

// Productos que conviene tratar como uno solo en la lista de compras.
// Cosas que no se compran: salen de la llave o del propio tarro.
const IGNORAR = /^(agua|agua tibia|agua caliente|agua fría|agua del palmito|caldo de cocción.*|chorrito.*|relleno|aderezo|toppings?)$/i;

const SINONIMOS = [
  [/^(pechugas?|presas?|trutros?|filetes?) de pollo$/i, 'pollo'],
  [/^(filetes?) de (merluza|salmón|pescado).*$/i, 'pescado'],
  [/^bebida (vegetal|de almendras?|de avena|de soya|de coco|de arroz).*$/i, 'bebida vegetal'],
  [/^yogur.*sin lactosa.*$/i, 'yogur sin lactosa'],
  [/^yogur (natural|griego).*$/i, 'yogur sin lactosa'],
  [/^(sal|sal marina|sal de mar|sal y pimienta|sal y condimentos.*|pimienta|condimentos.*)$/i, 'sal, pimienta y condimentos'],
  [/^aceite$/i, 'aceite de oliva'],
  [/^(fruta|fruta de estación|fruta de temporada|fruta picada|berries o fruta.*|fruta a elección.*)$/i, 'fruta de estación'],
  [/^(ensalada|ensalada verde|ensalada variada|ensalada de hojas)$/i, 'verduras para ensalada'],
  [/^hojas verdes.*$/i, 'verduras para ensalada'],
  [/^(frutos rojos|berries)$/i, 'berries'],
  [/^granola.*$/i, 'granola'],
  [/^semillas? de chía$/i, 'chía'],
  [/^pan para crutones$/i, 'pan de molde'],
  [/^avena molida$/i, 'avena'],
  [/^tomates? cherry$/i, 'tomate cherry'],
  [/^pan de molde integral$/i, 'pan integral de molde'],
  [/^pan integral$/i, 'pan integral de molde'],
];

const aplicarSinonimos = (n) => {
  for (const [rx, canon] of SINONIMOS) if (rx.test(n)) return canon;
  return n;
};

// Productos donde la suma no ayuda a comprar: nadie pide "32 tazas de ensalada".
// Se listan igual, pero sin cantidad.
const SIN_CANTIDAD = /^(verduras para ensalada|lechuga|hojas verdes|verduras surtidas|verduras|fruta de estación)$/i;

/** Interpreta una línea de ingrediente. */
export function interpretar(linea) {
  const original = linea.trim();
  let s = original.toLowerCase();

  // "Jugo de ½ limón" → media unidad de limón.
  const jugo = s.match(/^(?:jugo|zumo) de\s+(.*)$/);
  if (jugo) s = jugo[1];

  // Cantidad al inicio: entero, decimal, fracción, mixto ("1 ½") o rango ("2 a 3").
  let cantidad = null;
  const num = s.match(/^(\d+(?:[.,]\d+)?)\s*(?:a|–|-)\s*(\d+(?:[.,]\d+)?)\s*/)
    || s.match(/^(\d+)\s*([½¼¾⅓⅔⅛])\s*/)
    || s.match(/^(\d+(?:[.,]\d+)?)\s*/)
    || s.match(/^([½¼¾⅓⅔⅛])\s*/);

  if (num) {
    const [todo, a, b] = num;
    if (b && FRACCIONES[b] !== undefined) cantidad = Number(a) + FRACCIONES[b];
    else if (b) cantidad = Math.max(Number(a.replace(',', '.')), Number(b.replace(',', '.')));
    else cantidad = FRACCIONES[a] !== undefined ? FRACCIONES[a] : Number(a.replace(',', '.'));
    s = s.slice(todo.length);
  }

  // Unidad de medida, si viene.
  let unidad = null, familia = null, factor = 1;
  for (const d of UNIDADES) {
    const m = s.match(d.rx);
    if (m) {
      unidad = d.u; familia = d.fam; factor = d.f;
      s = s.slice(m[0].length).trim();
      break;
    }
  }

  s = s.replace(/^(de|del|de la|de los)\s+/, '').trim();
  // "Un puñado de nueces" se compra igual que "nueces".
  s = s.replace(/^(un\s+)?(puñad[oa]s?|pizcas?|chorritos?|gotas?|hilos?)\s+de\s+/, '').trim();
  s = limpiarEstados(s);
  s = s.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  s = aplicarSinonimos(s);

  return {
    original,
    nombre: s || original.toLowerCase(),
    cantidad,
    unidad,
    familia,
    // Todo lo convertible se guarda en la unidad base de su familia.
    base: cantidad === null ? null : cantidad * factor,
  };
}

/* --------------------------- formato de salida --------------------------- */
const SIMBOLO = [[0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾']];

const numeroBonito = (n) => {
  const redondeado = Math.round(n * 100) / 100;
  const entero = Math.floor(redondeado + 1e-9);
  const resto = redondeado - entero;
  let frac = '';
  for (const [v, sim] of SIMBOLO) if (Math.abs(resto - v) < 0.06) frac = sim;
  if (!frac && resto > 0.06) return String(Math.round(redondeado * 10) / 10).replace('.', ',');
  if (entero === 0 && frac) return frac;
  return frac ? `${entero} ${frac}` : String(entero);
};

const plural = (n, sing, pl) => (Math.abs(n - 1) < 0.01 ? sing : pl);

// "3 papa" se lee mal: los productos que se cuentan por unidad se pluralizan.
const pluralizar = (n) => {
  // Se pluraliza el sustantivo principal: "fruta de estación" → "frutas de estación".
  const [cabeza, ...resto] = n.split(' ');
  if (/s$/.test(cabeza)) return n;
  let p;
  if (/ón$/.test(cabeza)) p = cabeza.replace(/ón$/, 'ones');
  else if (/[aeiouáéíóú]$/.test(cabeza)) p = `${cabeza}s`;
  else if (/z$/.test(cabeza)) p = cabeza.replace(/z$/, 'ces');
  else p = `${cabeza}es`;
  return [p, ...resto].join(' ');
};

/** Elige la unidad más legible dentro de la familia y arma el texto. */
function formatear(total, familia, unidad) {
  if (total === null) return null;

  // Para comprar siempre se redondea hacia arriba: nadie compra medio huevo.
  const arriba = (v, paso) => Math.ceil(v / paso - 1e-9) * paso;

  if (familia === 'cuchara') {
    if (total >= 24) {
      const t = arriba(total / 48, 0.25);
      return `${numeroBonito(t)} ${plural(t, 'taza', 'tazas')}`;
    }
    if (total >= 3) {
      const t = arriba(total / 3, 0.5);
      return `${numeroBonito(t)} ${plural(t, 'cda', 'cdas')}`;
    }
    const t = arriba(total, 0.5);
    return `${numeroBonito(t)} ${plural(t, 'cdta', 'cdtas')}`;
  }
  if (familia === 'peso') {
    return total >= 1000
      ? `${numeroBonito(arriba(total / 1000, 0.1))} kg`
      : `${numeroBonito(arriba(total, 10))} g`;
  }
  if (familia === 'volumen') {
    return total >= 1000
      ? `${numeroBonito(arriba(total / 1000, 0.1))} L`
      : `${numeroBonito(arriba(total, 10))} ml`;
  }
  total = arriba(total, 1);
  if (unidad) {
    const pl = { rebanada: 'rebanadas', diente: 'dientes', lata: 'latas', tarro: 'tarros',
      unidad: 'unidades', rama: 'ramas', varilla: 'varillas', atado: 'atados' }[unidad] || `${unidad}s`;
    return `${numeroBonito(total)} ${plural(total, unidad, pl)}`;
  }
  return numeroBonito(total);
}

/**
 * Consolida las líneas de ingrediente de toda la semana.
 * @param lineas  array de strings, con repeticiones
 * @param factor  cuántas raciones adultas se van a comprar
 * @returns array de { clave, nombre, cantidad, veces }
 */
// "Cebolla y ajo" son dos productos distintos en el carro. Sólo se separan las
// líneas sin cantidad, para no romper cosas como "1 ½ taza de quinoa".
const separar = (linea) => (
  /^\s*[\d½¼¾⅓⅔⅛]/.test(linea) || !/(\s+y\s+|,)/i.test(linea)
    ? [linea]
    : linea.split(/\s+y\s+|\s*,\s*/i).map((x) => x.trim()).filter(Boolean)
);

export function consolidar(lineas, factor = 1) {
  const acumulado = new Map();

  for (const linea of lineas.flatMap(separar)) {
    const it = interpretar(linea);
    if (IGNORAR.test(it.nombre)) continue;
    // Se agrupa por producto y por unidad, salvo que la unidad sea convertible.
    const clave = `${it.nombre}|${it.familia || it.unidad || (it.cantidad === null ? 'suelto' : 'conteo')}`;
    const prev = acumulado.get(clave);
    if (prev) {
      prev.veces += 1;
      if (it.base !== null) prev.total = (prev.total ?? 0) + it.base;
    } else {
      acumulado.set(clave, {
        clave, nombre: it.nombre, familia: it.familia, unidad: it.unidad,
        total: it.base, veces: 1,
      });
    }
  }

  // Un producto que en una receta lleva cantidad y en otra va "a gusto" es el
  // mismo producto: se conserva la cantidad y se suman las preparaciones.
  for (const [clave, item] of [...acumulado]) {
    if (item.total !== null) continue;
    const conCantidad = [...acumulado.values()]
      .find((o) => o.nombre === item.nombre && o.total !== null);
    if (conCantidad) {
      conCantidad.veces += item.veces;
      acumulado.delete(clave);
    }
  }

  // "huevo" y "huevos" son el mismo producto: se fusionan en el plural.
  for (const [clave, item] of [...acumulado]) {
    if (!item.nombre.endsWith('s')) {
      const enPlural = `${item.nombre}s|${clave.split('|')[1]}`;
      const destino = acumulado.get(enPlural);
      if (destino) {
        destino.veces += item.veces;
        if (item.total !== null) destino.total = (destino.total ?? 0) + item.total;
        acumulado.delete(clave);
      }
    }
  }

  return [...acumulado.values()]
    .map((it) => {
      const cuenta = !it.familia && !it.unidad && it.total !== null;
      const n = cuenta && it.total * factor > 1 ? pluralizar(it.nombre) : it.nombre;
      return {
      clave: it.clave,
      nombre: n.charAt(0).toUpperCase() + n.slice(1),
      cantidad: SIN_CANTIDAD.test(it.nombre)
        ? null
        : formatear(it.total === null ? null : it.total * factor, it.familia, it.unidad),
      veces: it.veces,
      };
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}
