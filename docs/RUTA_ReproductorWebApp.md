# Ruta de Desarrollo - ReproductorWebApp

Hoja de ruta con tareas pequeñas y concretas para llegar al objetivo
completo. No incluye código: cada tarea indica **qué construir** y
**qué conceptos/herramientas aplicar**, para que la implementación la
hagas vos.

Marca cada casilla a medida que avances.

---

## Fase 0 — Cimientos (tipos y datos)

- [x] Definir `types/song.ts` con la interfaz `Song`.
- [x] Definir `types/artist.ts` con la interfaz `Artist`.
- [x] Crear `data/songs.mock.ts` con 6-8 canciones tipadas como
      `Song[]`, usando imágenes y datos reales para maquetar.
- [x] Crear `data/artists.mock.ts` con 4-6 artistas tipados como
      `Artist[]`.

**Conceptos aplicados:** interfaces de TypeScript, separación entre
modelo de datos y datos simulados.

---

## Fase 1 — Componentes reutilizables base

- [x] Construir `components/music/SongCard.tsx` (recibe `song: Song`
      completo como prop, usa `Card` de HeroUI, formatea duración).
- [x] Crear `utils/formatDuration.ts` como función pura, separada del
      componente (si no lo hiciste ya).
- [x] Construir `components/music/ArtistCard.tsx`, variante circular
      de una tarjeta, reutilizando lo aprendido en `SongCard`.
- [x] Construir `components/common/HorizontalScrollSection.tsx`: un
      componente genérico que recibe un título y una lista de
      elementos (`children` o una prop de items), y los muestra en
      fila con scroll horizontal. Acá es donde debe vivir el `.map()`
      que hoy tenés suelto en `ReproductorWebApp`.

**Conceptos a aplicar:** props tipadas, responsabilidad única por
componente, composición de componentes, `.map()` con `key`.

---

## Fase 2 — Estructura general de la página (layout)

- [x] Armar el esqueleto de grid (`grid-rows-[auto_1fr_auto]` +
      `h-screen`) con Header, Sidebar+contenido, y Player.
- [x] Construir `components/layout/Sidebar.tsx` real:
  - [x] Estado `useState<boolean>` para colapsado/expandido.
  - [x] Array tipado de ítems de navegación (Inicio, Favoritos) con
        sus íconos de Iconify.
  - [x] Ancho dinámico con clases condicionales + `transition-all`.
  - [x] Ocultar el texto del label cuando está colapsado (render
        condicional).
  - [x] Botón de colapsar/expandir con ícono de Iconify y `aria-label`.
- [x] Reemplazar el `<aside>` placeholder por `<Sidebar />` en tu
      componente principal.
- [x] Extraer el esqueleto general a `components/layout/AppLayout.tsx`
      (mover ahí el grid que ya armaste), dejando
      `ReproductorWebApp`/`App.tsx` más simple.

**Conceptos a aplicar:** `useState`, levantar estado al padre, render
condicional, Iconify, accesibilidad básica (`aria-label`).

---

## Fase 3 — Context API para el reproductor

- [x] Diseñar qué datos necesita compartirse entre componentes
      alejados entre sí: canción actual, si está sonando, lista de
      reproducción activa (`currentSong`, `isPlaying`, `playlist`, y
      además `currentIndex` para saber la posición dentro de
      `playlist`).
- [x] Crear `context/PlayerContext.tsx`:
  - [x] `createContext` + tipado de lo que expone el contexto.
  - [x] Un `PlayerProvider` que use `useState` internamente para
        `currentSong`, `isPlaying`, `playlist` y `currentIndex`.
  - [x] Un hook personalizado `usePlayer()` que envuelva `useContext`
        para no repetir el import en cada componente.
