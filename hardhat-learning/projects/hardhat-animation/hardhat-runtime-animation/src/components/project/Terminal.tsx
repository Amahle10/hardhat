import {TerminalSquare} from 'lucide-react'
export function Terminal({scene}:{scene:number}){const command=scene===4?'npx hardhat node':scene>=22?'npx hardhat ignition deploy ./ignition/modules/Counter.ts --network sepolia':'npx hardhat build';return <div className="terminal"><div><TerminalSquare size={12}/> TERMINAL</div><code><b>$</b> {command}<i/></code></div>}
