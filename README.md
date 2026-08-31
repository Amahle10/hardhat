# Hardhat Learning

A practical learning repository for understanding **Hardhat, Solidity, Ethereum development, smart contract deployment, local blockchain execution, RPC communication, and testnet deployment**.

This repository contains course material and interactive projects built while learning how Hardhat works from the development environment all the way to Ethereum contract execution.

The goal is not only to memorize commands such as:

```bash
npx hardhat build
npx hardhat test
npx hardhat node
npx hardhat ignition deploy ...
```

but to understand what actually happens when those commands are executed.

---

## What This Repository Covers

The repository explores the complete Hardhat development flow:

```text
Solidity Source Code
        ↓
Hardhat
        ↓
hardhat.config.ts
        ↓
Solidity Compiler
        ↓
ABI + Bytecode
        ↓
Artifacts
        ↓
Deployment Script / Ignition Module
        ↓
ethers
        ↓
Signer
        ↓
Provider
        ↓
JSON-RPC
        ↓
Ethereum Node
        ↓
EVM Execution
        ↓
Block
        ↓
Contract Account
        ↓
Contract Address
        ↓
Contract Storage / State
```

It also compares the difference between running contracts on a **local Hardhat development network** and deploying them to the **Sepolia Ethereum testnet**.

---

## Repository Structure

```text
hardhat/
│
├── README.md
│
└── hardhat-learning/
    │
    └── projects/
        │
        ├── hardhat-course-website/
        │   │
        │   ├── pages/
        │   ├── index.html
        │   ├── script.js
        │   ├── styles.css
        │   └── styles2.css
        │
        └── hardhat-animation/
            │
            ├── public/
            ├── src/
            ├── package.json
            ├── package-lock.json
            ├── tsconfig.json
            ├── vite.config.ts
            └── README.md
```

The repository root is intentionally kept clean.

All learning applications and experiments belong inside:

```text
hardhat-learning/projects/
```

---

# Projects

## 1. Hardhat Course Website

Directory:

```text
hardhat-learning/projects/hardhat-course-website/
```

This is the main educational website containing the Hardhat course.

The website is divided into individual lessons and topics so that each topic can have its own dedicated page and sidebar navigation.

Topics include concepts such as:

```text
Hardhat introduction
Installation
Project initialization
Project directory structure
Packages and dependencies
Configuration
Compilation
Artifacts
Testing
Local Ethereum network
Deployment
Contract interaction
RPC
EVM execution
Contract addresses
Contract state
Sepolia deployment
Blockchain explorers
```

The purpose of this project is to provide the written and structured learning material.

---

## 2. Hardhat Runtime Animation

Directory:

```text
hardhat-learning/projects/hardhat-animation/
```

This project is an interactive animated visualization of how Hardhat works.

Instead of only reading about the execution process, the learner can visually watch data move through the Ethereum development environment.

The animation demonstrates:

```text
Counter.sol
    ↓
Hardhat starts
    ↓
hardhat.config.ts loads
    ↓
Solidity compiler
    ↓
ABI + Bytecode
    ↓
Artifacts
    ↓
Deployment logic
    ↓
ethers
    ↓
Signer
    ↓
Provider
    ↓
JSON-RPC
    ↓
Local Ethereum Node
    ↓
Transaction
    ↓
Block
    ↓
EVM
    ↓
Contract Account
    ↓
Contract Address
    ↓
Contract Storage
```

The animation then demonstrates a state-changing function call:

```text
counter.increment()
        ↓
ABI Encoding
        ↓
Transaction
        ↓
JSON-RPC
        ↓
Ethereum Node
        ↓
Block
        ↓
EVM
        ↓
Counter.increment()
        ↓
Storage Update

count: 0 → 1
```

It also demonstrates the transition from a local development environment to Sepolia:

```text
LOCAL DEVELOPMENT

Hardhat
   ↓
Local Ethereum Node
   ↓
EVM
   ↓
Contract State


             becomes


SEPOLIA TESTNET

Hardhat
   ↓
ethers
   ↓
Signer
   ↓
Provider
   ↓
JSON-RPC
   ↓
RPC Provider
   ↓
Ethereum Node
   ↓
Sepolia
   ↓
Validator
   ↓
Block
   ↓
EVM
   ↓
Contract State
```

---

# Hardhat Animation Technology Stack

The animation project is built with:

