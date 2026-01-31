# Private Payroll - Solana Web3 Hackathon

A privacy-first payroll dApp built for Solana blockchain using Next.js, TypeScript, and zero-knowledge proofs. Secure, encrypted payroll management with full Solana integration.

## Overview

Private Payroll is a decentralized payroll management system built on Solana that allows employers to securely send encrypted salary information to employees on-chain. Built for the Solana Web3 hackathon, key features include:

- **Asymmetric Encryption**: Salary data encrypted with employee's public key
- **Zero-Knowledge Proofs**: Obfuscated amounts - block explorers can't see payment breakdowns
- **Solana Native**: Built with SPL tokens (USDC-SPL, SOL, USDT-SPL)
- **Instant Verifiability**: Smart contracts verify payroll without revealing sensitive data
- **Phantom Wallet Integration**: Seamless connection with popular Solana wallets

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
- **Solana Web3.js** - Solana blockchain integration
- **SPL Token** - Solana token standard (USDC-SPL, SOL)
- **Phantom/Solflare** - Solana wallet integration
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Animation library
- **NaCl.js** - Zero-knowledge cryptographic functions
- **Sonner** - Toast notifications

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
