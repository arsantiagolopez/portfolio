# Design System

This document explains the design system architecture, including styling organization, theming, and component patterns.

## Overview

The design system is built on a foundation of:
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Headless, accessible component library
- **CSS Variables** - For theming and design tokens
- **Dark Mode** - System-aware theme switching

## Architecture

### Styles Organization

Styles are organized into modular CSS files for maintainability and scalability. Each file handles a specific concern and is imported into `index.css`.

**Current structure:**
```
app/styles/
├── index.css       # Main entry point, imports all styles
├── fonts.css       # Font family definitions
├── tokens.css      # Design tokens (spacing, radii, etc.)
├── colors.css      # Color system with light/dark themes
└── globals.css     # Global styles and resets
```

**Future additions** as the system grows:
- `animations.css` - Animation utilities and keyframes
- `typography.css` - Text styles and scales
- `layouts.css` - Reusable layout patterns
- `utilities.css` - Custom utility classes

**`index.css`** serves as the central import hub, maintaining order of precedence.

This modular approach provides:
- Easy maintenance of specific concerns
- Clear separation of design tokens
- Scalability as new style categories are needed
- Simple addition of new files without refactoring

### Design Tokens

**`tokens.css`** contains CSS custom properties for design tokens:
- Border radius values
- Spacing scales (if needed beyond Tailwind)
- Other design primitives

**`fonts.css`** defines:
- Font family variables
- Font loading configuration
- Typography scales

### Color System

**`colors.css`** implements a semantic color system using CSS variables:

```css
@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.145 0 0);
  /* ... other color tokens */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark theme colors */
}
```

**Benefits:**
- Semantic naming (background, foreground, primary)
- Single source of truth for colors
- Theme-aware using CSS variables
- OKLCH color space for better perceptual uniformity

## Dark Mode Implementation

### Architecture

Dark mode uses a **hybrid approach** with two cookies:

1. **`theme` cookie**: User's explicit preference (light/dark) or absent when "system" is selected
2. **`system-theme` cookie**: Actual OS theme preference (always present, always tracks system)

### Files

**Theme utilities:**
- [`theme.server.ts`](../app/lib/utils/theme.server.ts) - Server-side theme utilities
- [`theme-script.tsx`](../app/lib/utils/theme-script.tsx) - Client-side theme detection script
- [`set-theme.tsx`](../app/routes/resources/set-theme.tsx) - Resource route to set theme preference
- [`theme-toggle.tsx`](../app/components/theme-toggle.tsx) - UI component for toggling themes

### How It Works

1. **Initial Load:**
   - `ThemeScript` runs before render to detect system preference
   - Sets `system-theme` cookie based on OS setting
   - Server reads both cookies in loader
   - Applies correct theme class to `<html>` element

2. **Theme Selection:**
   - User clicks toggle: Light → Dark → System → Light
   - Submits to `/resources/set-theme` action
   - Sets/clears `theme` cookie accordingly
   - Redirects back with new cookie

3. **System Theme Changes:**
   - `matchMedia` listener detects OS theme changes
   - Updates `system-theme` cookie
   - Reloads page (only when in "system" mode)
   - No useEffect needed - pure JavaScript in script tag

### Theme Resolution Priority

```typescript
const theme = userPreference || systemTheme || 'light'
```

1. Use explicit user preference if set
2. Fall back to system preference
3. Default to light theme

## shadcn/ui Integration

### Component Installation

Components are installed via MCP (Model Context Protocol) server:

```bash
# Using the shadcn MCP server
npx shadcn@latest add button
```

### Component Structure

```
app/components/ui/
├── button.tsx
├── dropdown-menu.tsx
└── [other-components].tsx
```

**Characteristics:**
- Headless and accessible (Radix UI primitives)
- Styled with Tailwind utilities
- Use design tokens from `colors.css`
- Fully customizable

### Customization

Components use CSS variables for theming:

```tsx
<Button className="bg-primary text-primary-foreground">
  Click me
</Button>
```

These classes map to CSS variables that change with theme, automatically adapting to light/dark mode.

## Tailwind CSS v4

### Configuration

Tailwind v4 requires **no config file**. Configuration is done via CSS:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));
```

### Custom Utilities

Add custom utilities in any CSS file:

```css
@layer utilities {
  .custom-utility {
    /* styles */
  }
}
```

## Scalability Patterns

### Component Composition

Build complex components from primitives. shadcn components are designed to be composed together to create higher-level UI patterns.

### Design Token Expansion

As the system grows, add tokens to `tokens.css`:

```css
:root {
  /* Spacing scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;

  /* Typography scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
```

### Theme Variants

The cookie-based theme system can be extended to support additional theme modes beyond light/dark/system.

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com) - Primitive components
- [OKLCH Color Picker](https://oklch.com) - For selecting colors

## Future Enhancements

- Component Storybook/documentation
- Animation system with Framer Motion
- Form patterns and validation
- Data visualization components
- Print styles
- Accessibility testing automation
