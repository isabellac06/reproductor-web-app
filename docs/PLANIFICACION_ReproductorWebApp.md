# ReproductorWebApp

## Planeación - Fase 1

### Objetivo

Construir **ReproductorWebApp**, un reproductor de música simple
desarrollado con **React + Vite + TypeScript + HeroUI**, con el objetivo
de aprender:

-   Componentes reutilizables
-   useState
-   useEffect
-   useContext

> **Nota:** El proyecto es un clon con fines educativos y de
> aprendizaje.

## Alcance de la Fase 1

### Header

-   Barra de búsqueda.
-   Icono de perfil.
-   Icono de metrónomo.
    -   Modal.
    -   Slider BPM.
    -   Tags de tempo sugerido.
    -   Botón Play/Pausa.

### Sidebar

-   Expandible y colapsable (solo íconos en columna vertical cuando
    está colapsado).
-   Inicio.
-   Favoritos.

### Inicio

-   Canciones escuchadas recientemente.
-   Artistas escuchados recientemente (tarjetas circulares).
-   Últimos favoritos añadidos.

### Favoritos

-   Canciones favoritas añadidas.

### Player

-   Información de la canción.
-   Barra de progreso.
-   Aleatorio.
-   Canción anterior.
-   Play/Pausa.
-   Canción siguiente.
-   Control de volumen.

## Arquitectura

``` text
src/
├── assets/
├── components/
│   ├── layout/
│   ├── music/
│   ├── search/
│   ├── metronome/
│   └── common/
├── context/
├── pages/
├── services/
├── data/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

## Tecnologías

-   React
-   Vite
-   TypeScript
-   HeroUI
-   Deezer API

## Objetivo de aprendizaje

Practicar el desarrollo de una aplicación moderna mediante componentes
reutilizables y manejo de estado con `useState`, `useEffect` y
`useContext`.
