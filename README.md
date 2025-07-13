# 🎸 GuitarLA - Tienda Online de Guitarras  

## Descripción  
Proyecto desarrollado en **React** y **TypeScript** utilizando **Vite** para el entorno de desarrollo y **Tailwind CSS** para la maquetación y el diseño responsive.

El objetivo del proyecto fue profundizar en las buenas prácticas de desarrollo en React y optimizar la performance de la aplicación mediante la correcta gestión del estado y el renderizado eficiente de componentes.

## 🛠️ Tecnologías Utilizadas:
- React
- TypeScript
- Vite
- Tailwind CSS

## 🚀 Funcionalidades Destacadas:
- Catálogo dinámico de guitarras.
- Carrito de compras con gestión de cantidades y eliminación de productos.
- Persistencia del estado del carrito con **LocalStorage**.
- Navegación entre páginas utilizando **React Router**.

## 🔧 Optimización y Buenas Prácticas:
- Desarrollo de un **Custom Hook** para encapsular la lógica del carrito, facilitando la reutilización y manteniendo el código organizado.
- Uso de **`useMemo`** para memorizar cálculos costosos y prevenir renders innecesarios.
- Uso de **`useCallback`** para memorizar funciones y evitar su recreación constante en los renders, especialmente al pasarlas como props.
- Separación clara de responsabilidades mediante componentes reutilizables.

## 🧑‍💻 Conceptos Aplicados:
- Diferencias prácticas entre **`useMemo`** y **`useCallback`**:
  - `useMemo`: memoriza valores derivados (por ejemplo, totales del carrito) para no recalcular si no cambian las dependencias.
  - `useCallback`: memoriza funciones para evitar que React las re-cree en cada render innecesariamente.
- Mejora de la performance mediante control de renders y memoización de componentes.
- Uso correcto de hooks para mantener la UI sincronizada con el estado de la aplicación.
