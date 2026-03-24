# Lotto Generator Blueprint

## Overview
A modern, interactive, and visually vibrant Lotto number generator. This application allows users to generate 6 unique random numbers between 1 and 45 with a premium user experience.

## Features
- **Dynamic Generation:** Generates 6 unique numbers (1-45) with the click of a button. Numbers are sorted in ascending order.
- **Web Component Architecture:** Encapsulated `<lotto-generator>` custom element using Shadow DOM.
- **Modern CSS:**
  - **oklch()**: Perceptually uniform colors for a vibrant look.
  - **Cascade Layers (@layer)**: Organized styles (base, components, utilities).
  - **Container Queries**: Responsive layout for the generator card.
  - **Glassmorphism**: `backdrop-filter: blur()` and semi-transparent backgrounds for a premium feel.
  - **Noise Texture**: Subtle SVG noise overlay for a tactile background.
- **Responsive Design:** Centered layout using CSS Grid, adapting to mobile and desktop.
- **Interactive UI:** Smooth `pop-in` animations and glow effects on buttons and lotto balls.

## Project Structure
- `index.html`: Entry point with the `<lotto-generator>` element.
- `style.css`: Global base styles, theme variables, and utility classes.
- `main.js`: Definition of the `LottoGenerator` Web Component.

## Design Details
- **Primary Color**: Bright cyan (`oklch(70% 0.25 250)`).
- **Background**: Deep dark blue with a radial gradient and noise texture.
- **Lotto Balls**: Dynamically colored based on their number value using `oklch` hue rotation.
- **Typography**: Sans-serif system stack with high-contrast font weights.

## Verification Results
- [x] 6 unique numbers (1-45) are generated.
- [x] Numbers are sorted in ascending order.
- [x] Web Component is correctly encapsulated.
- [x] Responsive layout with Container Queries.
- [x] Modern CSS features (oklch, layers) implemented.
- [x] No console errors in implementation logic.
