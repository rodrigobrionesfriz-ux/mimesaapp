// Pauta alimentaria de la nutricionista Francisca Fuentes Olave.
// Transcrita desde los documentos entregados a la consulta.
//
// IMPORTANTE: la pauta con las porciones está personalizada para UNA persona adulta.
// El esposo y sobre todo la hija de 3 años tienen requerimientos distintos.
// Las porciones de esta pauta NO deben aplicarse a la niña.

/* ---------------- estructura diaria de tiempos de comida ---------------- */
// Cada tiempo indica cuántas porciones de cada grupo debiese llevar.
// cer = cereal · pro = proteína · fru = fruta · lac = lácteo
// ver = verduras (mix verde) · arl = alimentos ricos en lípidos

export const PLAN = {
  desayuno: {
    objetivo: { cer: 2, pro: 2, fru: 1, lac: 1 },
    ejemplo: '2 rebanadas de pan de molde + pasta de huevo (sin sacar la yema) + 1 taza de frutillas con yogur sin lactosa',
  },
  colacion_am: {
    objetivo: { fru: 1, arl: 1 },
    ejemplo: '1 fruta + un puñado de frutos secos o media palta',
  },
  almuerzo: {
    objetivo: { cer: 1, pro: 2, ver: 2 },
    ejemplo: '¾ taza de arroz + 100 g de pollo + 2 tazas de ensalada de distintos colores',
  },
  colacion_pm: {
    objetivo: { fru: 1, lac: 1, cer: 0.5 },
    ejemplo: '1 yogur sin lactosa + ½ plátano + 2 cdas de avena o granola',
  },
  cena: {
    objetivo: { cer: 1, pro: 2, ver: 2 },
    ejemplo: '1 wrap + 1 lata de atún + guacamole + 1 taza de ensalada',
  },
  colacion_opcional: {
    objetivo: { lac: 1, cer: 0.5 },
    ejemplo: '1 yogur protein sin lactosa + 2 cdas de avena o granola',
  },
};

export const SUPLEMENTO = {
  nombre: 'Omega 3',
  momento: 'Antes de dormir',
  cantidad: '1 porción, +1000 mg EPA + DHA',
  frecuencia: 'Todos los días',
};

export const OBSERVACIONES = [
  'Sin restricciones: no saltarse comidas, no ayunar, no reducir porciones al extremo. No hay comida buena ni mala.',
  'Priorizar la proteína en los tres tiempos principales: desayuno, almuerzo y once/cena.',
  'Cada comida debe durar mínimo 20 minutos.',
  'Si aparece un antojo fuera de la pauta, incluirlo en una porción adecuada en vez de prohibirlo.',
  'El inicio es progresivo: al menos dos semanas de adaptación antes de esperar cumplimiento total.',
  'Las colaciones planificadas no son opcionales; tienen un objetivo dentro del plan.',
  'Preferir siempre el agua para hidratarse.',
];

/* ------------------------ equivalencias de porciones ------------------------ */
// Guía de porciones de alimentos. Una porción de cada grupo equivale a:

