// Recetario de la familia, construido sobre la pauta de la nutricionista.
//
// Cada receta declara las porciones que aporta (campo p), usando los grupos de la
// Guía de porciones: cer cereal · pro proteína · fru fruta · lac lácteo ·
// ver verduras · arl alimentos ricos en lípidos.
// Las cantidades son PARA UN ADULTO. La app multiplica al mostrar la compra.
//
// Restricciones aplicadas a todas las recetas:
//   · Sin lactosa: bebida vegetal, yogur sin lactosa o queso madurado.
//   · Sin maní: la hija es alérgica. Las recetas del recetario original de la
//     nutricionista que llevaban mantequilla de maní están adaptadas.
//
// t   = tiempo de comida
// leg = 'oculta' si lleva legumbre camuflada, apta para la hija
// al  = alérgenos a advertir (por ejemplo frutos secos)

export const RECETARIO = [
  /* ============================== DESAYUNOS ==============================
     Objetivo: 2 cereal + 2 proteína + 1 fruta + 1 lácteo                  */

  { id: 'd1', n: 'Avena con manzana, canela y huevos revueltos', t: 'desayuno', min: 12, leg: null,
    p: { cer: 2, pro: 2, fru: 1, lac: 1 },
    ing: ['1 taza de avena', '1 taza de bebida de almendras', '2 huevos', '1 manzana', 'Canela'],
    pasos: ['Cocinar la avena con la bebida vegetal 5 min a fuego bajo.', 'Rallar la manzana e incorporar con canela.', 'Revolver los huevos aparte y servir junto al bowl.'],
    truco: 'Deja la avena remojando de noche: en la mañana solo la calientas y haces los huevos.' },

  { id: 'd2', n: 'Pan integral con pasta de huevo y frutillas con yogur', t: 'desayuno', min: 12, leg: null,
    p: { cer: 2, pro: 2, fru: 1, lac: 1 },
    ing: ['2 rebanadas de pan integral', '2 huevos duros', '1 taza de frutillas', '1 yogur sin lactosa', 'Cilantro y limón'],
    pasos: ['Moler los huevos con tenedor, sal, limón y cilantro.', 'Untar sobre el pan tostado.', 'Servir las frutillas picadas con el yogur.'],
    truco: 'Es el desayuno de ejemplo de la pauta. No saques la yema: ahí está buena parte de la proteína y las vitaminas.' },

  { id: 'd3', n: 'Panqueques de avena y plátano con yogur', t: 'desayuno', min: 15, leg: null,
    p: { cer: 2, pro: 2, fru: 1, lac: 1 },
    ing: ['1 plátano maduro', '2 huevos', '1 taza de avena', '1 yogur sin lactosa', 'Canela'],
    pasos: ['Licuar el plátano con los huevos y la avena.', 'Cocinar porciones pequeñas en sartén antiadherente.', 'Servir con el yogur encima.'],
    truco: 'La masa dura 2 días en el refrigerador. A la hija hazle panqueques del tamaño de su palma.' },

  { id: 'd4', n: 'Tostadas con palta, huevo duro y fruta', t: 'desayuno', min: 12, leg: null,
    p: { cer: 2, pro: 2, fru: 1, lac: 1, arl: 1 },
    ing: ['2 rebanadas de pan integral', '2 huevos', '½ palta', '1 manzana o pera', '1 taza de bebida vegetal', 'Limón'],
    pasos: ['Hervir los huevos 9 minutos.', 'Moler la palta con limón y sal, untar sobre el pan.', 'Coronar con el huevo en rodajas y servir con la fruta.'],
    truco: 'Hierve 6 huevos de una vez: los que sobran resuelven la colación del día siguiente.' },

  { id: 'd5', n: 'Yogur con granola, fruta y huevos duros', t: 'desayuno', min: 8, leg: null,
    p: { cer: 2, pro: 2, fru: 1, lac: 1 },
    ing: ['1 yogur sin lactosa', '½ taza de granola sin azúcar', '1 taza de frutos rojos', '2 huevos duros', 'Semillas de chía'],
    pasos: ['Servir el yogur con la granola, la fruta y la chía.', 'Acompañar con los huevos duros.'],
    truco: 'Arma los frascos la noche anterior y guarda la granola aparte para que no se ablande.' },

  { id: 'd6', n: 'Batido verde con tostada de huevo', t: 'desayuno', min: 10, leg: null,
    p: { cer: 2, pro: 2, fru: 1, lac: 1 },
    ing: ['1 plátano', 'Puñado de espinaca', '1 taza de bebida vegetal', '2 cdas de avena', '2 rebanadas de pan integral', '2 huevos'],
    pasos: ['Licuar plátano, espinaca, bebida vegetal y avena.', 'Revolver los huevos y montar sobre el pan tostado.'],
    truco: 'Con plátano congelado el batido queda helado y la hija no percibe la espinaca.' },

  { id: 'd7', n: 'Tostadas francesas con bebida vegetal y fruta', t: 'desayuno', min: 14, leg: null,
    p: { cer: 2, pro: 2, fru: 1, lac: 1 },
    ing: ['2 rebanadas de pan de molde', '2 huevos', '½ taza de bebida de avena', '1 taza de berries', '1 yogur sin lactosa', 'Canela y vainilla'],
    pasos: ['Batir los huevos con la bebida vegetal, canela y vainilla.', 'Remojar el pan por ambos lados y dorar en sartén.', 'Servir con los berries y el yogur.'],
    truco: 'La receta original de la nutricionista lleva mantequilla de maní encima; aquí va con yogur y fruta por la alergia.' },

  { id: 'd8', n: 'Porridge de quinoa con frutos rojos y huevo', t: 'desayuno', min: 20, leg: null,
    p: { cer: 2, pro: 2, fru: 1, lac: 1 },
    ing: ['1 ½ taza de quinoa cocida', '1 taza de bebida vegetal', '1 taza de frutos rojos', '2 huevos', 'Canela'],
    pasos: ['Lavar la quinoa hasta que no haga espuma y cocer con la bebida vegetal 15 min.', 'Agregar canela y fruta.', 'Servir con los huevos a la copa.'],
    truco: 'Cocina el doble el domingo: se recalienta perfecto toda la semana.' },

  { id: 'd9', n: 'Panqueques de lenteja roja con yogur y fruta', t: 'desayuno', min: 18, leg: 'oculta',
    p: { cer: 1, pro: 2, fru: 1, lac: 1 },
    ing: ['¾ taza de lenteja roja cocida', '2 huevos', '1 plátano', '1 yogur sin lactosa', 'Canela y vainilla'],
    pasos: ['Licuar la lenteja escurrida con los huevos, el plátano y la vainilla.', 'Cocinar como panqueques en sartén caliente.', 'Servir con el yogur.'],
    truco: 'La lenteja roja no necesita remojo y pierde el sabor terroso al licuarse con plátano. Es la puerta de entrada más fácil a las legumbres.' },

  { id: 'd10', n: 'Omelette con champiñón, tomate cherry y pan', t: 'desayuno', min: 14, leg: null,
    p: { cer: 2, pro: 2, fru: 1, lac: 1, ver: 1 },
    ing: ['2 huevos', '¾ taza de champiñones', 'Tomates cherry', '2 rebanadas de pan integral', '1 yogur sin lactosa', '1 taza de frutillas'],
    pasos: ['Saltear los champiñones y los cherry.', 'Verter los huevos batidos y cuajar el omelette.', 'Servir con el pan, el yogur y las frutillas.'],
    truco: 'Otro de los desayunos de ejemplo de la pauta. Los champiñones suman verdura sin sentirse pesados en la mañana.' },

  /* =========================== COLACIÓN DE LA MAÑANA ===========================
     Objetivo: 1 fruta + 1 ARL                                                  */

  { id: 'ca1', n: 'Manzana con almendras', t: 'colacion_am', min: 3, leg: null, al: ['frutos secos'],
    p: { fru: 1, arl: 1 },
    ing: ['1 manzana', '26 almendras'],
    pasos: ['Cortar la manzana en gajos y acompañar con las almendras.'],
    truco: 'Un chorrito de limón evita que la manzana se oxide si va en la lonchera. Para la hija, muele las almendras: enteras son riesgo de atoro a los 3 años.' },

  { id: 'ca2', n: 'Plátano con nueces', t: 'colacion_am', min: 2, leg: null, al: ['frutos secos'],
    p: { fru: 1, arl: 1 },
    ing: ['½ plátano', '5 nueces'],
    pasos: ['Servir el plátano en rodajas con las nueces picadas encima.'],
    truco: 'Compra frutos secos envasados que declaren no compartir línea de producción con maní.' },

  { id: 'ca3', n: 'Naranja con media palta y sal de mar', t: 'colacion_am', min: 4, leg: null,
    p: { fru: 1, arl: 1 },
    ing: ['1 naranja', '½ palta (3 cdas)', 'Sal de mar', 'Limón'],
    pasos: ['Pelar la naranja en gajos.', 'Servir la palta con sal y unas gotas de limón.'],
    truco: 'Opción sin frutos secos, la más segura para compartir el plato con la hija.' },

  { id: 'ca4', n: 'Bastones de verdura con dip rosado y fruta', t: 'colacion_am', min: 10, leg: 'oculta',
    p: { fru: 1, arl: 1, ver: 1, pro: 0.5 },
    ing: ['¾ taza de garbanzos cocidos', '1 betarraga chica cocida', 'Zanahoria y pepino', '1 manzana', 'Aceite de oliva', 'Limón'],
    pasos: ['Licuar los garbanzos con la betarraga, el limón, el aceite y sal hasta que quede liso.', 'Cortar las verduras en bastones.', 'Servir con la fruta aparte.'],
    truco: 'La betarraga tiñe el hummus de rosado fuerte. Preséntalo como salsa de princesa y el garbanzo desaparece.' },

  { id: 'ca5', n: 'Manzana asada con canela y nueces', t: 'colacion_am', min: 15, leg: null, al: ['frutos secos'],
    p: { fru: 1, arl: 1 },
    ing: ['1 manzana', '5 nueces', 'Canela'],
    pasos: ['Descorazonar la manzana y rellenar con las nueces picadas y canela.', 'Hornear 12 min a 180 °C hasta que esté blanda.'],
    truco: 'Reemplaza a la clásica manzana con mantequilla de maní, descartada por la alergia.' },

  { id: 'ca6', n: 'Kiwi con almendras', t: 'colacion_am', min: 3, leg: null, al: ['frutos secos'],
    p: { fru: 1, arl: 1 },
    ing: ['2 kiwis', '26 almendras'],
    pasos: ['Pelar los kiwis, cortar en rodajas y acompañar con las almendras.'],
    truco: 'El kiwi aporta vitamina C, que mejora la absorción del hierro de las legumbres del almuerzo.' },

  /* ============================== ALMUERZOS ==============================
     Objetivo: 1 cereal + 2 proteína + mix verde (2 tazas mínimo)          */

  { id: 'a1', n: 'Espagueti con boloñesa de lenteja y carne', t: 'almuerzo', min: 35, leg: 'oculta',
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['¾ taza de espagueti cocido', '50 g de carne molida', '¾ taza de lentejas cocidas', 'Salsa de tomate', 'Cebolla y zanahoria', '2 tazas de ensalada verde'],
    pasos: ['Licuar las lentejas con un poco de salsa hasta que no queden grumos.', 'Sofreír cebolla y zanahoria rallada, agregar la carne.', 'Incorporar el puré de lentejas y la salsa, cocer 15 min.', 'Servir sobre la pasta con la ensalada al lado.'],
    truco: 'Mitad carne, mitad lenteja licuada: rinde el doble y la textura es idéntica a la boloñesa clásica.' },

  { id: 'a2', n: 'Albóndigas de pollo y garbanzo con papas', t: 'almuerzo', min: 40, leg: 'oculta',
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['100 g de pollo molido', '¾ taza de garbanzos cocidos', '1 huevo', '1 papa cocida', 'Bebida vegetal', '2 tazas de ensalada'],
    pasos: ['Procesar los garbanzos hasta harina húmeda y mezclar con el pollo, el huevo y ajo.', 'Formar albóndigas y hornear 20 min a 200 °C.', 'Hacer puré con la papa y bebida vegetal en vez de leche.'],
    truco: 'El garbanzo reemplaza al pan rallado y suma proteína sin cambiar el sabor.' },

  { id: 'a3', n: 'Pollo al horno con papas y ensalada chilena', t: 'almuerzo', min: 50, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['100 g de pollo', '1 papa', 'Tomate y cebolla', 'Cilantro', 'Aceite de oliva'],
    pasos: ['Aliñar el pollo y hornear con la papa en rodajas, 40 min a 200 °C.', 'Preparar la ensalada con la cebolla desflemada en agua fría.'],
    truco: 'Todo en una sola lata: menos loza y el jugo del pollo cocina las papas.' },

  { id: 'a4', n: 'Charquicán de zapallo y carne', t: 'almuerzo', min: 40, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['100 g de carne molida', '½ taza de zapallo', '1 papa', '½ taza de choclo', 'Porotos verdes', 'Cebolla'],
    pasos: ['Sofreír la cebolla con la carne.', 'Agregar el zapallo y la papa en cubos con agua, cocer 25 min.', 'Moler grueso e incorporar el choclo y los porotos verdes.'],
    truco: 'Un huevo frito encima lo convierte en plato único y suma la segunda porción de proteína.' },

  { id: 'a5', n: 'Arroz salteado con huevo y verduras', t: 'almuerzo', min: 20, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['¾ taza de arroz cocido', '2 huevos', 'Zanahoria', 'Arvejas', 'Cebollín', 'Salsa de soya'],
    pasos: ['Saltear las verduras en sartén muy caliente.', 'Correr a un lado, cuajar los huevos y mezclar.', 'Agregar el arroz y la soya, saltear 3 min.'],
    truco: 'Arroz del día anterior, frío: es el secreto para que quede suelto.' },

  { id: 'a6', n: 'Tortilla de papa y zapallo italiano', t: 'almuerzo', min: 35, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['2 huevos', '1 papa', '1 zapallo italiano', 'Cebolla', '2 tazas de ensalada', 'Aceite de oliva'],
    pasos: ['Cocer la papa en láminas junto a la cebolla y el zapallo.', 'Mezclar con los huevos batidos.', 'Cuajar en sartén 6 min por lado.'],
    truco: 'Fría o caliente funciona igual: la del almuerzo sirve de cena.' },

  { id: 'a7', n: 'Crema de zapallo y garbanzo con crutones', t: 'almuerzo', min: 30, leg: 'oculta',
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['½ taza de zapallo camote', '¾ taza de garbanzos cocidos', '1 huevo duro', 'Cebolla', 'Caldo de verduras', 'Pan para crutones', '1 taza de ensalada'],
    pasos: ['Cocer el zapallo con la cebolla en el caldo, 20 min.', 'Agregar los garbanzos y licuar hasta que quede sedoso.', 'Dorar cubos de pan al horno y servir encima con el huevo picado.'],
    truco: 'El garbanzo licuado da la cremosidad que normalmente daría la crema de leche.' },

  { id: 'a8', n: 'Pastel de choclo simplificado', t: 'almuerzo', min: 50, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['1 taza de choclo', '100 g de carne molida', '1 huevo duro', 'Cebolla', 'Albahaca', '2 tazas de ensalada'],
    pasos: ['Preparar el pino con cebolla y carne, condimentar con comino.', 'Licuar el choclo con albahaca y cocer hasta espesar.', 'Montar en fuente con el huevo y gratinar 20 min.'],
    truco: 'Sin leche en la pasta de choclo: usa el agua del propio choclo y queda igual de cremosa. El choclo cuenta como cereal, no como verdura.' },

  { id: 'a9', n: 'Nuggets de pollo y garbanzo al horno', t: 'almuerzo', min: 35, leg: 'oculta',
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['100 g de pechuga de pollo', '¾ taza de garbanzos cocidos', '1 huevo', '½ taza de avena molida', '2 tazas de ensalada'],
    pasos: ['Procesar el pollo con los garbanzos y los condimentos.', 'Formar nuggets y pasar por la avena molida.', 'Hornear 20 min a 200 °C girando a la mitad.'],
    truco: 'Congela crudos y separados: salen del congelador directo al horno.' },

  { id: 'a10', n: 'Fideos con salsa de tomate y atún', t: 'almuerzo', min: 20, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['¾ taza de fideos cocidos', '1 taza de atún en agua', 'Salsa de tomate', 'Ajo y orégano', '2 tazas de ensalada'],
    pasos: ['Sofreír el ajo, agregar la salsa y el orégano.', 'Incorporar el atún escurrido, cocer 5 min.', 'Mezclar con los fideos.'],
    truco: 'El plato de emergencia: 20 minutos con despensa básica.' },

  { id: 'a11', n: 'Hamburguesas de lenteja y carne', t: 'almuerzo', min: 30, leg: 'oculta',
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['50 g de carne molida', '¾ taza de lentejas cocidas', '1 huevo', 'Avena', '½ pan de hamburguesa', 'Tomate y lechuga'],
    pasos: ['Moler las lentejas escurridas hasta pasta.', 'Mezclar con la carne, el huevo y la avena; formar los medallones.', 'Dorar en sartén 4 min por lado.'],
    truco: 'Escurre muy bien la lenteja o la mezcla queda blanda y no toma forma.' },

  { id: 'a12', n: 'Pescado al horno con arroz y brócoli', t: 'almuerzo', min: 30, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['100 g de merluza o salmón', '¾ taza de arroz cocido', '1 taza de brócoli', '1 taza de ensalada', 'Limón y aceite de oliva'],
    pasos: ['Hornear el pescado con limón y aceite, 15 min a 200 °C.', 'Cocer el arroz y el brócoli al vapor.'],
    truco: 'Al pescado de la hija sácale toda espina y córtalo en cubos: lo come mejor en trozos que en filete.' },

  { id: 'a13', n: 'Cazuela de pollo con zapallo y choclo', t: 'almuerzo', min: 45, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['100 g de pollo', '½ taza de zapallo', '½ taza de choclo', 'Papa', 'Zanahoria', 'Cilantro'],
    pasos: ['Hervir el pollo con las verduras 30 min.', 'Agregar arroz los últimos 15 min si se quiere más contundente.', 'Servir con cilantro fresco.'],
    truco: 'Cocina una olla grande: la cazuela del domingo es la cena del lunes.' },

  { id: 'a14', n: 'Pizza casera con masa de garbanzo', t: 'almuerzo', min: 40, leg: 'oculta',
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['½ taza de harina de garbanzo', '½ taza de harina integral', 'Levadura', 'Salsa de tomate', 'Queso sin lactosa', '2 tazas de ensalada'],
    pasos: ['Amasar las harinas con levadura, agua tibia y sal. Reposar 20 min.', 'Estirar, cubrir con salsa y queso.', 'Hornear 12 min a 220 °C.'],
    truco: 'Mitad harina de garbanzo es el máximo que no se nota ni en sabor ni en textura.' },

  { id: 'a15', n: 'Ceviche de garbanzos con arroz', t: 'almuerzo', min: 20, leg: 'oculta',
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['¾ taza de garbanzos cocidos', '¼ taza de jugo de limón', 'Cebolla, pimentón rojo y cilantro', 'Zanahoria y tomate', '¾ taza de arroz cocido', '1 huevo duro'],
    pasos: ['Picar todas las verduras en cubos pequeños.', 'Mezclar con los garbanzos, el limón, aceite y sal.', 'Reposar 1 hora en el refrigerador y servir con el arroz.'],
    truco: 'Receta del recetario de la nutricionista. Para la hija, procesa los garbanzos y sírvelos como pasta para untar.' },

  /* =========================== COLACIÓN DE LA TARDE ===========================
     Objetivo: 1 fruta + 1 lácteo + ½ cereal                                    */

  { id: 'cp1', n: 'Yogur con plátano y avena', t: 'colacion_pm', min: 4, leg: null,
    p: { fru: 1, lac: 1, cer: 0.5 },
    ing: ['1 yogur sin lactosa', '½ plátano', '2 cdas de avena o granola'],
    pasos: ['Mezclar todo en un bowl y servir.'],
    truco: 'Es la colación de ejemplo de la pauta. La más simple y la que menos se falla.' },

  { id: 'cp2', n: 'Galletas de avena y plátano con yogur', t: 'colacion_pm', min: 20, leg: null,
    p: { fru: 1, lac: 1, cer: 0.5 },
    ing: ['1 plátano maduro', '¾ taza de avena', 'Pasas', '1 yogur sin lactosa', 'Canela'],
    pasos: ['Moler el plátano y mezclar con la avena, las pasas y la canela.', 'Formar montoncitos en la lata y hornear 15 min a 180 °C.', 'Servir con el yogur.'],
    truco: 'Dos ingredientes base y cero azúcar añadida. Rinden para tres colaciones.' },

  { id: 'cp3', n: 'Brownie de porotos negros con yogur y fruta', t: 'colacion_pm', min: 35, leg: 'oculta',
    p: { fru: 1, lac: 1, cer: 0.5, pro: 0.5 },
    ing: ['¾ taza de porotos negros cocidos', '1 huevo', '¼ taza de cacao', '2 cdtas de miel', '1 yogur sin lactosa', '1 fruta'],
    pasos: ['Licuar los porotos escurridos con el huevo, el cacao, la miel y vainilla.', 'Verter en molde y hornear 25 min a 180 °C.', 'Enfriar antes de cortar y servir con el yogur y la fruta.'],
    truco: 'Enjuaga los porotos hasta que el agua salga clara: ahí se va todo el sabor a legumbre.' },

  { id: 'cp4', n: 'Bolitas de dátil y cacao con yogur', t: 'colacion_pm', min: 15, leg: null,
    p: { fru: 1, lac: 1, cer: 0.5 },
    ing: ['½ taza de dátiles sin carozo', '½ taza de avena', '2 cdas de cacao', 'Coco rallado', '1 yogur sin lactosa'],
    pasos: ['Procesar los dátiles con la avena y el cacao.', 'Formar bolitas y pasar por coco rallado.', 'Refrigerar 30 min y servir con el yogur.'],
    truco: 'Duran 10 días en frasco cerrado en el refrigerador.' },

  { id: 'cp5', n: 'Barritas de garbanzo y avena con yogur', t: 'colacion_pm', min: 30, leg: 'oculta',
    p: { fru: 1, lac: 1, cer: 0.5, pro: 0.5 },
    ing: ['¾ taza de garbanzos cocidos', '½ taza de avena', '1 plátano', 'Miel', 'Chips de cacao', '1 yogur sin lactosa'],
    pasos: ['Procesar los garbanzos con el plátano y la miel.', 'Mezclar con la avena y los chips, extender en molde.', 'Hornear 20 min a 180 °C, cortar en barras y servir con el yogur.'],
    truco: 'Se congelan porcionadas: sacas una en la mañana y a la tarde está lista.' },

  { id: 'cp6', n: 'Fruta de estación con yogur y granola', t: 'colacion_pm', min: 5, leg: null,
    p: { fru: 1, lac: 1, cer: 0.5 },
    ing: ['1 fruta de estación', '1 yogur sin lactosa', '¼ taza de granola', 'Semillas de maravilla'],
    pasos: ['Picar la fruta y mezclar con el yogur.', 'Agregar la granola y las semillas al momento de servir.'],
    truco: 'Rota la fruta cada semana para no aburrir el paladar de la niña.' },

  /* ================================= CENAS =================================
     Objetivo: 1 cereal + 2 proteína + mix verde (2 tazas mínimo)             */

  { id: 'n1', n: 'Wrap de pollo con palta y ensalada', t: 'cena', min: 15, leg: null,
    p: { cer: 1, pro: 2, ver: 2, arl: 1 },
    ing: ['1 tortilla grande', '100 g de pollo cocido', '½ palta', 'Lechuga y tomate', '1 taza de ensalada', 'Limón'],
    pasos: ['Desmenuzar el pollo y mezclar con la palta y el limón.', 'Armar el wrap con lechuga y tomate.', 'Servir con la ensalada al lado.'],
    truco: 'Usa el pollo que sobró del almuerzo del día anterior.' },

  { id: 'n2', n: 'Pan con pasta de atún y palta', t: 'cena', min: 12, leg: null,
    p: { cer: 1, pro: 2, ver: 2, arl: 1 },
    ing: ['2 rebanadas de pan de molde', '1 lata de atún en agua', '3 cdtas de palta', '2 tazas de ensalada variada'],
    pasos: ['Escurrir el atún y molerlo con la palta y limón.', 'Untar sobre el pan.', 'Servir con la ensalada.'],
    truco: 'Es una de las cenas de ejemplo de la pauta: se arma en 10 minutos después del trabajo.' },

  { id: 'n3', n: 'Revuelto de espinaca, huevo y papas', t: 'cena', min: 20, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['2 huevos', '2 tazas de espinaca', '1 papa', 'Cebolla', 'Aceite de oliva'],
    pasos: ['Dorar la papa en cubos con la cebolla.', 'Agregar la espinaca hasta que reduzca.', 'Incorporar los huevos y revolver.'],
    truco: 'La espinaca picada muy fina desaparece entre la papa.' },

  { id: 'n4', n: 'Ensalada tibia de quinoa, tofu y palta', t: 'cena', min: 25, leg: null,
    p: { cer: 1, pro: 2, ver: 2, arl: 1 },
    ing: ['¾ taza de quinoa cocida', '2 rebanadas de tofu', 'Tomate, pepino y hojas verdes', '½ palta', 'Limón y aceite de oliva'],
    pasos: ['Lavar y cocer la quinoa 15 min.', 'Sellar el tofu en la sartén con aceite de oliva.', 'Mezclar todo tibio y aliñar con limón.'],
    truco: 'Enjuaga la quinoa hasta que no haga espuma: así se le quita el amargor.' },

  { id: 'n5', n: 'Tortilla de acelga con pan', t: 'cena', min: 20, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['2 huevos', '2 tazas de acelga', 'Cebolla y ajo', '2 rebanadas de pan integral'],
    pasos: ['Cocer la acelga picada y escurrir muy bien.', 'Mezclar con el huevo, la cebolla y el ajo.', 'Cuajar en sartén 5 min por lado.'],
    truco: 'Escurrir la acelga apretándola con las manos evita que la tortilla quede aguada.' },

  { id: 'n6', n: 'Croquetas de zapallo y lenteja al horno', t: 'cena', min: 35, leg: 'oculta',
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['1 taza de zapallo cocido', '¾ taza de lentejas cocidas', '1 huevo', '½ taza de avena molida', '2 tazas de ensalada', 'Nuez moscada'],
    pasos: ['Moler el zapallo con las lentejas hasta pasta lisa.', 'Agregar el huevo y la avena hasta poder formar croquetas.', 'Hornear 20 min a 200 °C.'],
    truco: 'El dulzor del zapallo tapa por completo la lenteja. Sírvelas con salsa de tomate para mojar.' },

  { id: 'n7', n: 'Pizza rápida sobre tortilla', t: 'cena', min: 18, leg: null,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['2 tortillas medianas', '100 g de pollo cocido', 'Queso sin lactosa', 'Salsa de tomate', 'Tomate y orégano', '1 taza de ensalada'],
    pasos: ['Cubrir las tortillas con salsa, pollo y queso.', 'Hornear 8 min a 220 °C.', 'Servir con la ensalada.'],
    truco: 'Otra de las cenas de ejemplo de la pauta, ideal para el viernes.' },

  { id: 'n8', n: 'Budín de zapallo italiano con lenteja', t: 'cena', min: 40, leg: 'oculta',
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['2 zapallos italianos', '¾ taza de lentejas cocidas', '2 huevos', 'Cebolla', '½ taza de avena', '1 taza de ensalada'],
    pasos: ['Rallar el zapallo y escurrir el agua.', 'Licuar las lentejas y mezclar con los huevos, el zapallo y la avena.', 'Hornear 30 min a 180 °C.'],
    truco: 'Se corta en cuadros y sirve frío al día siguiente. Aparece como ejemplo de almuerzo en la pauta.' },

  { id: 'n9', n: 'Puré mixto de papa y arveja con huevo', t: 'cena', min: 25, leg: 'oculta',
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['1 papa', '½ taza de arvejas', '2 huevos', 'Bebida vegetal', '2 tazas de ensalada'],
    pasos: ['Cocer la papa y las arvejas juntas 18 min.', 'Moler todo con bebida vegetal hasta puré verde claro.', 'Servir con los huevos a la copa.'],
    truco: 'El color verde suave se vende como puré del bosque. La arveja es la legumbre más dulce y la mejor para empezar.' },

  { id: 'n10', n: 'Tacos de pollo con vegetales', t: 'cena', min: 25, leg: null,
    p: { cer: 1, pro: 2, ver: 2, arl: 1 },
    ing: ['2 tortillas de maíz medianas', '100 g de pollo', 'Pimentón y cebolla', '½ palta', '1 taza de ensalada', 'Limón'],
    pasos: ['Saltear el pollo en tiras con el pimentón y la cebolla.', 'Calentar las tortillas.', 'Servir con la palta y limón.'],
    truco: 'Deja que cada uno arme su taco: a los 3 años, poder elegir aumenta lo que come.' },

  /* ========================= COLACIÓN OPCIONAL DE LA NOCHE =========================
     Objetivo: 1 lácteo + ½ cereal                                                  */

  { id: 'co1', n: 'Yogur proteico con avena', t: 'colacion_opcional', min: 3, leg: null,
    p: { lac: 1, cer: 0.5 },
    ing: ['1 yogur protein sin lactosa', '2 cdas de avena o granola'],
    pasos: ['Mezclar y servir.'],
    truco: 'Es la colación opcional de ejemplo de la pauta. Va bien junto con el omega 3 de antes de dormir.' },

  { id: 'co2', n: 'Bebida vegetal tibia con canela y granola', t: 'colacion_opcional', min: 5, leg: null,
    p: { lac: 1, cer: 0.5 },
    ing: ['1 taza de bebida vegetal', '2 cdas de granola', 'Canela'],
    pasos: ['Calentar la bebida vegetal con la canela.', 'Servir con la granola encima.'],
    truco: 'Tibia y con canela funciona bien como ritual de cierre del día para la hija.' },

  { id: 'co3', n: 'Yogur con chía y galletas de arroz', t: 'colacion_opcional', min: 3, leg: null,
    p: { lac: 1, cer: 0.5 },
    ing: ['1 yogur sin lactosa', '1 cdta de chía', '3 galletas de arroz'],
    pasos: ['Mezclar la chía con el yogur y dejar reposar 5 min.', 'Acompañar con las galletas.'],
    truco: 'La chía hidratada espesa el yogur y da más saciedad sin sumar porciones.' },

  { id: 'co4', n: 'Avena remojada con bebida vegetal', t: 'colacion_opcional', min: 3, leg: null,
    p: { lac: 1, cer: 0.5 },
    ing: ['1 taza de bebida vegetal', '2 cdas de avena', 'Canela'],
    pasos: ['Mezclar la avena con la bebida vegetal y dejar reposar 10 min.'],
    truco: 'Si dejas dos frascos hechos, uno sirve de colación y el otro de base del desayuno.' },
];
