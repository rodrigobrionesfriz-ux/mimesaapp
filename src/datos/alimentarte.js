// ============================================================================
// RECETAS IMPORTADAS DEL RECETARIO SALUDABLE ALIMENTARTE
// Nutricionista Danay Ahumada · www.alimentarte.cl
// Más las preparaciones del segundo recetario (Recetario Saludable OG 2).
//
// Los campos que el archivo original traía vacíos se completaron aquí:
//   · Tiempo: cuando el recetario no lo indicaba, va una estimación de cocina.
//   · Porciones (p): deducidas de los ingredientes según la Guía de porciones
//     de la nutricionista Francisca Fuentes.
//   · Legumbre camuflada: marcada cuando la legumbre va molida o licuada y no
//     se reconoce en el plato.
//
// ADAPTACIONES OBLIGATORIAS respecto del original:
//   · Sin maní. Tostadas francesas, waffles y mug cake lo llevaban de topping.
//   · Sin lactosa. Donde el original decía leche o yogur, va bebida vegetal o
//     yogur sin lactosa.
// Cada adaptación queda anotada en el truco de la receta.
//
// Tipos adicionales que no son un tiempo de comida y por eso no entran al
// planificador automático:
//   't: salsa' → salsas y aderezos    't: base' → bases y untables
// ============================================================================

const O = 'Recetario Alimentarte';

