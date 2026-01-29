# Private Payroll

A private payroll application built with Next.js, TypeScript, and modern web technologies. Secure payroll management with encrypted data handling and Solana blockchain support.

## Overview

Private Payroll is a payroll management system that allows employers to securely send encrypted salary information to employees on the Solana blockchain. Key features include:

- **Asymmetric Encryption**: Salary data encrypted with employee's public key
- **Obfuscated Amounts**: Block explorers can't see payment breakdowns
- **Instant Verifiability**: Smart contracts verify payroll without revealing sensitive data
- **Flexible Payments**: Support for various tokens and custom schedules

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd private-payroll

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Start development server
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run tests
npm run test
npm run test:watch

# Run linter
npm run lint
```

## Technologies Used

- **Next.js 15+** - React framework with built-in routing
- **TypeScript** - Type-safe JavaScript
- **React 18+** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **TanStack Query** - Server state management
- **Sonner** - Toast notifications
- **Solana** - Blockchain integration
- **NaCl.js** - Cryptographic functions

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Global providers
│   ├── dashboard/         # Dashboard route
│   ├── employer/          # Employer dashboard
│   └── employee/          # Employee dashboard
├── src/
│   ├── components/        # React components
│   │   └── ui/           # shadcn/ui components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities and helpers
│   └── pages/             # Legacy page components (being migrated)
├── public/                # Static assets
├── next.config.js        # Next.js configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

## Features

### Employer Dashboard (`/employer`)
- Create and send encrypted payroll to employees
- View payroll history
- Monitor transaction status
- Access Solscan links for on-chain verification

### Employee Dashboard (`/employee`)
- View encrypted salary slips
- Decrypt payroll with private key
- Copy public key for employer
- Track payment status

### Landing Page (`/`)
- Overview of features
- Security highlights
- Pricing information
- Company information

## Development

```bash
# Watch mode for tests
npm run test:watch

# Lint code
npm run lint

# Format code (if prettier is set up)
npm run format
```

## Deployment

This project can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Self-hosted** (Docker, VPS, etc.)

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit pull requests.
