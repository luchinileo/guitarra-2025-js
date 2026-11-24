# 🎸 GuitarLA - Tienda Online de Guitarras

Tienda online de guitarras hecha con **React** y **Vite**. Muestra un catálogo de productos y un carrito de compras que se guarda en el navegador, así no se pierde al recargar la página.

## 🛠️ Tecnologías

- **React 19**: componentes funcionales y hooks.
- **Vite 6**: entorno de desarrollo y build de producción.
- **JavaScript (ES Modules)** y **JSX**.
- **CSS** con utilidades basadas en **Bootstrap 5.2** (el CSS viene incluido en `src/index.css`, no se instala como dependencia).
- **ESLint** para el análisis estático del código.

## 🚀 Funcionalidades

- Catálogo de 12 guitarras generado a partir de un archivo de datos local (`src/data/db.js`).
- Carrito de compras desplegable desde el header:
  - Agregar productos al carrito.
  - Aumentar y disminuir cantidades (mínimo 1, máximo 5 unidades por producto).
  - Eliminar un producto del carrito.
  - Vaciar el carrito por completo.
  - Total a pagar calculado automáticamente.
- El carrito se guarda en **LocalStorage**, así se mantiene al recargar la página.

## 🧑‍💻 Conceptos aplicados

- **Custom Hook (`useCart`)**: toda la lógica del carrito vive en un hook, separada de los componentes que muestran la interfaz.
- **`useState` con inicialización perezosa**: el carrito se lee de LocalStorage solo la primera vez que se monta el componente.
- **`useEffect`**: sincroniza el carrito con LocalStorage cada vez que cambia.
- **`useMemo`**: guarda en memoria valores derivados (si el carrito está vacío y el total a pagar) para no recalcularlos si el carrito no cambió.
- **Estado inmutable**: el carrito se actualiza siempre creando arrays y objetos nuevos (`map`, `filter`, spread operator), sin modificar el estado existente.
- **Componentes reutilizables y props**: `Header` y `Guitar` reciben los datos y las funciones que necesitan desde `App`.

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Guitar.jsx    # Tarjeta de cada guitarra del catálogo
│   └── Header.jsx    # Header con el carrito de compras
├── data/
│   └── db.js         # Datos de las guitarras
├── hooks/
│   └── useCart.js    # Lógica del carrito (custom hook)
├── App.jsx
├── index.css
└── main.jsx
```

## ▶️ Cómo ejecutarlo

Necesitás tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

```bash
# Clonar el repositorio
git clone https://github.com/luchinileo/guitarra-2025-js.git
cd guitarra-2025-js

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
npm run dev
```

Otros comandos disponibles:

```bash
npm run build     # Genera la versión de producción en /dist
npm run preview   # Sirve localmente el build de producción
npm run lint      # Revisa el código con ESLint
```