- [x] Envolver `App.tsx` (o `AppLayout`) con `<PlayerProvider>`.
- [x] Conectar `SongCard` para que, al hacer click, dispare
      `playSong(song, index)`.
      **Decisión de diseño (distinta a la spec original):**
      `SongCard` NO llama `usePlayer()` directamente — eso la
      acoplaba al reproductor y le impedía reenviar el `index` (dato
      que `SongCard` no posee, solo lo tiene el componente que hace
      el `.map()`). En su lugar, `SongCard` recibe `onPlay` como
      prop callback y solo reenvía `(song, position)`. Quien arma la
      llamada real a `playSong` es `pages/Home.tsx`, que sí llama
      `usePlayer()` — y tiene que hacerlo como componente hijo del
      `PlayerProvider` (no en el mismo componente que lo declara),
      respetando dónde puede leerse un Context.

**Conceptos a aplicar:** Context API, `useContext`, hooks
personalizados, "prop drilling" y por qué se evita.

---

## Fase 4 — Player funcional (audio real)

- [x] Construir `components/layout/Player.tsx`, consumiendo
      `usePlayer()` para mostrar info de `currentSong`.
- [x] Investigar el elemento `<audio>` de HTML y cómo controlarlo
      desde React con una referencia (`useRef`).
- [x] Implementar Play/Pausa real conectado al `isPlaying` del
      contexto (incluye manejo correcto de la promesa de
      `audio.play()`, filtrando `AbortError` cuando la reproducción
      se interrumpe a propósito).
- [x] Implementar la barra de progreso:
  - [x] Escuchar el evento `timeupdate` del audio con `useEffect`.
  - [x] Mostrar tiempo actual / duración total, reutilizando
        `formatDuration`.
  - [x] Permitir que el usuario arrastre la barra para saltar de
        posición (buscar el componente `Slider` de HeroUI).
- [x] Implementar "canción siguiente" / "canción anterior" (requiere
      que el contexto sepa la lista completa y el índice actual).
      **Base ya lista:** `PlayerProvider` ya guarda `currentIndex`
      (sincronizado con `currentSong` dentro de `playSong`) y expone
      `playlist`. Falta escribir `nextSong` / `previousSong` y
      conectarlos a los íconos `ICONS.previous` / `ICONS.next` en
      `Player.tsx` (hoy son decorativos, sin `onClick`).
- [x] Implementar control de volumen con un `Slider` de HeroUI
      conectado a la propiedad `volume` del elemento `<audio>`.

**Conceptos a aplicar:** `useRef`, `useEffect` con eventos del DOM,
manejo de listas e índices, componente `Slider` de HeroUI.

---

## Fase 5 — Página de Inicio completa

- [ ] Ensamblar `pages/Home.tsx` (ya creado, adelantado desde Fase 3
      por necesidad del Context — ver nota arriba) usando
      `HorizontalScrollSection` tres veces:
  - [x] "Escuchados recientemente" con `SongCard` (conectada a
        `playSong` vía `onPlay` + `position`).
  - [ ] "Artistas escuchados recientemente" con `ArtistCard`.
  - [ ] "Últimos favoritos" con `SongCard`.
- [ ] Decidir de dónde sale el dato de "recientemente escuchado": por
      ahora, mock fijo; más adelante podría derivarse del historial
      real de reproducción guardado en el `PlayerContext`.

**Conceptos a aplicar:** composición de componentes ya construidos,
paso de listas como props.

---

## Fase 6 — Favoritos

- [ ] Diseñar el tipo de dato para un favorito (¿solo el `id` de la
      canción + fecha en que se agregó? Revisar la decisión pendiente
      de "Song pura" vs "FavoriteEntry con fecha").
- [ ] Crear `context/FavoritesContext.tsx` (mismo patrón que
      `PlayerContext`): `Provider` + `useState` con el array de
      favoritos + funciones `addFavorite` / `removeFavorite`.
- [ ] Agregar un botón/ícono de "agregar a favoritos" en `SongCard`
      (ícono de corazón con Iconify), conectado a
      `useFavorites()`.
