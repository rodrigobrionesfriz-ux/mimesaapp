# Mi minuta familiar

App familiar para planificar desayuno, colación, almuerzo y cena, y registrar qué se preparó
realmente frente a lo que estaba sugerido.

La app está construida sobre la pauta real de la nutricionista Francisca Fuentes Olave: sus seis
tiempos de comida, sus porciones por grupo de alimentos y sus guías de meal prep y compras.

Restricciones aplicadas a todo el recetario: **sin lactosa** y **sin maní** (alergia). Las 51
recetas base cumplen ambas; 14 llevan legumbre camuflada para que la hija las coma sin verlas.
Las recetas con frutos secos están marcadas con advertencia y son solo para los adultos.

> **Sobre las porciones.** La pauta entregada en consulta está personalizada para una sola persona
> adulta. Por eso la hija tiene un plan aparte dentro de la app, con su propia estructura, porciones
> y recetario. Ese plan de la niña **no viene de la consulta**: es una guía práctica para organizar
> la semana y debe validarse con su pediatra o con una nutricionista infantil, sobre todo por la
> alergia al maní.

### Estructura diaria de la pauta

| Tiempo | Porciones |
|---|---|
| Desayuno | 2 cereal + 2 proteína + 1 fruta + 1 lácteo |
| Colación de la mañana | 1 fruta + 1 ARL |
| Almuerzo | 1 cereal + 2 proteína + 2 tazas de mix verde |
| Colación de la tarde | 1 fruta + 1 lácteo + ½ cereal |
| Once / cena | 1 cereal + 2 proteína + 2 tazas de mix verde |
| Colación opcional | 1 lácteo + ½ cereal |

Más el omega 3 antes de dormir, todos los días.

- **PWA**: se instala en el teléfono como una app más y funciona sin conexión.
- **Firebase**: el plan se sincroniza entre los teléfonos de la casa en tiempo real.
- **GitHub Pages**: alojamiento gratuito, se publica solo con cada `git push`.

---

## Puesta en marcha

### 1. Configurar Firebase (una sola vez, ~10 minutos)

En la [consola de Firebase](https://console.firebase.google.com), proyecto `mimesa-43bac`:

**a) Activar el inicio de sesión con Google**
Compilación → Authentication → Sign-in method → habilitar **Google** → guardar.
Google es el único método de acceso de la app: no hay correo/contraseña ni acceso anónimo,
así que no habilites nada más. La app intenta primero con ventana emergente y, si el navegador
la bloquea (típico en la PWA instalada en iPhone), reintenta redirigiendo la pestaña.

**b) Autorizar el dominio de GitHub Pages**
Authentication → Settings → Authorized domains → **Add domain** → `TU-USUARIO.github.io`.
Sin este paso el botón de entrar falla silenciosamente.

**c) Crear la base de datos**
Compilación → Firestore Database → Crear base de datos → modo producción → región `southamerica-east1`.

**d) Publicar las reglas de seguridad**
Firestore → pestaña Reglas → pegar el contenido de [`firestore.rules`](./firestore.rules) → Publicar.

> Sobre la `apiKey`: la configuración web de Firebase es pública por diseño, va incrustada en
> el código del navegador y solo identifica el proyecto. Lo que protege los datos son estas
> reglas más el inicio de sesión. Aun así conviene, en Google Cloud Console → Credenciales,
> restringir la clave por referente HTTP a tu dominio de GitHub Pages.

### 2. Publicar en GitHub Pages

1. Crea un repositorio (por ejemplo `mi-mesa`) y sube el contenido de esta carpeta.
2. En el repositorio: **Settings → Pages → Source: GitHub Actions**.
3. Haz `git push` a `main`. La acción compila y publica sola.
4. Queda en `https://TU-USUARIO.github.io/mi-mesa/`.

No necesitas Node instalado: GitHub compila por ti. Si quieres trabajar en local:

```bash
npm install
npm run dev
```

### 3. Instalarla en el teléfono

- **Android / Chrome**: abre la URL → menú ⋮ → *Instalar aplicación*.
- **iPhone / Safari**: abre la URL → Compartir → *Añadir a pantalla de inicio*.

### 4. Compartirla con tu pareja

