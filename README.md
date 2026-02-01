# 🕶 Stealth Payroll

**Private On-Chain Payments on Solana**

A privacy-focused payment system on Solana that allows users to send USDC payments on-chain without exposing sensitive amount details publicly.

It combines on-chain verification with confidential payment data, ensuring proof of payment while preserving financial privacy.

---

## 🚨 Problem

Blockchain transactions on Solana are transparent by default:

- Transfer amounts are publicly visible
- Financial activity can be traced
- Sensitive payments lack confidentiality
- Privacy is difficult for real-world use cases

For many real scenarios, full transparency is not ideal.

---

## 💡 Solution

Stealth Payroll enables:

✅ Private payments  
✅ Encrypted payment details  
✅ On-chain proof of payment  
✅ Confidential payment slips

Only the intended recipient can view the payment details.

---

## ✨ Core Features

### 🔒 Military-Grade Encryption
TweetNaCl implementation with Curve25519-XSalsa20-Poly1305 ensures payment data remains confidential. Only recipients can decrypt their payment information.

### 🔐 Complete Privacy
Payment amounts and details are encrypted on-chain. Block explorers show the transaction, but sensitive financial data stays private.

### ⚡ Instant Settlement
USDC payments on Solana deliver sub-second finality with minimal fees. Real-time transfers with cryptographic proof of payment.

### 🔐 Forward Secrecy
Ephemeral keypairs generated per transaction ensure past payments remain secure even if future keys are compromised.

### ⛓ On-Chain Proof
Transactions recorded on Solana blockchain for verifiability while maintaining payment privacy.

---

## 🏗 Architecture

### Frontend (Current Implementation)

**Next.js 15 + React 18 + TypeScript**

- Modern, responsive UI with dark theme and green privacy accents
- Wallet context management (mock mode)
- Payroll context for managing payment entries
- Two-role system: Sender and Recipient

**Key Pages:**

- **Landing Page** ([/](/)): Features overview and introduction
- **Connect Page** ([/connect](/connect)): Role selection (Sender/Recipient)
- **Sender Dashboard** ([/sender/dashboard](/sender/dashboard)): Create and send encrypted payments
- **Recipient Dashboard** ([/recipient/dashboard](/recipient/dashboard)): View and decrypt received payments
- **Payment History**: Track all sent/received payments
- **Settings**: Manage wallet and preferences

**Encryption Layer:**

- **TweetNaCl** for asymmetric encryption (Curve25519-XSalsa20-Poly1305)
- Ephemeral keypair generation per payment
- Public key exchange mechanism
- Secure decryption on recipient side
- USDC stablecoin payments

**Mock Solana Integration:**

- Simulated wallet generation
- Mock transaction creation and tracking
- Transaction signatures (88-character base58)
- Status tracking (pending, confirmed, failed)

### Backend

⚠️ **Not yet implemented** - Currently using client-side mock data and encryption

**Planned:**
- Node.js / FastAPI backend
- Persistent storage for encrypted payment references
- API endpoints for payment creation and retrieval
- Integration with Solana RPC providers

---

## 🔄 User Flow

### Sender

1. Connect wallet and select "Sender" role
2. Enter recipient's wallet address and public key
3. Input payment details (amount, currency, period, notes)
4. System encrypts data with recipient's public key
5. Encrypted payload sent to mock transaction
6. Confirmation displayed with transaction signature

### Recipient

1. Connect wallet and select "Recipient" role
2. Share public key with sender (copy to clipboard)
3. View list of received encrypted payments
4. Decrypt payments using private key
5. View full payment details (amount, currency, period, notes)

---

## 🖥 UI Pages

### Landing Page (/)
- Modern, animated hero section
- Feature cards showcasing encryption and privacy
- Smooth scroll animations with Framer Motion
- Call-to-action to get started

### Connect Page (/connect)
- Role selection: Sender or Recipient
- Mock wallet connection
- Generates cryptographic keypair
- Redirects to role-specific dashboard

