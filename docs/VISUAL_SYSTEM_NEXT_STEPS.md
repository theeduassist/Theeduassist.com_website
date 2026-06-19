# Visual System & Next Steps

## Current State
The project now runs entirely on Tailwind utility classes merged with consistent overarching brand variables (`--color-brand-*`). Components rely natively on `.hover-lift` and `.focus-ring` classes for consistent semantic styling.

## Animation
Animations strictly utilize native CSS keyframes (`fadeUp`, `softScale`). No Javascript animation libraries (Framer Motion, GSAP) are deployed. `prefers-reduced-motion` is globally honored in `global.css`.

## Next Steps
- Further components should reuse `.brand-card` instead of creating unique box-shadow variations.
- Apply `.focus-ring` uniformly to interactive elements.
- Validate dark mode configurations if introduced.