La primera persona entra con Google y crea el hogar. El código aparece en la pestaña **Pauta**.
La segunda persona entra con su cuenta, elige *Unirme con un código* y lo pega. Desde ahí ambos
ven y editan el mismo plan.

---

## Cómo funciona

| Sección | Qué hace |
|---|---|
| **Semana** | Dos planes independientes que se cambian con el selector de arriba: el de los adultos (6 tiempos de comida, con el objetivo de porciones de la pauta a la vista) y el de la hija (5 tiempos, con porciones y texturas de preescolar). El botón *Armar la semana* llena todo respetando: recetas cortas de lunes a viernes, y mínimo 4 preparaciones con legumbre camuflada. |
| **Mes** | Calendario con un punto por día según cuánto se cumplió, más el acumulado mensual. |
| **Compras** | Lista de la semana agrupada por pasillo de supermercado, con marcado que se sincroniza entre teléfonos. |
| **Guía de la hija** | Su estructura de cinco tiempos, porciones medidas con sus manos, precauciones por la alergia al maní y por riesgo de atoro, y qué funciona para que coma a los 3 años. |
| **Porciones** | Las equivalencias de la guía de la nutricionista, buscables. Además las guías de meal prep, conservación de alimentos, orden del refrigerador y recorrido del supermercado. |
| **Recetas** | Las 51 base más las que agregue la familia. Se tocan para ver ingredientes, pasos y truco. Filtros por tiempo de comida, propias, legumbre oculta y duración. El formulario rechaza cualquier receta que mencione maní. |
| **Historial** | Cada discrepancia entre lo sugerido y lo real, con el motivo. Muestra por qué se cae el plan y qué platos se reemplazan más. |
| **Pauta** | Sube el `.docx` de la nutricionista. Extrae el texto, detecta las indicaciones y las muestra sobre el planificador. |

Al tocar cualquier comida se abre la receta completa y tres opciones de registro:
*se preparó tal cual*, *preparé otra cosa* o *no se preparó*. En la segunda, el reemplazo se
elige desde una lista desplegable con todas las recetas cargadas, agrupadas por tiempo de
comida, o desde la opción **Otra** para escribirlo a mano. Solo las dos últimas opciones
generan una entrada en el historial.

## Estructura de datos en Firestore

```
usuarios/{uid}                        → { hogarId, nombre, correo }
hogares/{hogarId}                     → { nombre, miembros[], creado }
  ├── semanas/{YYYY-MM-DD}            → plan de los adultos + lista de compras
  ├── semanas_hija/{YYYY-MM-DD}       → plan de la hija + lista de compras
  ├── historial/{perfil_fecha_tipo}   → { perfil, sugerido, real, motivo, estado, ts }
  ├── recetas/{id}                    → recetas propias de la familia
  └── config/pauta                    → texto e indicaciones del documento Word
```

## Estructura del proyecto

```
src/
  App.jsx                 orquestación, generación de la semana y registro
  firebase.js             inicialización con caché offline
  estilos.css             paleta SAP Fiori (Quartz Light y Quartz Dark)
  utiles.js               fechas, tipos de comida, categorías de supermercado
  datos/pauta.js          la pauta, las equivalencias y las guías de la nutricionista
  datos/recetas.js        las 51 recetas base de los adultos, con sus porciones
  datos/hija.js           el plan de la hija: estructura, porciones y sus 30 recetas
  datos/nube.js           hooks de Firestore en tiempo real
  componentes/            una vista por sección
public/
  manifest.webmanifest    metadatos de instalación
  sw.js                   service worker (funcionamiento sin conexión)
  iconos/                 iconos de la app
```

## Paleta

Sigue SAP Fiori. Modo claro (Quartz Light): shell `#354A5F`, marca `#0A6ED1`, fondo `#F5F6F7`.
Modo oscuro (Quartz Dark): fondo `#12171C`, tarjetas `#1D232A`, marca `#4DB1F0`.
El tema se elige con el botón de la cabecera y respeta la preferencia del sistema la primera vez.

## Nota

Las cantidades están calculadas para 3 personas sin distinguir tamaño de porción. A una niña de
3 años conviene servirle cerca de un tercio del plato adulto. Si la nutricionista fijó gramajes
o distribución de macronutrientes, ajusta las recetas de `src/datos/recetas.js` para que calcen
con esa pauta.
