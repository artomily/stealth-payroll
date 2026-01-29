# Stealth Payroll Design System

## Overview

Morpho-inspired design system with a green color palette emphasizing privacy, trust, and professionalism. This is a hackathon MVP with a clean, data-focused DeFi dashboard aesthetic.

---

## Design Philosophy

- **Clean financial interface** — minimalist, professional, no gimmicks
- **Data primacy** — numbers and status are always clear and prominent
- **Professional restraint** — subtle animations, calm interactions
- **Privacy-first** — visual cues emphasize encryption and security
- **Trust through simplicity** — minimal chrome, maximum content

---

## Color Palette

### Primary Colors
- **Primary Green**: `hsl(142 76% 36%)` / `#22c55e`
  - Use for: Primary buttons, success states, active indicators, highlights
- **Primary Dark**: `hsl(142 76% 26%)`
  - Use for: Hover states on green buttons

### Neutrals
- **Background**: `hsl(222 47% 4%)` — Deep dark
- **Card Background**: `hsl(222 47% 8%)` — Slightly lighter than background
- **Foreground**: `hsl(210 40% 98%)` — Near white text
- **Muted**: `hsl(217 33% 17%)` — Subtle gray for cards/inputs
- **Muted Foreground**: `hsl(215 20% 65%)` — Secondary text

### Borders
- **Border**: `hsl(217 33% 17%)` — Subtle, barely visible borders
- All borders use 50% opacity by default for extra subtlety

### Semantic Colors
- **Destructive**: Red for errors/warnings (existing)
- **Success**: Use primary green

---

## Typography

### Hierarchy

```css
/* Page Titles */
h1: text-3xl font-bold tracking-tight

/* Section Titles */
h2: text-lg font-semibold

/* Card Titles */
h3: text-sm font-medium

/* Body Text */
body: text-sm text-muted-foreground

/* Labels */
label: text-sm font-medium

/* Small/Meta Text */
small: text-xs text-muted-foreground

/* Numbers/Data */
data: text-2xl font-bold tabular-nums
```

### Font Features
- Use `tracking-tight` for headlines
- Use `tabular-nums` for numerical data
- Use `font-mono` for technical data (wallet addresses, keys)

---

## Components

### Buttons

#### Primary (Green)
```tsx
<Button className="bg-primary hover:bg-primary/90">
  Action
</Button>
```

#### Secondary (Outline)
```tsx
<Button variant="outline">
  Cancel
</Button>
```

#### Ghost (Minimal)
```tsx
<Button variant="ghost">
  View Details
</Button>
```

### Cards

#### Standard Card
```tsx
<Card className="border-border/50 bg-card/50">
  <CardHeader>
    <CardTitle className="text-lg">Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

#### Highlighted Card (Important Info)
```tsx
<Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
  {/* Content */}
</Card>
```

#### Privacy Notice Card
```tsx
<div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
  <p className="text-sm flex items-center gap-2">
    <Shield className="w-4 h-4 text-primary" />
    Privacy message here
  </p>
</div>
```

### Status Badges

```tsx
{/* Success/Sent */}
<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
  <CheckCircle2 className="w-3 h-3" />
  Sent
</div>

{/* Encrypted State */}
<span className="flex items-center gap-1 text-primary text-xs">
  <Lock className="w-3 h-3" />
  End-to-end encrypted
</span>
```

### Input Fields

```tsx
<div className="space-y-2">
  <Label htmlFor="input" className="text-sm font-medium">
    Label
    <span className="text-xs text-muted-foreground ml-2">(optional hint)</span>
  </Label>
  <Input
    id="input"
    className="bg-background"
    placeholder="Placeholder..."
  />
  <p className="text-xs text-primary flex items-center gap-1">
    <Lock className="w-3 h-3" />
    Privacy notice
  </p>
