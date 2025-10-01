# Archived Angular App Components

## Preserved Animation Assets

This directory contains the animation components and effects from the original Angular app implementation. While the parallax implementation had issues, these contain some nice visual effects worth preserving for the new Nx monorepo implementation.

### Animations Directory
- `animated-background.component.ts` - Animated stars background with patriotic themes and tactical effects
- `_animations.scss` - Complete keyframe animations including radar scans, tactical effects, ripples, etc.
- `transition.service.ts` - Service for managing page transitions
- `scroll.service.ts` - Scroll-based animation triggers

### Components Directory
- `radar-display/` - Canvas-based radar display with scanning animations
- `tactical-display/` - Military-style tactical display with grid and entity tracking

### Notes
- These components were built for Angular 19 but can be adapted for Angular 20
- The parallax mouse implementation had performance issues and should be redesigned
- The tactical theme animations (stars, scan lines, data pulses) work well
- Canvas-based components (radar/tactical) are solid and reusable

### Recommended Approach for New Implementation
1. Extract the keyframe animations from `_animations.scss`
2. Refactor the background component to use modern Angular practices
3. Convert canvas components to use Angular Signals and modern lifecycle
4. Implement proper performance optimization for animations
5. Create proper TypeScript interfaces for the tactical data structures
