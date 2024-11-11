![Proyecto Logo](public/images/logo-con-titulo.png)
# MealsBuddy, saludable es ser bud - Docs

MealsBuddy es una aplicación web que te ayuda a llevar un control de tus comidas diarias, con el fin de que puedas llevar una alimentación más saludable.

#### Tecnologías utilizadas
- Remix (react based) + JS + Vite
- Tailwind CSS 
- Auth0 
- Vercel (deploy)
- Figma

#### Extensiones VSCode - Tailwind CSS:
- Tailwind CSS IntelliSense: autocompletado de clases de Tailwind 
- **Necesaria -** [PostCSS Language Support](https://www.youtube.com/watch?v=tGSuml1lbUY)
  - Tailwind es un PostCSS plugin. Elimina errores de sintaxis y da soprote a los archivos CSS ("unknown at-rule @tailwind"). 

### Correr el proyecto

Instalar las dependencias con 

```sh
npm install --legacy-peer-deps
```

Correr proyecto con (con vite)

```sh
npm run dev
```
```sh
npm run dev --reset-cache
```

#### Estructura de archivos más importantes

```
├── app
│   ├── components
│   └── routes
│       │ 
│       ├── _index.jsx: Página de inicio
│       ├── dietary-preferences.jsx: Preferencias alimenticias
│       ├── history.jsx: Historiales alimentos consumidos y macros
│       ├── homepage.jsx: Landing page 
│       ├── pantry.jsx: Despensa
│       ├── recipies-generator.jsx: Generador de recetas
│       ├── tokenContext.jsx: Validación de usuario
│       └── useApi.jsx: rutas de la API 
│
├── root.jsx 
├── tailwind.css
├── public
├── .eslintrc.cjs
├── README.md
├── tailwind.config.js
└── vite.config.js
```



### Remix Framework

#### Creación app
Al crear con `npx create-remix@latest` se crea con TS, para hacerlo con JS `npx create-remix@latest --template remix-run/remix/templates/remix-javascript` lo cual se encuentra a sección Guides>Templates en la documentación

