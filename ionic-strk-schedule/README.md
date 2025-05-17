# STRK Schedule

_A Web3-powered decentralized healthcare platform for diabetes management_

### Deployed contract

`0x07b46771d0012e97bd23a4eadcd3511230a0c97f827f0068cd339e7100d36df4`

## Overview

**STRK Schedule** is a Web3-powered decentralized healthcare platform designed to help individuals manage diabetes more effectively. By leveraging blockchain technology, the platform enables secure tracking of blood sugar levels, medication, activity logs, and medical appointments on-chain.

The platform empowers patients with verified medical data NFTs and community-governed reward systems that promote healthy behavior, aiming to improve care, transparency, and engagement in diabetes management.

## Screeshots

| ![Image 1](/public/assets/screenshots/ss1.png) | ![Image 2](/public/assets/screenshots/ss2.png) | ![Image 3](/public/assets/screenshots/ss3.png) |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| ![Image 4](/public/assets/screenshots/ss4.png) | ![Image 5](/public/assets/screenshots/ss5.png) | ![Image 6](/public/assets/screenshots/ss6.png) |

## Key Features

- **Secure Data Management**: Utilizes blockchain technology to ensure privacy, integrity, and protection of patient records, minimizing risks of fraud and unauthorized access.
- **Real-time Public Health Monitoring**: Provides governments with real-time insights into diabetes trends, enabling faster and more informed responses to public health challenges.
- **Efficient Healthcare Infrastructure**: Streamlines administrative tasks and healthcare workflows, improving overall efficiency and reducing operational overhead.
- **Cost Reduction**: Leverages Starknet's Layer 2 scalability to enable low-cost, high-speed transaction processing for large-scale health data.
- **Incentive-Based Health Models**: Employs DAO structures to reward patients for positive health behaviors, promoting engagement and sustained lifestyle improvements.

## Tech Stack

**Frontend:**

- React + Vite
- TypeScript
- Ionic Framework for mobile-first UI
- date-fns for date handling

**Blockchain:**

- Starknet (Layer 2 scaling solution)
- Cairo smart contracts
- starknet.js for contract interaction
- @starknet-react/core for React integration

**Storage:**

- IPFS via Pinata for decentralized storage of sensitive health data
- Starknet blockchain for immutable health records

**Authentication:**

- Wallet-based authentication (Argent X, Braavos)

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Starknet wallet (Argent X or Braavos)
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/strk-schedule.git
cd strk-schedule
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Create a `.env` file in the root directory with the following content:

```env
VITE_PUBLIC_CONTRACT_ADDRESS=0x07b46771d0012e97bd23a4eadcd3511230a0c97f827f0068cd339e7100d36df4
VITE_PUBLIC_RPC_URL=https://starknet-sepolia.public.blastapi.io
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_API_SECRET=your_pinata_api_secret
VITE_PINATA_JWT=your_pinata_jwt_token
```

Replace the Pinata credentials with your own (sign up at [pinata.cloud](https://www.pinata.cloud) if you don't have an account).

Start the development server:

```bash
ionic serve
```

Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
/src
  /components          # Reusable UI components
  /pages               # Main application pages
  /hooks               # Custom React hooks
    /contractRead.tsx  # Hooks for reading from blockchain
    /contractWrite.tsx # Hooks for writing to blockchain
  /utils               # Utility functions
  /assets              # Static assets like images
  /theme               # Styling and theme configuration
  App.tsx              # Main application component
  main.tsx             # Application entry point
```

## Smart Contract Interaction

The application interacts with Starknet smart contracts to:

- Register and authenticate users
- Store health measurements (blood sugar, HbA1c, weight)
- Track medication adherence
- Manage exercise routines
- Store health records securely

Sensitive data is stored on IPFS with only the hash references stored on-chain for privacy.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- StarkWare for the Starknet infrastructure
- Pinata for IPFS pinning services
- The Ionic team for the mobile-first UI framework
- All contributors and supporters of the project

<div align="center">
  <p>Built with ❤️ for better diabetes management through Web3 technology</p>
</div>
