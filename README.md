# Mi Mesa

App familiar para planificar desayuno, colación, almuerzo y cena, y registrar qué se preparó
realmente frente a lo que estaba sugerido.

Pensada para: esposo (43), esposa (40, intolerante a la lactosa) e hija (3 años, rechaza las
legumbres a la vista). Las 45 recetas base están todas resueltas sin lactosa y 12 llevan
legumbre camuflada.

- **PWA**: se instala en el teléfono como una app más y funciona sin conexión.
- **Firebase**: el plan se sincroniza entre los teléfonos de la casa en tiempo real.
- **GitHub Pages**: alojamiento gratuito, se publica solo con cada `git push`.

---

## Puesta en marcha

### 1. Configurar Firebase (una sola vez, ~10 minutos)

En la [consola de Firebase](https://console.firebase.google.com), proyecto `mimesa-43bac`:

**a) Activar el inicio de sesión con Google**
Compilación → Authentication → Sign-in method → habilitar **Google** → guardar.

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
| **Semana** | 7 días × 4 tiempos de comida. El botón *Armar la semana* llena todo respetando: recetas cortas de lunes a viernes, y mínimo 4 preparaciones con legumbre camuflada. |
| **Mes** | Calendario con un punto por día según cuánto se cumplió, más el acumulado mensual. |
| **Compras** | Lista de la semana agrupada por pasillo de supermercado, con marcado que se sincroniza entre teléfonos. |
| **Recetas** | Las 45 base más las que agregue la familia. Filtros por tiempo de comida, legumbre oculta y duración. |
| **Historial** | Cada discrepancia entre lo sugerido y lo real, con el motivo. Muestra por qué se cae el plan y qué platos se reemplazan más. |
| **Pauta** | Sube el `.docx` de la nutricionista. Extrae el texto, detecta las indicaciones y las muestra sobre el planificador. |

Al tocar cualquier comida se abre la receta completa y tres opciones de registro:
*se preparó tal cual*, *preparé otra cosa* (con qué y por qué) o *no se preparó*.
Solo las dos últimas generan una entrada en el historial.

## Estructura de datos en Firestore

```
usuarios/{uid}                        → { hogarId, nombre, correo }
hogares/{hogarId}                     → { nombre, miembros[], creado }
  ├── semanas/{YYYY-MM-DD}            → { plan: { fecha: { desayuno, colacion, almuerzo, cena } }, compras }
  ├── historial/{fecha_tipo}          → { sugerido, real, motivo, estado, ts }
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
  datos/recetas.js        las 45 recetas base
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
