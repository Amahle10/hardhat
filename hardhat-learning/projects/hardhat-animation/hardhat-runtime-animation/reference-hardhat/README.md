# Counter Reference Project

The real Hardhat project used to produce the frontend animation's sanitized trace data.

- Hardhat 3.15.0
- TypeScript, Mocha, and Ethers.js template
- Solidity 0.8.34
- Default EVM target: Osaka
- Hardhat Ignition deployment module
- Local EDR-simulated Ethereum network

## Commands

```bash
npm install
npx hardhat --version
npx hardhat --help
npx hardhat build
npx hardhat test
npx hardhat node
```

With the local node running in another terminal:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network localhost --reset
COUNTER_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3 \
  npx hardhat run scripts/interact.ts --network localhost
```

The well-known local address is only deterministic for the fresh development chain used by this trace.

## Sepolia

Configure `SEPOLIA_RPC_URL` and `SEPOLIA_PRIVATE_KEY` without committing secrets, then run:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network sepolia
npx hardhat ignition verify chain-11155111
```

The generic verification task supported by this installed version is also available:

```bash
npx hardhat verify --network sepolia <contract-address>
```

Deployment and verification are separate operations. Deployment places bytecode in Ethereum state; verification later supplies source and compiler context so an explorer can reproduce and compare that bytecode.
