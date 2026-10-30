# Design system

This site uses a quiet, systems-oriented visual identity: cool surfaces, dark blue-green text, and a mineral-teal accent.

The interface should feel clear and considered, with color reserved for emphasis and interactive states.

## Color

Use the semantic CSS variables in `app/globals.css` through Tailwind classes such as `bg-background`, `text-foreground`, `bg-card`, and `text-muted-foreground`.

Avoid adding one-off color utilities such as `text-emerald-600` or `bg-slate-900` to page components.

| Role           | Light     | Dark      |
| -------------- | --------- | --------- |
| Background     | `#F3F7F6` | `#10191D` |
| Foreground     | `#172729` | `#E8F0EF` |
| Card surface   | `#FFFFFF` | `#172328` |
| Primary accent | `#087E78` | `#5BC4B7` |
| Muted text     | `#607477` | `#A0B2B1` |
| Border         | `#D6E1DF` | `#2B3A3D` |

Use `primary` for important actions and small identity cues.

Use `accent` for selected navigation, subtle highlights, and icon backplates.

Use `muted` for secondary surfaces and supporting information.

Both themes should use the same semantic roles, with their values defined in the root theme and `.dark` theme blocks.

The work experience timeline uses three additional theme-aware accents to distinguish its tabs and timeline cards:

| Experience area       | Light     | Dark      |
| --------------------- | --------- | --------- |
| Software engineering  | `#087E78` | `#5BC4B7` |
| Teaching and academia | `#4D59A8` | `#B1B8FF` |
| Campus and community  | `#A14A2A` | `#FFAD8A` |

Keep each category's accent consistent across its tab indicator, timeline nodes, and card edge.

## Typography

Figtree is the default reading and heading face, loaded through `next/font`.

Geist Mono is reserved for compact metadata, dates, technical labels, and eyebrow text.

Use sentence case for headings and controls.

Use `font-mono text-xs tracking-[0.16em] uppercase` for short section labels, not for long copy.

## Layout and surfaces

Use centered content containers with a maximum width near `72rem`.

Use responsive horizontal padding, typically `px-5 sm:px-8`.

Use `rounded-2xl` for larger cards and image frames, and `rounded-full` for pills and buttons.

Cards should use the shared `Card` and `CardContent` components from `components/ui/card.tsx` when their structure fits.

Use the shared `Button` component from `components/ui/button.tsx` for primary, secondary, outline, and icon actions.

Use shadcn components for common interactive patterns instead of creating parallel custom controls.

Add new primitives with `bunx shadcn add <component>` and adapt their imports or styles to the existing tokens only when needed.

The shared component set currently includes Alert, Alert Dialog, Button, Dialog, Dropdown Menu, Pagination, Select, Tabs, Tooltip, and Sonner.

Keep component styling aligned with the semantic color tokens and rounded shape conventions in this guide.

Prefer thin semantic borders and subtle shadows over gradients and layered decoration.

## Interaction and accessibility

Use semantic theme classes for hover and focus states, including visible keyboard focus.

Keep hover motion restrained and respect reduced-motion preferences.

Prefer plain CSS keyframes and small, native-API helpers over animation libraries, and wrap looping motion in `prefers-reduced-motion: no-preference`.
Avoid CSS scroll snap for gentle nudges, because browsers hold the wheel near snap points.
Use a debounced snap instead.

Use accessible names for icon-only controls and meaningful alt text for content images.

Keep text contrast strong in both light and dark themes.

## Page structure

Use a small mono eyebrow to identify the page context, followed by one clear page heading.

Keep the homepage portrait as the primary visual signature, framed by a restrained accent surface.

Use the same page spacing, type hierarchy, and card treatment across routes.

The header keeps all navigation links visible instead of using a menu, and wraps them to a second row on small screens.

The footer repeats the navigation as quick links, adds social links, and ends with the copyright and a back-to-top link.

Footer headings use the mono eyebrow style in the primary color.