</div>
```

---

## Spacing System

### Vertical Stacking
- Between major sections: `space-y-6`
- Between form fields: `space-y-4`
- Between card elements: `space-y-3`
- Within small groups: `space-y-2`

### Horizontal Spacing
- Flex layouts: `gap-4`
- Button groups: `gap-3`
- Icon + text: `gap-2`

### Padding
- Card padding: `p-6` or `py-5`
- Section padding: `p-8`
- Input padding: Built into components

---

## Privacy-First Visual Language

### Icons to Use Liberally
- `<Lock />` — Encryption
- `<Shield />` — Security
- `<Eye />` / `<EyeOff />` — Visibility controls
- `<Key />` — Cryptographic keys
- `<CheckCircle2 />` — Success states

### Copy Patterns

**Privacy-Focused Labels:**
- "End-to-end encrypted"
- "Only you can decrypt this"
- "Encrypted on-chain"
- "Zero-knowledge payroll"
- "Private by design"

**Form Help Text:**
- "Used to encrypt salary details"
- "Share this with your employer for encrypted payroll"
- "Decrypt with your wallet"

**Status Messages:**
- "🔒 This payroll is encrypted"
- "✓ Successfully decrypted with your private key"
- "The amount and details will be encrypted using the employee's public key"

---

## Animation Guidelines

### Subtle Animations Only
- Card hover: `hover:border-primary/20 transition-colors`
- Button hover: `hover:bg-primary/90`
- Icon button hover: `hover:bg-muted`
- Link hover: `hover:text-foreground`

### No Flashy Animations
- Avoid complex animations
- No spinning gradients
- No pulsing elements (except loading states)
- Keep transitions under 300ms

---

## Page Layouts

### Employer Dashboard

```
┌─────────────────────────────────────┐
│ Header (Logo + Wallet)              │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Page Title + Description            │
│ [+ Create New Payroll] (Green btn)  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Create Form Card (if active)        │
│ - Employee wallet                   │
│ - Public key (with privacy note)    │
│ - Amount (large, bold)              │
│ - Currency + Period                 │
│ - Notes                             │
│ - Privacy notice card               │
│ - [Cancel] [Send Encrypted ➜]      │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Payroll History                     │
│ - List of sent payroll cards        │
│ - Status badges                     │
│ - Privacy indicators                │
└─────────────────────────────────────┘
```

### Employee Dashboard

```
┌─────────────────────────────────────┐
│ Header (Logo + Wallet)              │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Page Title + Description            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Public Key Card (Green highlight)   │
│ 🔑 Your Public Key                  │
│ [Copy button]                       │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Salary Slips Section                │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Encrypted Slip Card                 │
│ 🔒 Status + Date                    │
│ [Decrypt with Wallet]               │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Decrypted Slip Card                 │
│ ✓ Status + Date                     │
│ Amount: 5,000 USDC (big, bold)      │
│ Period, Notes                       │
│ ✓ Successfully decrypted            │
└─────────────────────────────────────┘
```

---

## Implementation Checklist

### ✅ Completed
- [x] CSS variables updated with green palette
- [x] Employer dashboard redesigned
- [x] Employee dashboard redesigned
- [x] Landing page updated with green theme
- [x] Dashboard page updated with green theme
- [x] Privacy-focused copy implemented
- [x] Status badges and indicators
- [x] Card layouts with proper spacing

### Essential Components Used
- [x] Button (primary, outline, ghost)
- [x] Card (with header)
- [x] Input, Label
- [x] Badge/Status indicators
- [x] Toast notifications (Sonner)

### Skipped for MVP
- [ ] Complex charts
- [ ] Accordion/Carousel
- [ ] Sidebar navigation
- [ ] Breadcrumbs
- [ ] Complex dropdown menus

---

## Design Inspiration

**Morpho.org Characteristics Emulated:**
- Calm, serious financial product feel
- Card-based layout with subtle shadows
- Clear typography hierarchy
- Soft borders (barely visible)
- Plenty of whitespace
- Data-focused, not decorative
- Professional restraint

**Our Differentiation:**
- Green as primary color (Morpho uses blue)
- Privacy-first messaging throughout
- Encryption/security visual language
- On-chain/crypto context

---

## Quick Reference

### Most Common Classes

```css
/* Cards */
border-border/50
bg-card/50
hover:border-primary/20

/* Buttons */
bg-primary hover:bg-primary/90

/* Text */
text-foreground
text-muted-foreground
text-primary

/* Spacing */
space-y-6 (sections)
gap-4 (flex)
p-6 (cards)

/* Privacy Indicators */
text-primary
border-primary/20
bg-primary/10
```

---

## Demo & Hackathon Notes

This design system is optimized for:
- Solo developer speed
- Clear demo presentation
- Privacy narrative communication
- Solana hackathon context

**Not optimized for:**
- Pixel-perfect design
- Marketing pages
- Complex enterprise features
- Mobile-first responsive (works, but desktop-optimized)

The goal: **Ship fast, look professional, communicate privacy.**
