import {Radio} from 'lucide-react'
import {Node} from '../project/ProjectExplorer'
export function RpcConnection({remote,onInspect}:{remote:boolean;onInspect:(id:string)=>void}){return <div className="rpc-column"><Node id={remote?'remoteRpc':'rpc'} onClick={onInspect} className="rpc"><Radio/><b>JSON—RPC</b><small>eth_sendRawTransaction</small><i/></Node></div>}
