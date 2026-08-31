/** Sanitized replay data captured from reference-hardhat with Hardhat 3.15.0. */
export const hardhatTrace={
 version:'3.15.0',buildCommand:'npx hardhat build',compileRelationship:'compile is an alias for build',compiler:'0.8.34+commit.80d5c536',evmTarget:'osaka',buildOutput:'Compiled 1 Solidity file with solc 0.8.34 (evm target: osaka)',
 sources:['project/contracts/Counter.sol'],generated:['artifacts/artifacts.d.ts','artifacts/contracts/Counter.sol/Counter.json','artifacts/contracts/Counter.sol/artifacts.d.ts','artifacts/build-info/solc-0_8_34-5fdaf19f50bd9c78a1eaed4fcd2d3a162964367c.json','artifacts/build-info/solc-0_8_34-5fdaf19f50bd9c78a1eaed4fcd2d3a162964367c.output.json','cache/compile-cache.json'],
 abi:[{name:'count',type:'function',stateMutability:'view'},{name:'increment',type:'function',stateMutability:'nonpayable'},{name:'setCount',type:'function',stateMutability:'nonpayable',inputs:['uint256 newCount']}],
 selectors:{count:'0x06661abd',increment:'0xd09de08a',setCount:'0xd14e62b8'},
 creationBytecode:'0x6080604052348015600e575f5ffd5b506101e18061001c5f395ff3fe60806040…',runtimeBytecode:'0x608060405234801561000f575f5ffd5b506004361061003f575f3560e01c…',
 artifactKeys:['_format','contractName','sourceName','abi','bytecode','deployedBytecode','linkReferences','deployedLinkReferences','immutableReferences','inputSourceName','buildInfoId'],
 rpc:'http://127.0.0.1:8545/',accounts:[{address:'0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',balance:'10000 ETH'},{address:'0x70997970c51812dc3a010c7d01b50e0d17dc79c8',balance:'10000 ETH'},{address:'0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',balance:'10000 ETH'}],
 deployment:{address:'0x5FbDB2315678afecb367f032d93F642f64180aa3',transactionHash:'0xfccef71dd90be4528dc0327b3ac0428aaa594fc2f4a8ed1e6d4b3f81bb020ceb',blockNumber:1,gasUsed:105339,from:'0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',to:null,chainId:31337,type:2,localRpcMethod:'eth_sendTransaction',remoteRpcMethod:'eth_sendRawTransaction'},
 increment:{transactionHash:'0xb6592fbf9ae6be55ac2bc6b8313ac4041f0b52f466cf89c42ed199d7a220a590',blockNumber:2,gasUsed:43391,resultingCount:1,readMethod:'eth_call'},
 buildInfo:{format:'hh3-sol-build-info-1',outputFormat:'hh3-sol-build-info-output-1',sourceMap:'58:186:0:-:0;;;;;;;;;;;;;;;;;;;',outputCategories:['ABI','creation bytecode + opcodes + source map','deployed bytecode + opcodes + source map','method identifiers','build input and compiler version']}
} as const
