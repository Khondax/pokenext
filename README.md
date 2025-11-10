# PokeNext

[![Visit Pokenext on Vercel](https://img.shields.io/badge/Visit%20Pokenext%20On%20Vercel-blue?style=for-the-badge&logo=arrow-right&logoColor=white)](https://pokenext-khondax.vercel.app/)

This repository contains a simple but useful pokedex in NextJS for a technical challenge.

Este repositorio contiene una pokedex en NextJS para una prueba técnica.

## Tareas pendientes:

- [x] 1. Estructura básica de desarrollo
- [x] 2. Atacar la [PokeAPI](https://pokeapi.co/docs/v2) para obtener los datos de Pokémons por region?
- [x]   - Listado de todos los Pokémon, ordenados por ID por defecto
- [x]   - Mostrar nombre, generacion, tipos y datos relevantes
- [x]   - Tipado de objetos (Pokémon, listas de estos y manipulación)
- [x] 3. Filtrado por tipo y generación
- [x]   - Mediante selectores
- [x] 4. Buscador por nombre en tiempo real, incluyendo evoluciones (habrá que escribir en el objeto del Pokémon los relacionados)
- [x] 5. Página de información de cada Pokémon:
- [x]   - Nombre
- [x]   - Imagen
- [x]   - Generación
- [x]   - Tipos
- [x]   - Evoluciones (con sus imágenes) 
- [x]     - Al hacer click en una evolución tiene que llevarme a dicho poke
- [x]     - Resaltar la evolución actual seleccionada
- [x]   - Stats
- [x] 6. Al volver al listado general se debe mantener el estado, filtros y contenido
- [x] 7. Añadir documentación general, de uso y ejecución en local
- [ ] 8. Añadir tests?
- [ ] 9. Mejorar la interfaz?
- [x]   - Pintar las tarjetas de cada pokemon con el color del tipo
- [x]   - Mejorar modal
- [x]   - Mover todos los componentes posibles a ficheros individuales
- [x]   - Incluyendo funciones
- [x]   - Crear un fichero ts para mapear los tipos (están en inglés) y las generaciones (ahora son numéricas)
- [x]   - Añadir un botón para volver arriba del todo
- [x]   - Modificar el filtrado por tipo para que sea excluyente. Anteriormente se seleccionaban todos los pokemon que tuvieran alguna coincidencia de tipo
- [ ]   - Cambiar la font?
- [x] 10. Desplegar en Vercel

## Getting Started

First, run this command if `/app/database/data.json` doesn't exists, so it can pre-download all pokemons in a JSON file to avoid a DDOS attack on PokeAPI's servers
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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

This repository is actually deployed on Vercel: [![PokeNext](https://img.shields.io/badge/PokeNext-blue?style=for-the-badge&logo=arrow-right&logoColor=white)](https://pokenext-khondax.vercel.app/)


## Social

If you're not coding right now, check out my socials:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Miguel%20Gonzalez%20Villa-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/miguel-gonzalez-villa/)