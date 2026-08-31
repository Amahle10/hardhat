import {Activity,HardHat} from 'lucide-react'
export function Header(){return <header className="app-header"><div className="identity"><span className="logo"><HardHat size={20}/></span><div><small>SYSTEM TRACE / 0xHH</small><h1>HOW HARDHAT WORKS</h1></div></div><p>Interactive Ethereum Runtime</p><span className="ready"><Activity size={13}/> SIMULATION READY</span></header>}
