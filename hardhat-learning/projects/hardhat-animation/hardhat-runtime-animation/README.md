# Hardhat Runtime Animation

An interactive technical documentary that follows a real Counter contract through an editor, Hardhat's build pipeline, compiler output manufacturing, local deployment, EVM execution, Sepolia networking, an explorer, and source verification. Each chapter has its own cinematic environment rather than sharing a permanent architecture board.

This is a frontend visualization. It does not run Solidity, create a real blockchain, send transactions, or require private keys.

## Technology stack

- React 19 for the component interface
- TypeScript for typed scenes, blockchain state, and animation contracts
- Vite for development and production builds
- GSAP and MotionPathPlugin for the coordinated master timeline and packet movement
- Lucide React for lightweight interface icons
- SVG for chapter-specific transfer routes
- CSS for cinematic sets, editor/terminal scenery, and responsive layout

## Requirements

- Node.js 20.19+ or 22.12+
- npm 10+

## Installation

```bash
git clone <repository>
cd hardhat-runtime-animation
npm install
npm run dev
```

Open the local URL printed by Vite.

## Commands

```bash
npm run dev       # Start the development server
npm run build     # Type-check and create the production bundle
npm run lint      # Run ESLint
npm run preview   # Preview the production bundle
```

## Project architecture

```text
src/
├── animation/            GSAP timeline, selectors, paths, scene registry
├── components/
│   ├── controls/         Playback, scene and network controls
│   ├── education/        Explanation and component inspector
│   ├── ethereum/         Nodes, packets, blocks, EVM, contracts and storage
│   ├── hardhat/          Hardhat, config, compiler and artifact views
│   ├── layout/           Header and complete animation stage
│   └── project/          Project explorer, code and terminal views
├── data/                 Scene content and inspector explanations
├── hooks/                React integration for the master timeline
├── types/                Animation, blockchain and scene types
├── App.tsx               Application composition and UI state
├── App.css               Visualization and responsive presentation
└── main.tsx              React entry point
reference-hardhat/        Real Hardhat 3.15.0 + Ethers reference project
```

## Animation architecture

`createHardhatTimeline.ts` creates one paused GSAP timeline. Its cinematic chapters are registered as named labels from `write-contract` through `final-recap`. Every composition remains mounted as a film set, while GSAP controls camera zoom/pan, blur transitions, type reveals, staggered manufacturing steps, active processing, and chapter-specific MotionPath transfers.

`useHardhatAnimation.ts` owns the timeline instance. Play and pause call the timeline directly. Previous, Next, and scene buttons seek to registered GSAP labels. Restart calls `timeline.restart()`. Timeline callbacks update the displayed explanation and network view.

Playback speed is adjustable from 0.5× to 2×. Inspect actions pause the timeline before opening the detail drawer.

## Real Hardhat trace

`reference-hardhat/` was initialized with Hardhat's official TypeScript + Mocha + Ethers template. It contains the real Counter contract, Ignition module, interaction script, config, tests, artifacts, build information, and local Ignition deployment record used by the animation.

Observed facts are sanitized and replayed from `src/data/traces/hardhatTrace.ts`, including Hardhat 3.15.0, solc 0.8.34, Osaka EVM target, generated paths, ABI, selectors, bytecode, local RPC method, Block #1 receipt, 105,339 deployment gas, Block #2 increment, and `eth_call` read.

```bash
cd reference-hardhat
npm install
npx hardhat build
npx hardhat test
npx hardhat node
```

## Scene system

Scene definitions live in `src/data/scenes.ts`. Each scene supplies:

- a stable GSAP label (`id`)
- navigator label and educational copy
- input, process, and output descriptions
- the component to activate
- packet type
- local or Sepolia network context

### Add a scene

1. Add a typed entry to `src/data/scenes.ts` in the desired order.
2. Use a unique `id`; it automatically becomes the GSAP label.
3. Add or select the matching cinematic composition in `AnimationStage.tsx`.
4. Set the packet label and network.
5. Add inspector content to `src/data/explanations.ts` if introducing an inspectable output.

The master timeline and navigator derive their order directly from this registry.

### Add an animated packet

1. Add the packet label to `PacketKind` in `src/types/animation.ts` if needed.
2. Set that label on the relevant scene.
3. Give the chapter a scene-specific SVG route.
4. The master timeline moves that chapter's physical packet with MotionPathPlugin.

## Educational guarantees

The simulator explicitly preserves these boundaries: Hardhat is not Ethereum or the EVM; source is not a deployed contract; ABI is not bytecode; RPC providers are not blockchains; `eth_call` is not a transaction; and a local development chain is not Sepolia.
