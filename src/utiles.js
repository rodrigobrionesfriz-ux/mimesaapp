export const TIPOS = [
  { k: 'desayuno', label: 'Desayuno' },
  { k: 'colacion', label: 'Colación' },
  { k: 'almuerzo', label: 'Almuerzo' },
  { k: 'cena', label: 'Cena' },
];

export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
export const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const sumarDias = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

export const lunesDe = (d) => {
  const x = new Date(d);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  x.setHours(0, 0, 0, 0);
  return x;
};

export const fechaCorta = (d) => `${d.getDate()} ${MESES[d.getMonth()].slice(0, 3)}`;
export const fechaLegible = (f) => f.split('-').reverse().join('/');

export const barajar = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const diaVacio = () => ({ desayuno: null, colacion: null, almuerzo: null, cena: null });

export const etiquetaTipo = (k) => TIPOS.find((t) => t.k === k)?.label || k;

// Agrupa ingredientes por pasillo de supermercado para la lista de compras.
export const categoria = (ing) => {
  const s = ing.toLowerCase();
  if (/(manzana|plátano|tomate|cebolla|zapallo|papa|zanahoria|espinaca|acelga|brócoli|lechuga|palta|pepino|limón|choclo|arveja|pimentón|ajo|cilantro|albahaca|betarraga|fruta|cebollín|porotos verdes|dátil)/.test(s))
    return 'Verduras y frutas';
  if (/(pollo|carne|pavo|huevo|merluza|salmón|atún|pescado|trutro|pechuga|presas)/.test(s))
    return 'Carnes, pescados y huevos';
  if (/(yogur|queso|bebida de|bebida vegetal)/.test(s))
    return 'Refrigerados y bebidas vegetales';
  if (/(pan|tortilla|masa madre)/.test(s))
    return 'Panadería';
  return 'Despensa';
};