```text
React
TypeScript
Vite
GSAP
SVG
CSS
Lucide React
```

### React

Used to build the interactive interface and visualization components.

### TypeScript

Provides type safety and structure for the application.

### Vite

Used as the development server and frontend build system.

### GSAP

Used as the main animation engine.

GSAP timelines coordinate the different stages of the Hardhat execution flow.

### SVG

Used for architecture connections, RPC paths and moving transaction packets.

### CSS

Used for the visual design, layout, code panels, blockchain nodes, blocks and contract-state visualization.

---

# Running the Hardhat Animation

Move into the animation project:

```bash
cd hardhat-learning/projects/hardhat-animation
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display a local development URL similar to:

```text
http://localhost:5173/
```

Open that address in a browser.

---

# Production Build

To create a production build:

```bash
npm run build
```

The generated production files will be placed inside:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

---

# Hardhat Mental Model

A major purpose of this repository is to establish the correct relationship between the different Ethereum development components.

```text
Hardhat
≠
Ethereum
```

Hardhat is the development environment and tooling layer.

```text
Solidity source code
≠
deployed contract
```

Solidity must first be compiled into EVM-compatible bytecode.

```text
ABI
≠
Bytecode
```

The ABI describes how software interacts with a contract.

Bytecode contains the instructions executed by the EVM.

```text
RPC
≠
Blockchain
```

JSON-RPC is the communication interface used to communicate with Ethereum nodes.

```text
RPC Provider
≠
Ethereum
```

Services such as RPC providers provide access to Ethereum nodes. They are not the blockchain itself.

```text
Contract Address
≠
Source Code
```

A contract address identifies a deployed contract account in Ethereum state.

```text
Read Call
≠
Transaction
```

A read operation such as:

```text
count()
```

can use `eth_call` and does not modify blockchain state.

A state-changing operation such as:

```text
increment()
```

requires a transaction.

The important execution relationship is:

```text
Transaction
     ↓
EVM Execution
     ↓
State Transition
```

---

# Local Network vs Sepolia

A local Hardhat development network provides a controlled Ethereum environment for development and testing.

Conceptually:

```text
Developer Computer

Hardhat
   ↓
Local Ethereum Node
   ↓
JSON-RPC
   ↓
EVM
   ↓
Blocks
   ↓
Contracts
   ↓
State
```

Sepolia is a public Ethereum test network.

Conceptually:

```text
Developer Computer
        ↓
Hardhat
        ↓
ethers
        ↓
Signer
        ↓
Provider
        ↓
JSON-RPC
        ↓
RPC Provider
        ↓
Ethereum Node
        ↓
Sepolia Network
        ↓
Validator
        ↓
Block
        ↓
EVM
        ↓
Contract
        ↓
State
```

This repository uses both environments to demonstrate what remains the same and what changes when moving from local development to a public Ethereum testnet.

---

# Learning Objective

By working through the projects in this repository, the learner should eventually be able to explain the following process without treating it as a collection of memorized commands:

```text
I write a Solidity contract
        ↓
I run Hardhat
        ↓
Hardhat loads the project configuration
        ↓
The Solidity compiler compiles the contract
        ↓
ABI and bytecode are generated
        ↓
Artifacts are created
        ↓
A deployment script or Ignition module uses those artifacts
        ↓
ethers prepares the blockchain interaction
        ↓
A signer signs the transaction
        ↓
A provider communicates with an Ethereum node
        ↓
JSON-RPC transports the request
        ↓
The Ethereum node receives the transaction
        ↓
The EVM executes the bytecode
        ↓
The transaction is included in a block
        ↓
A contract account exists in blockchain state
        ↓
The contract receives an address
        ↓
Functions can be called using that address
        ↓
State-changing transactions execute through the EVM
        ↓
Blockchain state changes
```

---

# Purpose

This repository is primarily a learning environment.

The aim is to understand not only **how to use Hardhat**, but also:

- what Hardhat is responsible for
- what the Solidity compiler is responsible for
- what ethers is responsible for
- what a signer does
- what a provider does
- how JSON-RPC works
- what an Ethereum node does
- where the EVM executes
- how transactions become blocks
- where deployed contracts exist
- what contract addresses represent
- how smart contract storage changes
- how local development differs from Sepolia deployment

The course website provides the written explanation.

The animation project provides the visual explanation.

Together they are intended to make the complete Hardhat and Ethereum development lifecycle understandable from source code to blockchain state.
