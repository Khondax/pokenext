# pokenext
This repository contains a simple but useful pokedex in NextJS for a technical challenge.
Este repositorio contiene una pokedex en NextJS para una prueba técnica.

## Tareas pendientes:
```
1. Estructura básica de desarrollo
2. Atacar la [PokeAPI](https://pokeapi.co/docs/v2) para obtener los datos de Pokémons por region?
  1. Listado de todos los Pokémon, ordenados por ID por defecto
  2. Mostrar nombre, generacion, tipos y datos relevantes
  3. Tipado de objetos (Pokémon, listas de estos y manipulación)
3. Filtrado por tipo y generación
  1. Mediante selectores
4. Buscador por nombre en tiempo real, incluyendo evoluciones (habrá que escribir en el objeto del Pokémon los relacionados)
5. Página de información de cada Pokémon:
  1. Nombre
  2. Imagen
  3. Generación
  4. Tipos
  5. Evoluciones (con sus imágenes) 
    1. Al hacer click en una evolución tiene que llevarme a dicho poke
    2. Resaltar la evolución actual seleccionada
  6. Stats
6. Al volver al listado general se debe mantener el estado, filtros y contenido

7. Añadir documentación de uso y despliegue/ejecución en local
8. Añadir tests
9. Mejorar la interfaz
  1. Pintar las tarjetas de cada pokemon con el color del tipo
  2. Mejorar modal
  3. Mover todos los componentes posibles a ficheros individuales
  4. Incluyendo funciones
  5. Crear un fichero ts para mapear los tipos (están en inglés) y las generaciones (ahora son numéricas)
  6. Añadir un botón para volver arriba del todo
10. Desplegar en Vercel??
```

## Getting Started

First, run this command to pre-download all pokemons in a JSON file to avoid a DDOS attack on PokeAPI's servers
```bash
node .\app\services\downloadPokemonData.ts
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.