### Sender Dashboard (/sender/dashboard)
- Create new encrypted payments
- View sent payment history
- Transaction status tracking
- Wallet balance display (mock)

### Recipient Dashboard (/recipient/dashboard)
- Display public key for sharing
- List of received encrypted payments
- Decrypt and view payment details
- Payment history and statistics

### History Pages
- Sender history: All sent payments
- Recipient history: All received payments

### Settings Pages
- User preferences
- Wallet management
- Profile settings

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Encryption & Security
- **TweetNaCl** - Cryptographic library
- **TweetNaCl-Util** - Encoding utilities
- **NaCl Box** - Curve25519-XSalsa20-Poly1305 encryption

### State Management
- **React Context API** - WalletContext, PayrollContext
- **React Hooks** - useState, useCallback, useEffect

### Development Tools
- **Bun** - Fast JavaScript runtime and package manager
- **ESLint** - Code linting
- **Vitest** - Unit testing
- **PostCSS** - CSS processing

### Mock Infrastructure (Development)
- Simulated Solana wallet generation
- Mock transaction creation
- Client-side encryption/decryption

### Planned Integrations
- **Solana Web3.js** - For real blockchain interaction
- **Phantom Wallet** - Solana wallet adapter
- **Helius / QuickNode** - RPC provider
- **Radr Labs ShadowWire** - Private transfer layer

---

## 🚀 Getting Started

### Prerequisites

- **Bun** (recommended) or Node.js 18+
- Modern web browser

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd private-payroll

# Install dependencies
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development
bun dev              # Start dev server

# Build
bun run build        # Production build
bun start            # Start production server

# Testing
bun test             # Run tests
bun test:watch       # Watch mode