- [ ] Construir la página/sección de **Favoritos**: lista de
      `SongCard`, ordenada del más reciente al más antiguo agregado.

**Conceptos a aplicar:** un segundo Context independiente del de
Player, ordenar arrays por fecha, actualización inmutable de estado
(no mutar el array directamente).

---

## Fase 7 — Header funcional

- [ ] Construir `components/layout/Header.tsx` con la disposición
      general: barra de búsqueda, ícono de perfil, ícono de
      metrónomo.
- [ ] Construir `components/search/SearchBar.tsx`: un input
      controlado (`useState`) que filtre o busque sobre tus datos
      mock por ahora (más adelante, sobre resultados de Deezer).
- [ ] Reemplazar el `<header>` placeholder por `<Header />`.

**Conceptos a aplicar:** inputs controlados, filtrado de arrays.

---

## Fase 8 — Metrónomo

- [ ] Construir `components/metronome/MetronomeModal.tsx`: un modal
      de HeroUI que se abre desde el ícono del Header.
- [ ] Investigar cómo hacer un temporizador preciso y visual en
      React: `setInterval` dentro de `useEffect`, con cuidado de
      limpiarlo en el cleanup (para no acumular intervalos).
- [ ] Implementar el slider de BPM (`Slider` de HeroUI) conectado al
      estado del intervalo.
- [ ] Implementar tags de tempo sugerido (ej. "Lento", "Moderado",
      "Rápido") como botones que setean un BPM predefinido.
- [ ] Implementar el botón Play/Pausa del metrónomo (inicia/detiene
      el intervalo).
- [ ] Pensar en la parte visual "dinámica" que pediste: ¿un elemento
      que pulse o cambie de color en cada beat? Podés lograrlo
      alternando una clase CSS en cada tick del intervalo.

**Conceptos a aplicar:** `useEffect` con cleanup, temporizadores en
JavaScript, estado derivado de un intervalo.

---

## Fase 9 — Conexión con la API de Deezer

- [ ] Configurar el proxy de desarrollo en `vite.config.ts`
      (`server.proxy`) apuntando a `api.deezer.com`, para evitar el
      bloqueo de CORS.
- [ ] Crear `services/deezerService.ts` con funciones que llamen al
      proxy (ej. `searchSongs(query)`).
- [ ] Escribir una función "adaptadora" que transforme la respuesta
      cruda de Deezer al tipo `Song` que ya definiste, sin cambiar
      nada en tus componentes.
- [ ] Reemplazar progresivamente `data/songs.mock.ts` por llamadas
      reales en los lugares que quieras (buscador primero, ya que es
      el caso de uso más natural).
- [ ] Investigar manejo de estados de carga y error (`isLoading`,
      `error`) al hacer fetch, para mostrar feedback al usuario.

**Conceptos a aplicar:** `fetch`, `async/await`, proxy de Vite,
patrón adaptador, manejo de estados de carga/error con `useState`.

---

## Fase 10 — Pulido general

- [ ] Revisar accesibilidad: `alt` en todas las imágenes, `aria-label`
      en botones de solo ícono.
- [ ] Revisar responsividad básica (que no se rompa en pantallas más
      chicas).
- [ ] Revisar estados vacíos (¿qué se muestra si no hay favoritos
      todavía?).
- [ ] Revisar consistencia de nombres de clases y convenciones en
      todo el proyecto.

---

## Notas de decisiones ya tomadas

- `SongCard` recibe el objeto `song` completo como prop (opción A).
- `Song` y `Artist` son tipos independientes, sin relación formal
  (opción A) — la relación se resuelve en tiempo de uso, no en el
  modelo de datos.
- Fase 1 del proyecto no incluye autenticación ni React Router: la
  navegación entre Inicio y Favoritos puede resolverse más adelante,
  ya sea con router o con estado simple (`useState` de "vista
  actual"), a decidir cuando llegues a la Fase 5/6.
