// ============================================================================
// PLAN DE LA HIJA (3 años)
//
// Este plan NO viene de la consulta: la pauta entregada por la nutricionista
// está personalizada para una adulta. Esto es una guía práctica de estructura
// y porciones para preescolares, construida para organizar la semana, y debe
// validarse con su pediatra o con una nutricionista infantil.
//
// Restricciones de la niña:
//   · Alergia al maní -> ninguna preparación lo contiene, en ninguna forma.
//   · Rechazo a las legumbres a la vista -> van molidas, licuadas o integradas.
// ============================================================================

export const TIPOS_HIJA = [
  { k: 'desayuno', label: 'Desayuno', corto: 'Desayuno' },
  { k: 'colacion_am', label: 'Colación de media mañana', corto: 'Colación' },
  { k: 'almuerzo', label: 'Almuerzo', corto: 'Almuerzo' },
  { k: 'once', label: 'Once', corto: 'Once' },
  { k: 'cena', label: 'Cena liviana', corto: 'Cena' },
];

// Porciones prácticas. A esta edad se mide con las manos de ella, no con balanza.
export const PLAN_HIJA = {
  desayuno: {
    objetivo: 'Lácteo o bebida vegetal + cereal + fruta',
    ejemplo: '1 taza de bebida vegetal fortificada + ½ taza de avena cocida + ½ manzana rallada',
  },
  colacion_am: {
    objetivo: 'Fruta o una preparación casera',
    ejemplo: '½ plátano en rodajas o 2 galletas de avena y plátano',
  },
  almuerzo: {
    objetivo: 'Proteína + cereal o papa + verdura',
    ejemplo: 'Puré mixto de papa y arveja con pollo desmenuzado',
  },
  once: {
    objetivo: 'Lácteo o bebida vegetal + cereal + algo para untar',
    ejemplo: '½ pan con palta + 1 taza de bebida vegetal',
  },
  cena: {
    objetivo: 'Preparación liviana con proteína y verdura',
    ejemplo: 'Sopa crema de brócoli y papa con huevo picado',
  },
};

export const PORCIONES_HIJA = [
  ['Proteína: carne, pollo, pescado, huevo', 'Del tamaño de la palma de su mano, sin los dedos'],
  ['Cereal cocido: arroz, fideos, quinoa', '½ taza, más o menos su puño cerrado'],
  ['Papa o camote', '1 unidad chica'],
  ['Verduras', '2 a 3 cucharadas soperas por comida'],
  ['Fruta', '½ unidad mediana o 1 unidad chica'],
  ['Lácteo sin lactosa o bebida vegetal fortificada', '1 taza, 2 a 3 veces al día'],
  ['Aceite de oliva u otra grasa', '1 cucharadita por comida'],
  ['Legumbres camufladas', '2 a 3 cucharadas dentro de la preparación'],
  ['Agua', 'A libre demanda, ofrecida entre comidas'],
];

export const SEGURIDAD_HIJA = [
  'Nunca frutos secos enteros: a los 3 años son la principal causa de atoro. Van siempre molidos y solo si no hay riesgo de contacto con maní.',
  'Uvas y tomates cherry cortados a lo largo, en cuartos.',
  'Zanahoria cruda solo rallada, nunca en bastones duros.',
  'Nada de palomitas de maíz ni caramelos duros.',
  'Revisa siempre el etiquetado buscando "puede contener maní" o "elaborado en línea que procesa maní".',
  'Que coma sentada y acompañada, nunca caminando ni en el auto.',
];

export const CONDUCTA_HIJA = [
  'Ofrecer un alimento nuevo hasta 10 o 15 veces antes de concluir que no le gusta. El rechazo inicial es normal.',
  'Ella decide cuánto come; los adultos deciden qué se sirve y cuándo. No forzar ni premiar con postre.',
  'Servir porciones chicas y dejar que pida más: intimida menos que un plato lleno.',
  'Dejarla elegir entre dos opciones que a ti te sirven aumenta lo que come.',
  'Comer en familia y a la misma hora: copia lo que ve en la mesa.',
  'Si un día come poco, mirar la semana completa en vez del plato de hoy.',
];