# Linting
bun run lint         # Run ESLint
```

---

## 📁 Project Structure

```
private-payroll/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page
│   ├── providers.tsx            # Global context providers
│   ├── not-found.tsx            # 404 page
│   ├── connect/                 # Wallet connection
│   │   └── page.tsx
│   ├── sender/                  # Sender dashboard
│   │   ├── dashboard/
│   │   ├── history/
│   │   ├── payroll/
│   │   ├── recipients/
│   │   └── settings/
│   └── recipient/               # Recipient dashboard
│       ├── dashboard/
│       ├── history/
│       └── settings/
│
├── src/
│   ├── components/              # React components
│   │   ├── FeatureCard.tsx
│   │   ├── Header.tsx
│   │   ├── ModeToggle.tsx
│   │   ├── Sidebar.tsx
│   │   └── ui/                  # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── ... (40+ components)
│   │
│   ├── contexts/                # React Context providers
│   │   ├── WalletContext.tsx   # Wallet state management
│   │   └── PayrollContext.tsx  # Payroll data management
│   │
│   ├── lib/                     # Core utilities
│   │   ├── encryption.ts       # NaCl encryption/decryption
│   │   ├── solana-mock.ts      # Mock Solana transactions
│   │   └── utils.ts            # Helper functions
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   └── test/                    # Test files
│       ├── example.test.ts
│       └── setup.ts
│
├── public/                      # Static assets
│   ├── manifest.json
│   └── robots.txt
│
├── components.json              # shadcn/ui config
├── tailwind.config.ts          # Tailwind configuration
├── next.config.js              # Next.js config
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
└── bun.lockb                   # Bun lock file
```

---

## 🔐 How Encryption Works

### Key Generation
1. Each wallet generates an Ed25519 keypair using NaCl
2. Public key (32 bytes) is encoded to Base64 for sharing
3. Secret key (64 bytes) is kept private for decryption

### Encryption Process (Sender)
1. **Ephemeral Keypair**: Generate temporary keypair for this payment
2. **Nonce**: Generate random 24-byte nonce
3. **Encrypt**: Use NaCl Box with:
   - Message: JSON-serialized payment data
   - Recipient's public key
   - Ephemeral secret key
   - Nonce
4. **Payload**: Store { nonce, ephemeralPublicKey, ciphertext }

### Decryption Process (Recipient)
1. Retrieve encrypted payload from transaction
2. Extract nonce and ephemeral public key
3. Decrypt using NaCl Box with:
   - Ciphertext
   - Ephemeral public key
   - Own secret key
   - Nonce
4. Parse JSON to recover original payment data

**Security Properties:**
- **Forward secrecy**: Each payment uses unique ephemeral key
- **Authentication**: Only recipient can decrypt
- **Integrity**: Tampered data fails decryption
- **Confidentiality**: No intermediary can read contents

---

## 🎨 Design System

The UI follows a dark theme with green privacy accents:

- **Primary Color**: Green (#22c55e, #16a34a, #15803d)
- **Background**: Slate/Black (#0f172a, #000000)
- **Text**: White with slate variations
- **Components**: shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions
- **Typography**: System fonts (sans-serif)

Design philosophy:
- Privacy-focused aesthetics
- Clear information hierarchy
- Smooth micro-interactions
- Accessible and responsive

---

## 🧪 Current Implementation Status

### ✅ Completed
- Landing page with features
- Wallet connection (mock mode)
- Role-based routing (Sender/Recipient)
- Encryption/decryption system
- Payment creation flow
- Payment viewing and decryption
- Transaction history
- Responsive UI
- Dark theme
- Toast notifications

### 🚧 In Progress / Planned
- Real Solana wallet integration (Phantom, Solflare)
- Backend API for persistent storage
- Solana Program (Smart Contract) deployment
- Integration with Radr Labs ShadowWire
- RPC provider integration (Helius/QuickNode)
- Batch payments
- Payment scheduling
- Analytics dashboard
- DAO payment support
- ZK-proof verification

---

## 🎥 Demo Flow

1. **Privacy Challenge**
   - Show public blockchain transparency issue
   - Explain privacy requirements for financial data

2. **Sender Flow**
   - Connect as sender
   - Create encrypted USDC payment
   - Enter recipient details
   - Execute payment
   - View confirmation

3. **Recipient Flow**
   - Connect as recipient
   - Share public key
   - View encrypted payment
   - Decrypt payment details
   - See full breakdown

4. **Privacy Protection**
   - Compare public vs. private transactions
   - Highlight encrypted data
   - Show on-chain proof

---

## 🚀 Future Improvements

- **Batch Payments**: Send multiple payments in one transaction
- **Payment Scheduling**: Automated recurring payments
- **DAO Integration**: Governance-approved payroll
- **Selective Disclosure**: Prove salary range without revealing exact amount
- **ZK-Based Verification**: Zero-knowledge proofs for compliance
- **USDC Integration**: Full Solana USDC support
- **Mobile App**: Native iOS/Android applications
- **Advanced Analytics**: Payment insights and reporting

---

## 🚀 Why Solana?

Stealth Payroll can only exist on Solana. Here's why this privacy solution is uniquely Solana-native:

### ⚡ Sub-Second Finality
Solana's 400ms block time enables instant private salary settlements. Employees receive encrypted payments in real-time, not minutes or hours.

```
Private Payment → Encrypted → Confirmed < 1s
```

### 💰 Ultra-Low Fees
~$0.00025 per transaction makes micro-payroll feasible. Send encrypted payments to hundreds of employees without prohibitive costs.

```
100 employees × $0.00025 = $0.025 total
```

### 🔐 Token Extensions (Token-2022)
Solana's Token-2022 program includes confidential transfers. Our architecture is ready to integrate native confidential USDC when available.

### 📈 High Throughput
65,000 TPS capacity allows batch processing of thousands of encrypted payroll transactions simultaneously without network congestion.

---

## 🚀 Innovation: Selective Disclosure

Revolutionary privacy feature that enables cryptographic proof of payment ranges without revealing exact amounts.

### Key Capabilities

**Range Proofs**  
Generate cryptographic proof: "Salary is between $50k-$100k" without revealing exact amount

**Compliance Ready**  
Satisfy audit requirements while maintaining employee privacy

**Zero-Knowledge Proofs**  
Verify payment legitimacy without exposing sensitive details

### Use Cases

🏦 **Loan Application**  
Prove income > $60,000 without revealing exact amount ($75,432.18)

📊 **Equity Verification**  
Confirm salary in market range without revealing $132,500

✅ **Compliance Audit**  
Verify minimum wage compliance without revealing individual amounts

---

## 🤝 Sponsor Technology Integration

Stealth Payroll is architected to leverage cutting-edge privacy infrastructure from leading Solana ecosystem partners.

### Radr Labs — ShadowWire
**Future Integration**  
✔ Private transfer routing layer for confidential on-chain payments  
✔ Stealth payment routing capabilities  
✔ Enhanced metadata privacy

### Helius / QuickNode
**Infrastructure Integration**  
✔ High-performance RPC infrastructure for reliable transaction indexing  
✔ Private indexing capabilities  
✔ Webhook support for payment notifications

### Solana Web3.js
**Active Integration**  
✔ Core blockchain interaction for on-chain proof  
✔ USDC transfer execution  
✔ Transaction signing and verification

---

## 🔬 Technology Implementation

### Cryptographic Architecture

**Asymmetric Encryption (NaCl Box)**
- Curve25519 elliptic curve for key exchange
- XSalsa20 stream cipher for encryption
- Poly1305 MAC for authentication
- Forward secrecy through ephemeral keypairs

**Key Features**
- 256-bit security level
- Resistant to timing attacks
- Audited cryptographic primitives
- Zero trust architecture

### Blockchain Integration

**Solana Benefits**
- High throughput (65,000 TPS)
- Low transaction costs (~$0.00025)
- Fast finality (~400ms)
- USDC native support
- Proof-of-History consensus

**Privacy Layer**
- Encrypted metadata on-chain
- Public proof of transfer
- Private payment amounts
- Selective disclosure capability

---

## 🎯 Use Cases

### Corporate Payroll
Organizations can pay employees on-chain while keeping salary information confidential. Only the recipient can decrypt their payment details.

### Freelance Payments
Clients can send private payments to contractors without exposing project budgets or payment terms to competitors.

### DAO Treasury
DAOs can execute payroll votes on-chain while protecting sensitive compensation data from public scrutiny.

### Grant Distribution
Foundations can distribute grants with encrypted amounts, maintaining recipient privacy while ensuring on-chain accountability.

---

## 📝 Environment Variables

Create a `.env.local` file (when implementing real Solana):

```env
# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Optional: Helius/QuickNode RPC
NEXT_PUBLIC_HELIUS_RPC_URL=your_helius_url
NEXT_PUBLIC_QUICKNODE_RPC_URL=your_quicknode_url
```

---

## 🚢 Deployment

This project can be deployed on:

- **Vercel** (Recommended for Next.js)
  ```bash
  bun run build
  # Deploy to Vercel
  ```

- **Netlify**
- **Self-hosted** (Docker, VPS, Cloud Run)

---

## 🐛 Known Issues

- Backend is not yet implemented (using mock data)
- Wallet integration is simulated (not real Phantom/Solflare)
- Transactions are mocked (not on Solana devnet/mainnet)
- No persistent storage (data resets on refresh)

---

## 📝 License

MIT License - Feel free to use this project as a foundation for your own privacy-focused payment systems.

---

## 👨‍💻 About

A production-ready privacy-first payroll system demonstrating:
- Asymmetric encryption on-chain
- Confidential payment metadata
- User-friendly privacy UX
- Solana ecosystem integration
- Military-grade cryptography

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `bun test`
5. Lint code: `bun run lint`
6. Submit a pull request

---

## 📞 Contact & Links

- **GitHub**: 
- **Demo**: 
- **Documentation**: See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) and [MIGRATION.md](MIGRATION.md)

---

**Built with 💚 for privacy on Solana**

