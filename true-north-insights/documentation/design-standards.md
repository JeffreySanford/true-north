# True North Insights - Design Standards

This document outlines the design standards and principles for the True North Insights application. Our goal is to create a consistent, intuitive, and visually appealing user experience by adhering to a modern and expressive design system.

## 1. Core Design System: Angular Material 3 (Expressive)

The entire application is built upon **Angular Material 3**, utilizing its **Expressive Theme**. This choice provides a robust set of pre-built, accessible, and high-quality UI components that align with Google's latest Material Design guidelines.

- **Component Library**: All UI elements, such as buttons, forms, navigation, and dialogs, should be sourced from the Angular Material library.
- **Theming**: We use a custom Material 3 theme that emphasizes a clean, tactical, and modern aesthetic.
- **Expressiveness**: The Expressive theme allows for more dynamic and branded user experiences through enhanced color, typography, and shape.

## 2. Layout System: Angular Flex-Layout

To ensure a responsive and consistent layout across all devices, we use the **Angular Flex-Layout** library. This provides a powerful and declarative API for building complex, flexible layouts based on the CSS Flexbox model.

- **Grid System**: We **do not** use traditional CSS grid systems like Bootstrap's (e.g., `col-md-4`, `row`).
- **Directives**: All layouts should be constructed using `fxLayout`, `fxLayoutAlign`, `fxFlex`, and other related directives. This approach keeps our layout logic within the component's template and is more idiomatic to the Angular ecosystem.
- **Responsiveness**: Use responsive suffixes (e.g., `fxLayout.gt-sm`, `fxFlex.lt-md`) to adapt the layout for different screen sizes.

## 3. Color Palette

Our color palette is designed to be tactical, clear, and accessible. It combines a neutral base with vibrant, meaningful accent colors.

| Color Name          | Hex Code  | Usage                               |
| ------------------- | --------- | ----------------------------------- |
| **Primary**         | `#3f51b5` | Primary actions, headers, navigation|
| **Accent**          | `#ff4081` | Secondary actions, highlights       |
| **Warn**            | `#f44336` | Errors, warnings, destructive actions|
| **Success**         | `#00ff41` | Successful operations, confirmations|
| **Tactical Blue**   | `#00bfff` | Informational elements, links       |
| **Tactical Gray**   | `#36454f` | Borders, dividers, disabled states  |
| **Surface**         | `#1e1e1e` | Backgrounds for components          |
| **Background**      | `#121212` | Main application background         |
| **On Primary**      | `#ffffff` | Text/icons on primary backgrounds   |
| **On Surface**      | `#ffffff` | Text/icons on surface backgrounds   |

## 4. Typography

Typography is critical for readability and hierarchy. We use the following typographic scale, which is configured through our Angular Material theme.

- **Headline 1 (`.mat-headline-1`)**: Page titles, major headings
- **Headline 2 (`.mat-headline-2`)**: Section titles
- **Subtitle 1 (`.mat-subtitle-1`)**: Component titles, important labels
- **Body 1 (`.mat-body-1`)**: Main content, body text
- **Button (`.mat-button`)**: Text for buttons and interactive elements
- **Caption (`.mat-caption`)**: Helper text, captions, metadata

The primary font family used is **Roboto**, which is the standard for Material Design.

## 5. Iconography

We use the standard **Material Icons** library for all iconography.

- **Consistency**: Use icons consistently and according to their intended meaning.
- **Styling**: Icons should be styled (color, size) to match the context of the surrounding UI.
- **Usage**: Use the `<mat-icon>` component to display icons.

## 6. Component Design Principles

- **Modularity**: Components should be self-contained and reusable.
- **Accessibility**: All components must be accessible. Use ARIA attributes where necessary and ensure proper keyboard navigation and screen reader support.
- **Simplicity**: Strive for clean and uncluttered interfaces. Avoid unnecessary visual noise.
- **Statefulness**: Components should clearly communicate their state (e.g., loading, disabled, active).