// ============================================================================
// RECETARIO DE LA HIJA
// Cantidades para una niña de 3 años. leg: 'oculta' = legumbre camuflada.
// Ninguna receta contiene maní ni frutos secos.
// ============================================================================

export const RECETARIO_HIJA = [
  /* ------------------------------ DESAYUNOS ------------------------------ */
  { id: 'hd1', n: 'Avena con manzana rallada y canela', t: 'desayuno', min: 10, leg: null,
    ing: ['½ taza de avena', '1 taza de bebida vegetal fortificada', '½ manzana', 'Canela'],
    pasos: ['Cocer la avena con la bebida vegetal 5 min a fuego bajo.', 'Rallar la manzana e incorporar con canela.', 'Servir tibia, nunca caliente.'],
    truco: 'Déjala remojando de noche. La manzana rallada endulza sola y no necesita azúcar.' },

  { id: 'hd2', n: 'Panqueques de avena y plátano', t: 'desayuno', min: 15, leg: null,
    ing: ['½ plátano maduro', '1 huevo', '½ taza de avena', 'Canela'],
    pasos: ['Licuar todo hasta formar una mezcla espesa.', 'Cocinar panqueques del tamaño de su palma.', 'Servir con fruta picada.'],
    truco: 'Del porte de su mano los toma sola y come más que si se los cortas tú.' },

  { id: 'hd3', n: 'Pan con palta y huevo revuelto', t: 'desayuno', min: 10, leg: null,
    ing: ['½ pan de molde integral', '1 huevo', '2 cdas de palta', '1 taza de bebida vegetal'],
    pasos: ['Revolver el huevo a fuego bajo.', 'Untar la palta sobre el pan tostado y montar el huevo.', 'Cortar en cuatro cuadraditos.'],
    truco: 'Cortado en cuadrados chicos lo agarra con la mano y no pelea con el cuchillo.' },

  { id: 'hd4', n: 'Panqueques dulces de lenteja roja', t: 'desayuno', min: 15, leg: 'oculta',
    ing: ['3 cdas de lenteja roja cocida', '1 huevo', '½ plátano', 'Canela', 'Vainilla'],
    pasos: ['Licuar la lenteja bien escurrida con el huevo, el plátano y la vainilla.', 'Cocinar panqueques pequeños en sartén caliente.', 'Servir con fruta.'],
    truco: 'La lenteja roja no necesita remojo y pierde el sabor terroso al licuarse con plátano. Es la mejor primera legumbre camuflada.' },

  { id: 'hd5', n: 'Papilla de quinoa con pera', t: 'desayuno', min: 20, leg: null,
    ing: ['½ taza de quinoa cocida', '1 taza de bebida vegetal', '½ pera', 'Canela'],
    pasos: ['Lavar la quinoa hasta que no haga espuma y cocer con la bebida vegetal.', 'Rallar la pera e incorporar al final.'],
    truco: 'Cocina quinoa para toda la semana el domingo: sirve para el desayuno y para el almuerzo.' },

  { id: 'hd6', n: 'Yogur sin lactosa con fruta y avena', t: 'desayuno', min: 5, leg: null,
    ing: ['1 yogur sin lactosa', '½ taza de fruta picada', '2 cdas de avena'],
    pasos: ['Mezclar todo en un bowl y servir.'],
    truco: 'El desayuno de emergencia para las mañanas apuradas.' },

  /* -------------------------- COLACIÓN MEDIA MAÑANA -------------------------- */
  { id: 'hc1', n: 'Plátano en rodajas', t: 'colacion_am', min: 2, leg: null,
    ing: ['½ plátano'],
    pasos: ['Cortar en rodajas y servir.'],
    truco: 'La colación más simple y la que nunca falla en el jardín.' },

  { id: 'hc2', n: 'Manzana rallada con canela', t: 'colacion_am', min: 4, leg: null,
    ing: ['½ manzana', 'Canela', 'Gotas de limón'],
    pasos: ['Rallar la manzana, agregar canela y unas gotas de limón.'],
    truco: 'El limón evita que se ponga café si va en la lonchera.' },

  { id: 'hc3', n: 'Bastones de zanahoria cocida con dip rosado', t: 'colacion_am', min: 12, leg: 'oculta',
    ing: ['3 cdas de garbanzos cocidos', '¼ de betarraga cocida', '1 zanahoria cocida', 'Aceite de oliva', 'Limón'],
    pasos: ['Licuar los garbanzos con la betarraga, el aceite y el limón hasta que quede liso.', 'Cocer la zanahoria hasta que esté blanda y cortarla en bastones.', 'Servir el dip aparte para mojar.'],
    truco: 'Preséntalo como salsa de princesa. El color rosado se roba la atención y el garbanzo desaparece. La zanahoria va cocida, nunca cruda en bastones.' },

  { id: 'hc4', n: 'Galletas de avena y plátano', t: 'colacion_am', min: 20, leg: null,
    ing: ['1 plátano maduro', '¾ taza de avena', 'Pasas', 'Canela'],
    pasos: ['Moler el plátano y mezclar con la avena, las pasas y la canela.', 'Formar montoncitos y hornear 15 min a 180 °C.'],
    truco: 'Dos ingredientes base y cero azúcar. Rinden para varias colaciones y las puede armar contigo.' },

  { id: 'hc5', n: 'Pera picada con yogur', t: 'colacion_am', min: 4, leg: null,
    ing: ['½ pera', '1 yogur sin lactosa'],
    pasos: ['Picar la pera en cubos pequeños y mezclar con el yogur.'],
    truco: 'Rota la fruta cada semana para que no se aburra del mismo sabor.' },

  { id: 'hc6', n: 'Brownie de porotos negros', t: 'colacion_am', min: 35, leg: 'oculta',
    ing: ['½ taza de porotos negros cocidos', '1 huevo', '3 cdas de cacao', '2 cdtas de miel', 'Vainilla'],
    pasos: ['Enjuagar los porotos hasta que el agua salga clara.', 'Licuar con el huevo, el cacao, la miel y la vainilla.', 'Hornear 25 min a 180 °C y cortar en cuadraditos.'],
    truco: 'El enjuague es el paso clave: ahí se va todo el sabor a legumbre. Nadie adivina que lleva porotos.' },

  /* ------------------------------ ALMUERZOS ------------------------------ */
  { id: 'ha1', n: 'Puré mixto de papa y arveja con pollo', t: 'almuerzo', min: 25, leg: 'oculta',
    ing: ['1 papa chica', '3 cdas de arvejas', '1 palma de pollo cocido', 'Bebida vegetal', 'Aceite de oliva'],
    pasos: ['Cocer la papa con las arvejas 18 min.', 'Moler con bebida vegetal hasta puré verde claro.', 'Servir con el pollo desmenuzado fino encima.'],
    truco: 'Véndelo como puré del bosque. La arveja es la legumbre más dulce y la mejor para empezar.' },

  { id: 'ha2', n: 'Albóndigas de pollo y garbanzo con puré', t: 'almuerzo', min: 35, leg: 'oculta',
    ing: ['1 palma de pollo molido', '3 cdas de garbanzos cocidos', '1 huevo', '1 papa chica', 'Bebida vegetal'],
    pasos: ['Procesar los garbanzos hasta harina húmeda y mezclar con el pollo y el huevo.', 'Formar albóndigas pequeñas y hornear 20 min a 200 °C.', 'Servir con el puré hecho con bebida vegetal.'],
    truco: 'El garbanzo reemplaza al pan rallado sin cambiar el sabor. Del porte de una moneda de cien pesos, para que las coma con la mano.' },

  { id: 'ha3', n: 'Fideos con boloñesa de lenteja', t: 'almuerzo', min: 30, leg: 'oculta',
    ing: ['½ taza de fideos cocidos', '2 cdas de carne molida', '3 cdas de lentejas cocidas', 'Salsa de tomate', 'Zanahoria rallada'],
    pasos: ['Licuar las lentejas con un poco de salsa hasta que no queden grumos.', 'Sofreír la zanahoria rallada con la carne.', 'Incorporar el puré de lentejas y la salsa, cocer 15 min.'],
    truco: 'Licuada no quedan trozos que ella pueda pescar y dejar al borde del plato.' },

  { id: 'ha4', n: 'Croquetas de zapallo y lenteja', t: 'almuerzo', min: 35, leg: 'oculta',
    ing: ['½ taza de zapallo cocido', '3 cdas de lentejas cocidas', '1 huevo', 'Avena molida', 'Salsa de tomate para mojar'],
    pasos: ['Moler el zapallo con las lentejas hasta pasta lisa.', 'Agregar el huevo y la avena hasta poder formar croquetas.', 'Hornear 20 min a 200 °C.'],
    truco: 'El dulzor del zapallo tapa la lenteja por completo. Sírvelas con salsa para mojar: mojar es la mitad de la gracia.' },

  { id: 'ha5', n: 'Pastel de choclo chiquito', t: 'almuerzo', min: 40, leg: null,
    ing: ['½ taza de choclo molido', '2 cdas de carne molida', 'Cebolla muy picada', '½ huevo duro', 'Albahaca'],
    pasos: ['Preparar el pino con la cebolla y la carne.', 'Licuar el choclo con albahaca y cocer hasta espesar.', 'Montar en un pocillo individual y hornear 20 min.'],
    truco: 'En su propio pocillo chico se lo come mucho mejor que servido de una fuente grande.' },

  { id: 'ha6', n: 'Pescado desmenuzado con arroz y zapallo', t: 'almuerzo', min: 25, leg: null,
    ing: ['1 palma de merluza', '½ taza de arroz cocido', '3 cdas de zapallo cocido', 'Limón', 'Aceite de oliva'],
    pasos: ['Hornear el pescado con limón 15 min a 200 °C.', 'Revisar con las manos que no quede ninguna espina y desmenuzar.', 'Servir mezclado con el arroz y el zapallo.'],
    truco: 'Revisa las espinas dos veces. Desmenuzado y mezclado lo acepta mucho mejor que en filete.' },

  { id: 'ha7', n: 'Tortilla de zapallo italiano y papa', t: 'almuerzo', min: 30, leg: null,
    ing: ['1 huevo', '½ papa', '½ zapallo italiano', 'Cebolla', 'Aceite de oliva'],
    pasos: ['Cocer la papa en láminas finas con el zapallo y la cebolla.', 'Mezclar con el huevo batido.', 'Cuajar en sartén 5 min por lado y cortar en cuadrados.'],
    truco: 'Fría también funciona: la que sobra sirve de once al día siguiente.' },

  { id: 'ha8', n: 'Arroz con huevo y verduras ralladas', t: 'almuerzo', min: 20, leg: null,
    ing: ['½ taza de arroz cocido', '1 huevo', 'Zanahoria y zapallo italiano rallados', '2 cdas de arvejas', 'Aceite de oliva'],
    pasos: ['Saltear las verduras ralladas 3 min.', 'Agregar el huevo y revolver.', 'Incorporar el arroz y las arvejas, mezclar bien.'],
    truco: 'Ralladas, las verduras se integran al arroz y no se pueden separar del plato.' },

  /* -------------------------------- ONCE -------------------------------- */
  { id: 'ho1', n: 'Pan con palta', t: 'once', min: 5, leg: null,
    ing: ['½ pan de molde integral', '2 cdas de palta', '1 taza de bebida vegetal', 'Sal'],
    pasos: ['Moler la palta con una pizca de sal y untar.', 'Cortar en cuatro cuadraditos.'],
    truco: 'La once más simple. La palta aporta grasas buenas para su desarrollo.' },

  { id: 'ho2', n: 'Pan con huevo revuelto', t: 'once', min: 8, leg: null,
    ing: ['½ pan de molde integral', '1 huevo', '1 taza de bebida vegetal', 'Aceite de oliva'],
    pasos: ['Revolver el huevo a fuego bajo hasta que quede cremoso.', 'Montar sobre el pan y cortar en cuadrados.'],
    truco: 'Retira el huevo del fuego antes de que cuaje del todo: queda más suave para ella.' },

  { id: 'ho3', n: 'Sopa crema de zapallo y garbanzo con pan', t: 'once', min: 30, leg: 'oculta',
    ing: ['½ taza de zapallo camote', '3 cdas de garbanzos cocidos', 'Cebolla', 'Caldo de verduras', '½ pan tostado en cubos'],
    pasos: ['Cocer el zapallo con la cebolla en el caldo, 20 min.', 'Agregar los garbanzos y licuar hasta que quede sedoso.', 'Servir tibia con los cubitos de pan.'],
    truco: 'El garbanzo licuado da la cremosidad sin nada de lácteo. Los cubitos de pan la entretienen mientras come.' },

  { id: 'ho4', n: 'Yogur con fruta y avena', t: 'once', min: 5, leg: null,
    ing: ['1 yogur sin lactosa', '½ taza de fruta picada', '2 cdas de avena'],
    pasos: ['Mezclar y servir.'],
    truco: 'Déjala elegir la fruta entre dos opciones: elegir aumenta lo que come.' },

  { id: 'ho5', n: 'Panqueque con mermelada casera de berries', t: 'once', min: 25, leg: null,
    ing: ['1 panqueque de avena', '150 g de berries', '1 cda de chía', 'Jugo de limón', '1 taza de bebida vegetal'],
    pasos: ['Cocinar los berries con el limón 15 min a fuego bajo.', 'Agregar la chía y revolver hasta que espese.', 'Untar sobre el panqueque.'],
    truco: 'La mermelada de la nutricionista, sin azúcar añadida. Dura una semana en frasco de vidrio.' },

  /* ---------------------------- CENAS LIVIANAS ---------------------------- */
  { id: 'hn1', n: 'Sopa crema de brócoli y papa con huevo', t: 'cena', min: 25, leg: null,
    ing: ['½ taza de brócoli', '1 papa chica', 'Cebolla', 'Caldo de verduras', '1 huevo duro'],
    pasos: ['Cocer todo en el caldo 20 min.', 'Licuar hasta que quede sedoso.', 'Servir tibia con el huevo picado encima.'],
    truco: 'La papa da la cremosidad sin necesidad de lácteos. El verde suave lo acepta mejor que el brócoli en trozos.' },

  { id: 'hn2', n: 'Budín de zapallo italiano con lenteja', t: 'cena', min: 40, leg: 'oculta',
    ing: ['1 zapallo italiano', '3 cdas de lentejas cocidas', '1 huevo', 'Cebolla', '2 cdas de avena'],
    pasos: ['Rallar el zapallo y escurrir bien el agua.', 'Licuar las lentejas y mezclar con el huevo, el zapallo y la avena.', 'Hornear 30 min a 180 °C y cortar en cuadrados.'],
    truco: 'Escurrir el zapallo es lo que evita que quede aguado. Se come frío al día siguiente como colación.' },

  { id: 'hn3', n: 'Revuelto de espinaca y papa', t: 'cena', min: 20, leg: null,
    ing: ['1 huevo', '½ taza de espinaca', '½ papa', 'Cebolla', 'Aceite de oliva'],
    pasos: ['Dorar la papa en cubos chicos con la cebolla.', 'Agregar la espinaca picada muy fina hasta que reduzca.', 'Incorporar el huevo y revolver.'],
    truco: 'Picada muy fina, la espinaca desaparece entre la papa y no la puede separar.' },

  { id: 'hn4', n: 'Puré de zapallo con pollo desmenuzado', t: 'cena', min: 25, leg: null,
    ing: ['½ taza de zapallo camote', '1 papa chica', '1 palma de pollo cocido', 'Aceite de oliva'],
    pasos: ['Cocer el zapallo con la papa 20 min.', 'Moler hasta puré suave.', 'Servir con el pollo desmenuzado fino.'],
    truco: 'Aprovecha el pollo que sobró del almuerzo de los adultos.' },

  { id: 'hn5', n: 'Nuggets de pollo y garbanzo al horno', t: 'cena', min: 30, leg: 'oculta',
    ing: ['1 palma de pechuga de pollo', '3 cdas de garbanzos cocidos', '1 huevo', 'Avena molida', 'Paprika suave'],
    pasos: ['Procesar el pollo con los garbanzos.', 'Formar nuggets chicos y pasar por avena molida.', 'Hornear 20 min a 200 °C.'],
    truco: 'Congélalos crudos y separados: salen del congelador directo al horno los días sin tiempo.' },
];
