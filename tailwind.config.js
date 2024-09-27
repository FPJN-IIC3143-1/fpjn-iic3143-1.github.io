export default {
  // content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Detectar todos los archivos js, jsx, ts, tsx en app
    "./app/tailwind.css",          // Incluye el archivo de estilos tailwind
  ],
  // content: ["./app/**/*.{js,jsx,ts,tsx}", 
  //   "./app/routes/**/*.{js,jsx,ts,tsx}", 
  //   "./app/**/*.{css}"
  // ],
  theme: {
    extend: {
      fontFamily: {
        // Para usar la fuente Kantumruy Pro por defecto
        sans: ["Kantumruy Pro", "Inter", "ui-sans-serif"],
        // Para usar la fuente Kantumruy Pro en un componente específico
        // 'kantumruy': ['Kantumruy Pro', 'ui-sans-serif'],
      },
    },
  },
  plugins: [],
};