export const RECETARIO_ALIMENTARTE = [
  /* ------------------------------ DESAYUNOS ------------------------------ */
  { id: 'x01', n: 'Overnight oats', t: 'desayuno', min: 5, leg: null, origen: O,
    p: { cer: 2, lac: 1, fru: 1 },
    ing: ['½ taza de avena', '1 taza de bebida vegetal', 'Fruta a elección: frambuesas, frutillas o plátano'],
    pasos: ['Mezclar la avena con la bebida vegetal en un bol.', 'Dejar en el refrigerador hasta la mañana siguiente.', 'Agregar trocitos de fruta para que reposen y suelten su jugo.'],
    truco: 'Cinco minutos de trabajo la noche anterior. La avena absorbe el líquido y queda cremosa sola. Para completar la pauta del desayuno, acompaña con dos huevos.' },

  { id: 'x02', n: 'Porridge suave y tibio', t: 'desayuno', min: 12, leg: null, origen: O,
    p: { cer: 2, lac: 1 },
    ing: ['1 taza de bebida vegetal', '4 cucharadas de avena'],
    pasos: ['Poner la bebida vegetal y la avena en una olla antiadherente a fuego medio-bajo.', 'Remover de vez en cuando.', 'Cuando hierva, bajar al mínimo y seguir removiendo hasta lograr la textura deseada.'],
    truco: 'Cuanto más tiempo al fuego, más denso queda. Sirve tibio para la hija, nunca caliente. Súmale fruta y huevos para cerrar el desayuno.' },

  { id: 'x03', n: 'Panqueques de avena veganos', t: 'desayuno', min: 30, leg: null, origen: O,
    p: { cer: 2, fru: 1 },
    ing: ['2 plátanos medianos y maduros', '1 taza de harina de avena (80 g)', '1 cdta de esencia de vainilla', '1 dátil o 1 cdta de tagatosa', '1 taza de agua (250 ml)', '¼ cdta de canela'],
    pasos: ['Poner todos los ingredientes en la licuadora y mezclar.', 'Dejar reposar de 15 a 20 minutos.', 'Cocinar en sartén antiadherente, dorando de lado a lado.'],
    truco: 'Sin huevo ni lácteos. El recetario sugiere acompañar con yogur y una fruta. Rinde 4 porciones: 111 kcal, 2,8 g de proteína y 18,3 g de carbohidratos cada una.' },

  { id: 'x04', n: 'Tostadas francesas', t: 'desayuno', min: 10, leg: null, origen: O,
    p: { cer: 2, pro: 1, fru: 1, lac: 1 },
    ing: ['2 rebanadas de pan de molde', '1 huevo', 'Chorrito de bebida vegetal', '1 taza de berries', 'Esencia de vainilla', 'Canela'],
    pasos: ['Batir muy bien el huevo con la bebida vegetal, la canela y la vainilla.', 'Remojar el pan por ambos lados y esperar unos segundos a que absorba.', 'Cocinar en sartén caliente a fuego bajo, unos 3 minutos por lado.', 'Coronar con los berries.'],
    truco: 'El original lleva una cucharada de mantequilla de maní como topping: aquí va solo con fruta por la alergia. El original usa leche; reemplazada por bebida vegetal.' },

  { id: 'x05', n: 'Waffles de avena', t: 'desayuno', min: 10, leg: null, origen: O,
    p: { cer: 1, pro: 1, fru: 1 },
    ing: ['40 g de harina de avena', '1 huevo', '1 taza de berries o fruta a elección', 'Esencia de vainilla o endulzante, opcional'],
    pasos: ['Batir el huevo con la harina de avena.', 'Agregar vainilla o endulzante si se quiere.', 'Verter en sartén o wafflera caliente y cocinar tapado unos 2 minutos por lado.', 'Servir con la fruta encima.'],
    truco: 'El original lleva mantequilla de maní de topping: descartada por la alergia. Con yogur sin lactosa encima queda igual de goloso.' },

  { id: 'x06', n: 'Mug cake de avena', t: 'desayuno', min: 5, leg: null, origen: O,
    p: { cer: 1, pro: 1, fru: 1 },
    ing: ['1 huevo', '½ plátano molido', '3 cucharadas de avena', 'Chorrito de esencia de vainilla', '1 taza de berries'],
    pasos: ['Mezclar en una taza el huevo, el plátano molido, la avena y la vainilla.', 'Llevar al microondas 3 minutos.', 'Servir con los berries encima.'],
    truco: 'Tres minutos de microondas. El original lo corona con mantequilla de maní: aquí va con fruta por la alergia.' },

  { id: 'x07', n: 'Banana split saludable', t: 'colacion_pm', min: 5, leg: null, al: ['frutos secos'], origen: O,
    p: { fru: 1, lac: 1, arl: 1 },
    ing: ['1 plátano', 'Berries o fruta a elección', '1 yogur natural sin lactosa', '1 puñado de nueces', '1 cda de salsa de chocolate sin azúcar añadida'],
    pasos: ['Cortar el plátano por la mitad a lo largo.', 'Cubrir con el yogur.', 'Agregar la fruta, las nueces y la salsa de chocolate.'],
    truco: 'El antojito dulce del recetario. Contiene nueces: para la hija, sírvelo sin ellas o molidas muy finas.' },

  /* ------------------------------ ALMUERZOS ------------------------------ */
  { id: 'x08', n: 'Crema de zapallo con jengibre', t: 'almuerzo', min: 35, leg: null, origen: O,
    p: { ver: 2 },
    ing: ['1 kilo de zapallo camote', '½ cebolla (100 g)', '1 diente de ajo', 'Jugo de ½ naranja', '½ taza de crema de coco', 'Jengibre'],
    pasos: ['Cocer el zapallo hasta que esté blando.', 'Sofreír la cebolla con el ajo.', 'Licuar el zapallo junto al sofrito.', 'Agregar el jugo de naranja, la crema de coco y el jengibre.'],
    truco: 'La crema de coco reemplaza a la de leche, así que ya viene sin lactosa. Súmale huevo duro o pollo desmenuzado para llegar a las dos porciones de proteína del almuerzo.' },

  { id: 'x09', n: 'Crema de betarraga con jengibre', t: 'almuerzo', min: 40, leg: null, origen: O,
    p: { ver: 2 },
    ing: ['6 betarragas (600 g)', '½ cebolla (100 g)', '1 diente de ajo', 'Jugo de ½ naranja', '½ taza de crema de coco', 'Jengibre'],
    pasos: ['Cocer las betarragas hasta que estén blandas.', 'Sofreír la cebolla con el ajo.', 'Licuar las betarragas junto al sofrito.', 'Agregar el jugo de naranja, la crema de coco y el jengibre.'],
    truco: 'El color fucsia intenso funciona muy bien con la hija. Es también la base perfecta para esconder garbanzos licuados.' },

  { id: 'x10', n: 'Ceviche de garbanzos', t: 'almuerzo', min: 75, leg: 'oculta', origen: O,
    p: { pro: 1, ver: 2 },
    ing: ['130 g de garbanzos cocidos', '¼ taza de jugo de limón', '½ taza de cebolla picada', '½ taza de pimentón rojo picado', '½ taza de cilantro picado', '½ zanahoria', '½ tomate', '¼ de zapallo italiano', '1 cda de aceite de oliva', 'Sal y pimienta'],
    pasos: ['Picar todas las verduras en cubos pequeños.', 'Mezclar con los garbanzos y aliñar con limón, aceite, sal y pimienta.', 'Dejar reposar en el refrigerador 1 hora antes de servir.'],
    truco: 'Una hora de reposo, casi todo tiempo de espera. Para la hija procesa los garbanzos y sírvelos como pasta para untar: enteros los reconoce y los deja.' },

  { id: 'x11', n: 'Hamburguesa de lentejas', t: 'almuerzo', min: 25, leg: 'oculta', origen: O,
    p: { pro: 2 },
    ing: ['130 g de lentejas cocidas', '1 diente de ajo', '½ cebolla', 'Aceite de oliva', 'Sal y pimienta', 'Harina de avena si falta consistencia'],
    pasos: ['Moler las lentejas en una procesadora.', 'Picar muy fina la cebolla y el ajo.', 'Mezclar todo con las manos y formar los medallones.', 'Dorar en sartén con poco aceite.', 'Si la mezcla se desarma, agregar harina de avena.'],
    truco: 'Molidas no se reconocen: es de las formas más efectivas de camuflar legumbres. El recetario indica que las lentejas se pueden reemplazar por cualquier otra legumbre.' },

  { id: 'x12', n: 'Buddha bowl', t: 'almuerzo', min: 30, leg: 'oculta', origen: O,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['Base de hojas verdes: lechuga, espinaca o rúcula', 'Verduras: tomate, pepino, repollo, brócoli, zanahoria, coliflor', '¾ taza de arroz, choclo, papas o mote', 'Proteína: garbanzos, porotos, arvejas, tofu, huevo o quinoa', 'Semillas de chía, sésamo, maravilla o zapallo', 'Aderezo a elección'],
    pasos: ['Armar un plato balanceado con vegetales, cereal, proteína y semillas.', 'Combinar los ingredientes según lo que haya en la casa.', 'Terminar con un aderezo del recetario.'],
    truco: 'El original incluye maní entre los frutos secos: eliminado por la alergia. Si eliges legumbre como proteína, procésala para la hija. El recetario propone una combinación distinta para cada día de la semana.' },

  { id: 'x13', n: 'Ensalada en frasco', t: 'almuerzo', min: 20, leg: null, al: ['frutos secos'], origen: O,
    p: { cer: 1, pro: 2, ver: 2 },
    ing: ['2 a 4 cdas de vinagreta', 'Verduras duras: cebolla, hinojo, tomate o zanahoria', '¾ taza de cereal: arroz, burgol o quinoa', 'Proteína: pescado, pollo, tofu o queso sin lactosa', 'Frutas y verduras tiernas: zapallo italiano, palta, frutillas', 'Hojas de ensalada', 'Nueces, semillas o chips'],
    pasos: ['Poner la vinagreta al fondo del frasco.', 'Agregar las verduras duras, que se van a marinar.', 'Sumar el cereal y sobre él la proteína.', 'Continuar con las frutas y verduras frescas.', 'Terminar con las hojas de ensalada y, arriba de todo, las semillas.'],
    truco: 'El orden de las capas es lo que evita que se ablande. Las hojas deben ir bien secas y la última capa se agrega el mismo día que se come. Perfecta para llevar al trabajo sin microondas.' },

  { id: 'x14', n: 'Pizza con masa de avena', t: 'almuerzo', min: 20, leg: null, origen: O,
    p: { cer: 1, pro: 1 },
    ing: ['½ taza de avena', '1 huevo', 'Orégano', 'Chorrito de aceite', 'Relleno: salsa de tomate, pollo, aceitunas'],
    pasos: ['Mezclar en un bowl la avena, el huevo, el orégano, sal y condimentos.', 'Verter en sartén con un chorrito de aceite y cocinar por ambos lados.', 'Cubrir con el relleno elegido.'],
    truco: 'Masa de dos ingredientes, sin harina ni levadura ni espera. Con pollo y ensalada al lado queda como almuerzo completo.' },

  /* --------------------------- BASES Y UNTABLES --------------------------- */
  { id: 'x15', n: 'Granola casera', t: 'base', min: 40, leg: null, al: ['frutos secos'], origen: O,
    p: { cer: 1 },
    ing: ['2 tazas de avena', '1 taza de quinoa lavada sin cocer', '½ taza de almendras tostadas', '½ taza de miel', '2 cdas de aceite de coco derretido', '2 cdtas de sal', '1 cdta de canela'],
    pasos: ['Mezclar todo en un bowl.', 'Verter sobre la lata del horno cubierta con papel.', 'Hornear 20 minutos a 180 °C.', 'Sacar, remover y hornear otros 10 minutos.'],
    truco: 'Porción indicada por el recetario: 30 gramos o ½ taza, que equivale a 1 cereal. Contiene almendras: no la uses en el plato de la hija sin molerlas y verificando el envase.' },

  { id: 'x16', n: 'Pan casero alto en fibra', t: 'base', min: 60, leg: null, al: ['sésamo'], origen: O,
    p: { cer: 1 },
    ing: ['250 g de harina blanca', '250 g de harina integral', '1 cdta de sal', '2 cdas de azúcar de coco o morena', '50 g de sésamo', '50 g de linaza', '50 g de semilla de girasol', '4 cdas de levadura seca', '50 ml de aceite de oliva', '300 ml de agua tibia'],
    pasos: ['Separar 2 cdtas de cada semilla y remojar la linaza en 200 ml de agua caliente.', 'Mezclar las harinas con los ingredientes secos.', 'Agregar los líquidos y la linaza remojada.', 'Amasar de 10 a 20 minutos.', 'Formar un rollo, poner en molde con papel mantequilla y pintar con el líquido de la linaza.', 'Esparcir las semillas reservadas y hornear 30 minutos a 180 °C.'],
    truco: 'Rinde 20 rebanadas. Cada una: 146 kcal, 4,18 g de proteína, 6 g de grasa y 18 g de carbohidratos. Dos rebanadas equivalen aproximadamente a 1 porción de cereal.' },

  { id: 'x17', n: 'Bebida de soya casera', t: 'base', min: 40, leg: 'oculta', origen: O,
    p: { lac: 1 },
    ing: ['500 g de porotos de soya remojados al menos 8 horas', '5 tazas de agua para moler', '4 tazas de agua para hervir', '1 varilla de canela'],
    pasos: ['Remojar los porotos 8 horas o más y retirar toda la cáscara posible.', 'Licuar los porotos con las 5 tazas de agua, en dos tandas si es necesario.', 'Verter en olla grande con las 4 tazas de agua y la canela, a fuego medio-alto.', 'Cuando hierva, retirar del fuego y colar.'],
    truco: 'Legumbre camuflada en formato bebida: la hija toma soya sin verla nunca. El recetario advierte que queda algo amarga; se endulza con azúcar de coco, dátiles o tagatosa.' },

  { id: 'x18', n: 'Pan de avena al microondas', t: 'base', min: 6, leg: null, origen: O,
    p: { cer: 1, pro: 1 },
    ing: ['4 cucharadas de avena', '1 huevo', '1 cucharada de chía', '¼ vaso de bebida vegetal'],
    pasos: ['Mezclar todos los ingredientes en un bowl.', 'Agregar sal y condimentos a gusto.', 'Revolver y llevar al microondas 4 minutos.'],
    truco: 'Pan individual en cuatro minutos, sin horno. El original usa leche; aquí va bebida vegetal.' },

  { id: 'x19', n: 'Mermelada casera de berries', t: 'base', min: 20, leg: null, origen: O,
    p: { fru: 1 },
    ing: ['300 g de berries', 'Jugo de ½ limón', '2 cucharadas de chía', 'Endulzante opcional'],
    pasos: ['Cocinar los berries con el limón y el endulzante, con tapa y a fuego bajo, 15 minutos.', 'Agregar la chía y revolver bien para que se hidrate y espese.', 'Enfriar y guardar en un frasco de vidrio.'],
    truco: 'Sin azúcar añadida y espesada con chía en vez de pectina. Dura una semana en el refrigerador.' },

  { id: 'x20', n: 'Pasta de pollo y pimentón', t: 'base', min: 15, leg: null, origen: O,
    p: { pro: 2 },
    ing: ['200 g de pechuga de pollo cocida', '½ pimentón asado al horno', 'Chorrito del caldo de cocción del pollo', 'Sal y condimentos'],
    pasos: ['Triturar en la procesadora el pollo cocido con el pimentón.', 'Agregar un chorrito del caldo de cocción para dar cremosidad.', 'Condimentar a gusto.'],
    truco: 'El caldo reemplaza a la mayonesa: queda cremosa sin grasa añadida. Con dos rebanadas de pan y ensalada arma una once o cena completa de la pauta.' },

  { id: 'x21', n: 'Pasta de huevo, palta y cilantro', t: 'base', min: 15, leg: null, origen: O,
    p: { pro: 2, arl: 1 },
    ing: ['2 huevos duros', '½ palta pequeña', 'Cilantro a gusto', 'Sal', 'Jugo de limón opcional'],
    pasos: ['Moler con un tenedor los huevos, la palta y el cilantro.', 'Agregar sal, limón y condimentos.', 'Mezclar y servir.'],
    truco: 'Es la pasta del desayuno de ejemplo de la pauta. La palta reemplaza a la mayonesa y suma la porción de ARL.' },

  { id: 'x22', n: 'Pasta de pollo y palmito', t: 'base', min: 15, leg: null, origen: O,
    p: { pro: 2 },
    ing: ['200 g de pechuga de pollo cocida', 'Palmitos a gusto', 'Chorrito del caldo de cocción del pollo', 'Sal y condimentos'],
    pasos: ['Triturar el pollo cocido junto con los palmitos.', 'Agregar un chorrito del caldo de cocción.', 'Condimentar a gusto.'],
    truco: 'El palmito da una textura suave que a la hija le resulta más fácil que el pollo en trozos.' },

  /* --------------------------- SALSAS Y ADEREZOS --------------------------- */
  { id: 'x23', n: 'Hummus', t: 'salsa', min: 10, leg: 'oculta', al: ['sésamo'], origen: O,
    p: { pro: 1 },
    ing: ['300 g de garbanzos hervidos', '2 cdas de tahini', '2 dientes de ajo machacados', '1 rama de perejil picado', '½ cdta de ají de color', 'Jugo de ½ limón', '3 cdas de aceite de oliva', 'Sal marina'],
    pasos: ['Poner todo en la licuadora y procesar hasta lograr una pasta muy fina.', 'Guardar en un recipiente cerrado en el refrigerador.'],
    truco: 'Legumbre completamente camuflada: 41 kcal por cucharada. Tíñelo con un trozo de betarraga cocida y se convierte en salsa rosada para la hija. Contiene sésamo por el tahini.' },

  { id: 'x24', n: 'Salsa de betarraga', t: 'salsa', min: 10, leg: null, origen: O,
    p: { ver: 1 },
    ing: ['2 zanahorias ralladas', '2 betarragas', '100 g de tofu cremoso o yogur natural sin lactosa', '50 ml de aceite de oliva', 'Cilantro', 'Sal marina'],
    pasos: ['Batir todos los ingredientes excepto el aceite.', 'Añadir el aceite al final, de a poco, hasta que la salsa quede suave.'],
    truco: '19 kcal por cucharada. El color rosado la hace ideal para presentarla a la hija como salsa de princesa.' },

  { id: 'x25', n: 'Mayonesa sin huevo crudo', t: 'salsa', min: 15, leg: null, origen: O,
    ing: ['4 huevos duros', '1 yogur natural sin lactosa y sin endulzar', 'Jugo de ½ limón', 'Ajo', 'Sal y condimentos'],
    pasos: ['Moler los huevos con tenedor o minipimer.', 'Mezclar con el yogur hasta que quede homogéneo y sin grumos.', 'Agregar sal, condimentos, ajo y limón.'],
    truco: 'Sin huevo crudo, así que es segura para la hija. El original usa yogur natural; aquí va sin lactosa.' },

  { id: 'x26', n: 'Mayonesa de palmitos', t: 'salsa', min: 10, leg: null, origen: O,
    ing: ['1 tarro de palmitos', '2 a 3 cdas del agua del palmito', 'Albahaca', 'Limón', 'Aceite'],
    pasos: ['Poner todos los ingredientes en una procesadora y triturar hasta que quede cremoso.'],
    truco: 'Vegetal, sin huevo y sin lácteos. El agua del propio tarro es la que da la textura.' },

  { id: 'x27', n: 'Yogur ciboulette', t: 'salsa', min: 5, leg: null, origen: O,
    ing: ['1 yogur griego natural sin lactosa y sin endulzar', 'Ciboulette', 'Jugo de ½ limón', 'Ajo', 'Sal y condimentos'],
    pasos: ['Mezclar el yogur con el limón.', 'Agregar sal, condimentos y ajo.', 'Incorporar el ciboulette picado.'],
    truco: 'La pauta la menciona para aliñar ensaladas frías de pasta. El original usa yogur griego común; aquí va sin lactosa.' },

  { id: 'x28', n: 'Caviar vegetal de aceitunas', t: 'salsa', min: 15, leg: null, origen: O,
    p: { arl: 1 },
    ing: ['250 g de aceitunas negras', '2 dientes de ajo machacados', 'Tofu cremoso o queso sin lactosa, opcional', 'Aceite de oliva opcional'],
    pasos: ['Remojar las aceitunas durante la noche.', 'Triturarlas con el ajo hasta obtener una pasta cremosa.', 'Para suavizarla, añadir tofu cremoso y un poco de aceite de oliva.'],
    truco: '18 kcal por cucharada. El remojo nocturno le baja bastante la sal.' },

  { id: 'x29', n: 'Tahini', t: 'salsa', min: 15, leg: null, al: ['sésamo'], origen: O,
    ing: ['100 g de semillas de sésamo tostado', '5 cdas de aceite de sésamo', 'Sal marina', 'Agua'],
    pasos: ['Machacar el sésamo con la sal en un mortero.', 'Añadir el aceite y remover.', 'Incorporar agua de a poco, sin dejar de remover, hasta lograr una crema.'],
    truco: '103 kcal por cucharada. También se puede hacer todo en la picadora. Es la base del hummus y de la salsa de sésamo y jengibre.' },

  { id: 'x30', n: 'Aderezo de sésamo y jengibre', t: 'salsa', min: 10, leg: null, al: ['sésamo'], origen: O,
    ing: ['2 cdas soperas de tahini', '25 g de jengibre pelado y rallado fino', '1 diente de ajo prensado', '2 cdas soperas de jugo de limón', '1 cdta sopera de aceite de oliva'],
    pasos: ['Mezclar todos los ingredientes hasta integrar.'],
    truco: 'Rinde 125 ml. Levanta cualquier bowl de arroz con verduras.' },

  { id: 'x31', n: 'Vinagreta al orégano', t: 'salsa', min: 5, leg: null, origen: O,
    p: { gra: 1 },
    ing: ['½ cdta de orégano', '2 cdas de levadura de cerveza', '1 diente de ajo machacado', '1 pizca de comino molido', '½ cdta de mostaza', 'Jugo de 1 limón', '100 ml de aceite de oliva', 'Sal marina'],
    pasos: ['Mezclar todos los ingredientes.'],
    truco: '82 kcal por cucharada. La levadura de cerveza le da un fondo tipo queso sin usar lácteos.' },

  { id: 'x32', n: 'Vinagreta balsámica', t: 'salsa', min: 5, leg: null, origen: O,
    p: { gra: 1 },
    ing: ['75 ml de vinagre balsámico', '2 cdtas de mostaza Dijon', '150 ml de aceite de oliva', 'Sal y pimienta'],
    pasos: ['Mezclar todos los ingredientes hasta emulsionar.'],
    truco: 'Rinde 250 ml y dura semanas en frasco cerrado. Cuatro cucharaditas de aceite equivalen a 1 porción de grasa.' },

  { id: 'x33', n: 'Vinagreta de limón', t: 'salsa', min: 5, leg: null, origen: O,
    p: { gra: 1 },
    ing: ['2 cdtas de mostaza Dijon', '1 cdta de cáscara de limón', 'Zumo de limón', '100 ml de aceite de oliva', '1 diente de ajo muy picado', 'Sal y pimienta'],
    pasos: ['Mezclar todos los ingredientes hasta emulsionar.'],
    truco: 'Rinde 150 ml. El limón sobre las legumbres mejora la absorción del hierro, así que va perfecta con el ceviche de garbanzos.' },

  { id: 'x34', n: 'Vinagreta clásica', t: 'salsa', min: 5, leg: null, origen: O,
    p: { gra: 1 },
    ing: ['4 cucharadas de aceite de oliva', '1 cucharada de vinagre', '½ cucharada de mostaza Dijon'],
    pasos: ['Poner todo en la minipimer o batidora.', 'Emulsionar hasta que quede homogéneo.', 'Condimentar a gusto y volver a batir.'],
    truco: 'Tres ingredientes y treinta segundos. La proporción base para improvisar cualquier otra vinagreta.' },
];