export const GRUPOS = [
  {
    k: 'cer', nombre: 'Cereales', color: 'var(--critico)',
    items: [
      ['Pan hallulla o marraqueta', '½ unidad'],
      ['Pan de molde', '3 rebanadas'],
      ['Pan integral de molde', '1 ¼ rebanada'],
      ['Pan amasado', '¼ rebanada'],
      ['Arroz, fideos, mote o maíz', '¾ taza'],
      ['Papa cocida', '1 unidad regular'],
      ['Avena, corn flakes', '½ taza'],
      ['Quinoa', '¾ taza'],
      ['Cous cous', '¾ taza'],
      ['Sémola', '3 cdas'],
      ['Granola', '¼ taza (30 g)'],
      ['Cabritas', '1 taza (25 g)'],
      ['Galletas de soda y agua', '6 unidades'],
      ['Galletas integrales', '6 a 7 unidades'],
      ['Arepa mediana', '50 g'],
      ['Tortilla para tacos', '1 XL o 2 medianas'],
      ['Choclo y habas', '1 taza'],
      ['Arvejas', '1 ½ taza'],
      ['Castaña', '4 unidades'],
      ['Piñón', '¾ taza o 30 unidades'],
    ],
  },
  {
    k: 'pro', nombre: 'Proteínas: carnes, huevos y legumbres', color: 'var(--negativo)',
    items: [
      ['Carne de vacuno, pollo, pavo', 'Palma de la mano (50 g)'],
      ['Pescado en general', 'Palma de la mano (50 g)'],
      ['Huevo entero', '1 unidad'],
      ['Atún en agua, camarón', '½ taza o 20 unidades'],
      ['Choritos, almejas', '6 unidades'],
      ['Jamón', '1 rebanada'],
      ['Lentejas, porotos', '¾ taza'],
      ['Garbanzos, arvejas cocidas', '¾ taza'],
      ['Carne vegetal de soya', '½ taza'],
      ['Tofu', '1 rebanada'],
    ],
  },
  {
    k: 'ver', nombre: 'Verduras', color: 'var(--positivo)',
    items: [
      ['Zanahoria, brócoli, coliflor, zapallo italiano, betarraga cruda', '1 taza'],
      ['Poroto verde, zapallo, betarraga cocida, berenjena, acelga, espinaca', '½ taza'],
      ['Champiñones, cebolla cruda', '¾ taza'],
      ['Tomate', '1 unidad'],
      ['Alcachofa', '1 unidad chica'],
      ['Espárrago, rabanito', '5 unidades'],
      ['Pickles', '3 unidades'],
      ['Libre consumo: lechuga, repollo, apio, pepino, pimentón, espinaca y zapallo italiano crudos, cochayuyo', '1 taza'],
    ],
  },
  {
    k: 'fru', nombre: 'Frutas', color: 'var(--marca)',
    items: [
      ['Plátano', '½ unidad'],
      ['Manzana, pera, naranja, durazno, membrillo, pepino dulce', '1 unidad'],
      ['Higos, kiwi', '2 unidades'],
      ['Ciruela, damasco, papaya, mandarina', '3 unidades'],
      ['Frambuesa, melón, frutilla, sandía, arándanos', '1 taza'],
      ['Uva', '10 unidades'],
      ['Cerezas', '15 unidades'],
      ['Mora, mango', '½ taza'],
    ],
  },
  {
    k: 'lac', nombre: 'Lácteos y bebidas vegetales', color: 'var(--marca)',
    items: [
      ['Leche sin lactosa, semi o descremada', '1 taza'],
      ['Bebida vegetal (soya, almendras, avena, coco)', '1 taza'],
      ['Yogur batido o yogur vegetal', '1 unidad'],
      ['Quesillo', 'Rodela de 3 cm'],
      ['Queso', '½ lámina'],
      ['Ricota', '50 g'],
      ['Tofu', '1 rebanada'],
    ],
  },
  {
    k: 'arl', nombre: 'ARL: alimentos ricos en lípidos', color: 'var(--critico)',
    items: [
      ['Palta', '3 cdas (½ unidad)'],
      ['Aceitunas', '11 unidades'],
      ['Nueces', '5 unidades'],
      ['Almendras', '26 unidades'],
      ['Pistachos', '40 unidades'],
      ['Avellanas', '50 unidades'],
    ],
    nota: 'El maní queda excluido de toda la pauta por la alergia de la hija.',
  },
  {
    k: 'gra', nombre: 'Aceites y grasas', color: 'var(--texto-tenue)',
    items: [
      ['Aceite de maravilla, soya u oliva', '4 cdtas'],
      ['Aceite de coco', '4 cdtas'],
      ['Mayonesa', '3 cdas'],
      ['Mayonesa light', '4 cdas'],
      ['Salsa pesto', '4 cdas'],
    ],
  },
  {
    k: 'azu', nombre: 'Azúcares', color: 'var(--texto-tenue)',
    items: [
      ['Azúcar, miel, mermelada, manjar', '1 cdta'],
      ['Bebida o néctar', '¼ taza'],
      ['Chocolate amargo o cacao', '7 cdtas'],
      ['Pasteles en general', '50 g'],
      ['Kétchup', '2 cdtas'],
      ['Mostaza', '2 cdtas'],
      ['Salsa de tomate', '2 cdas'],
    ],
  },
];

/* ---------------------------- guía de compras ---------------------------- */
export const COMPRAS_GUIA = [
  'Sigue la lista para evitar compras innecesarias.',
  'Parte por artículos de higiene y aseo, sigue con los alimentos no perecibles y deja para el final los refrigerados y congelados, para no cortar la cadena de frío.',
  'Revisa las fechas de vencimiento y prefiere alimentos de temporada.',
  'Mantén una lista en la cocina para anotar lo que se va acabando.',
];

/* --------------------------- meal prep y bodega --------------------------- */
export const MEAL_PREP = [
  'Elige un día tranquilo de la semana para adelantar preparaciones.',
  'Empieza por las guarniciones y acompañamientos, sigue con carnes o legumbres.',
  'Cocina en cantidades grandes para 2 o 3 días y guarda por porciones.',
  'Lava, desinfecta y seca las verduras de hoja; guárdalas en envase hermético con papel absorbente arriba y abajo.',
  'Corta las verduras del sofrito en cubos, porciónalas en bolsas y congélalas.',
  'Deja en el refrigerador lo del día siguiente y en el congelador lo de 2 a 3 días más.',
];

export const CONSERVACION = [
  ['Cereales y legumbres cocidas', '1 semana', '3 meses'],
  ['Verduras frescas', '5 a 7 días', '1 año'],
  ['Verduras cocidas', '3 a 5 días', '3 meses'],
  ['Frutas', '3 a 7 días', '10 a 12 meses'],
  ['Huevos', '30 días', 'No se deben congelar'],
  ['Pan', '3 días', '3 a 6 meses'],
  ['Carnes crudas', '1 a 3 días', '6 meses a 1 año'],
  ['Carnes cocidas', '3 días', '3 meses'],
  ['Pescados y mariscos', '1 a 2 días', '6 a 8 meses'],
  ['Leche, yogur y queso', '1 semana abierto', 'Solo queso, 1 a 3 meses'],
];

export const REFRIGERADOR = [
  ['Bandeja superior', 'Lácteos, huevos y embutidos'],
  ['Segunda bandeja', 'Productos preparados y listos para consumir'],
  ['Tercera bandeja', 'Carnes frescas'],
  ['Parte inferior', 'Frutas y verduras, en cajones cerrados'],
  ['Puerta', 'Salsas, jugos, agua y lácteos de consumo rápido'],
];

/* ------------------------------ etiquetas ------------------------------ */
export const NOMBRE_GRUPO = {
  cer: 'cereal', pro: 'proteína', fru: 'fruta',
  lac: 'lácteo', ver: 'verduras', arl: 'ARL', gra: 'grasa', azu: 'azúcar',
};

// Convierte { cer: 2, pro: 2 } en "2 cereal · 2 proteína"
export const describirPorciones = (p) => {
  if (!p) return '';
  return Object.entries(p)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `${v === 0.5 ? '½' : v} ${NOMBRE_GRUPO[k] || k}`)
    .join(' · ');
};
