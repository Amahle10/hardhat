import type {Network} from '../../types/scenes'
export function NetworkSelector({network,onChange}:{network:Network;onChange:(n:Network)=>void}){return <div className="network-selector"><button className={network==='local'?'active':''} onClick={()=>onChange('local')}>LOCAL</button><button className={network==='sepolia'?'active':''} onClick={()=>onChange('sepolia')}>SEPOLIA</button></div>}
