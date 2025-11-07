# Hero Section Implementation

## Overview
This project recreates the hero section from 3dimli.com using Next.js, Tailwind CSS, Framer Motion, GSAP, and TypeScript.

## Features
- ✅ **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- ✅ **Smooth Animations**: Combined Framer Motion and GSAP for performant animations
- ✅ **Accessibility**: ARIA labels, semantic HTML, keyboard navigation support
- ✅ **Performance Optimized**: GPU-accelerated transforms, optimized animations
- ✅ **TypeScript**: Fully typed for type safety
- ✅ **Clean Code**: Well-commented with explanations of key design decisions

## Component Structure

### `src/components/Hero.tsx`
Main hero section component featuring:
- Large headline with gradient text effect
- Subheading text
- Primary and secondary CTA buttons
- Animated background particles
- Scroll indicator
- Smooth entrance animations

## Animation Strategy

### Framer Motion
- Used for component-level animations (headings, buttons, text)
- Staggered children animations for polished entrance
- Interactive hover and tap states for buttons

### GSAP
- Used for background fade-in effects
- Floating particle animations for visual interest
- More performant for complex background animations

## Customization

To match the exact 3dimli.com design, you may need to adjust:

1. **Colors**: Update Tailwind classes in `Hero.tsx` to match exact brand colors
2. **Typography**: Adjust font sizes, weights, and spacing
3. **Layout**: Modify spacing, padding, and positioning
4. **Animations**: Tweak animation timings and easing functions
5. **Content**: Update text content to match exactly

## Running the Project

```bash
cd app
npm install
npm run dev
```

Visit `http://localhost:3000` to see the hero section.

## Building for Production

```bash
npm run build
npm start
```

## Key Files

- `src/components/Hero.tsx` - Main hero component
- `src/app/page.tsx` - Home page using the Hero component
- `src/app/globals.css` - Global styles and Tailwind imports
- `src/app/layout.tsx` - Root layout with metadata

