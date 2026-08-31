import {useCallback,useEffect,useLayoutEffect,useRef,useState} from 'react'
import gsap from 'gsap'
import {MotionPathPlugin} from 'gsap/MotionPathPlugin'
import {scenes} from '../data/scenes'
import {InfoPanel,info} from './InfoPanel'
gsap.registerPlugin(MotionPathPlugin)

type Network='local'|'sepolia'
const Btn=({id,children,onPick,className=''}:{id:string;children:React.ReactNode;onPick:(id:string)=>void;className?:string})=><button className={`node ${className}`} data-node={id} data-focus={id} onClick={()=>onPick(id)}>{children}</button>

export function HardhatAnimation(){
 const root=useRef<HTMLDivElement>(null), timeline=useRef<gsap.core.Timeline|null>(null)
 const [scene,setScene]=useState(0),[playing,setPlaying]=useState(false),[network,setNetwork]=useState<Network>('local'),[selected,setSelected]=useState<string|null>(null),[readOpen,setReadOpen]=useState(false)
 const current=scenes[scene]
 const go=useCallback((index:number,autoplay=false)=>{const i=Math.max(0,Math.min(scenes.length-1,index));setScene(i);setNetwork(i>=12?'sepolia':'local');setPlaying(autoplay);const tl=timeline.current;if(tl){tl.seek(`scene-${i}`,false);if(autoplay)tl.play();else tl.pause()}},[])
 useLayoutEffect(()=>{if(!root.current)return;const ctx=gsap.context(()=>{
   const tl=gsap.timeline({paused:true,onUpdate(){const idx=Math.min(scenes.length-1,Math.floor(tl.time()/4));setScene(idx);if(idx>=12)setNetwork('sepolia')},onComplete(){setPlaying(false)}})
   scenes.forEach((_,i)=>{tl.addLabel(`scene-${i}`,i*4).call(()=>setScene(i),[],i*4).set('.packet',{opacity:0},i*4).set(`[data-focus]`,{filter:'none'},i*4).to(`[data-focus="${scenes[i].focus}"]`,{filter:'drop-shadow(0 0 12px rgba(255,196,0,.75))',duration:.35},i*4+.05).to('.packet',{opacity:1,duration:.15},i*4+.35).to('.packet',{motionPath:{path:'#flow-path',align:'#flow-path',alignOrigin:[.5,.5],start:0,end:1},duration:2.65,ease:'power1.inOut'},i*4+.45).to('.packet',{opacity:0,duration:.25},i*4+3.1)})
   timeline.current=tl
 },root);return()=>ctx.revert()},[])
 useEffect(()=>{if(scene===11||scene===16)gsap.fromTo('.storage-value',{y:-12,opacity:0,scale:.65},{y:0,opacity:1,scale:1.08,duration:.8,ease:'back.out(2)'});},[scene])
 const pick=(id:string)=>setSelected(id)
 const restart=()=>{setReadOpen(false);go(0,true)}
 return <div className="app" ref={root}>
  <header><div><div className="brandmark"><span>HH</span></div><div><div className="eyebrow">SYSTEM TRACE / 0xHH</div><h1>HOW HARDHAT WORKS</h1></div></div><p>Interactive Ethereum Development Runtime</p><div className="status"><i/> SIMULATION READY</div></header>
  <main>
   <div className="scene-meta"><span>{current.kicker}</span><span className="scene-time">TRACE {String(scene+1).padStart(2,'0')} / {scenes.length}</span></div>
   <section className={`stage ${network}`} aria-label="Interactive architecture diagram">
    <div className="grid-noise"/>
    <svg className="connections" viewBox="0 0 1200 600" preserveAspectRatio="none"><defs><linearGradient id="line" x1="0" x2="1"><stop stopColor="#ffca28"/><stop offset=".55" stopColor="#8b8f98"/><stop offset="1" stopColor="#57d9ff"/></linearGradient></defs><path id="flow-path" d="M110 278 C205 278 195 120 300 120 S410 278 485 278 S580 120 665 120 S775 278 835 278 S940 278 1085 278"/><path d="M110 278 C205 278 195 120 300 120 S410 278 485 278 S580 120 665 120 S775 278 835 278 S940 278 1085 278" className="flow-line"/></svg>
    <div className="packet"><b>{current.packet||'DATA'}</b><small>0x{(scene+137).toString(16)}a…</small></div>
    <div className="architecture">
     <section className="zone project-zone"><div className="zone-title">YOUR PROJECT <span>LOCAL FILESYSTEM</span></div><div className="project-stack">
      <Btn id="source" onPick={pick}><span className="file-icon">◇</span><b>Counter.sol</b><small>Solidity source</small></Btn>
      <Btn id="config" onPick={pick}><span className="file-icon">⚙</span><b>hardhat.config.ts</b><small>0.8.28 · networks</small></Btn>
      <Btn id="deploy" onPick={pick}><span className="file-icon">›_</span><b>deploy.ts</b><small>ethers.deployContract()</small></Btn>
     </div><div className="terminal"><div><i/><i/><i/><span>TERMINAL</span></div><code><em>$</em> {scene===4?'npx hardhat node':scene>=12?'npx hardhat ignition deploy --network sepolia':'npx hardhat build'}<span className="cursor"/></code></div></section>
     <section className="zone tool-zone"><div className="zone-title">DEVELOPMENT TOOLING <span>ORCHESTRATION</span></div><Btn id="hardhat" onPick={pick} className="hardhat"><span className="hh-icon">H</span><b>HARDHAT</b><small>Development Environment</small></Btn><div className="tool-row"><Btn id="compiler" onPick={pick}><b>SOLC</b><small>Solidity Compiler</small></Btn><Btn id="artifacts" onPick={pick}><b>artifacts/</b><small><span onClick={e=>{e.stopPropagation();pick('abi')}}>ABI</span> · <span onClick={e=>{e.stopPropagation();pick('bytecode')}}>BYTECODE</span></small></Btn></div><div className="tool-row"><Btn id="ethers" onPick={pick}><b>ethers</b><small>ContractFactory</small></Btn><Btn id="signer" onPick={pick}><b>SIGNER</b><small>0xf39F…</small></Btn></div><Btn id="provider" onPick={pick} className="provider"><b>PROVIDER</b><small>{network==='local'?'127.0.0.1:8545':'sepolia.rpc.network'}</small></Btn></section>
     <section className="rpc-zone"><Btn id={network==='local'?'rpc':'remoteRpc'} onPick={pick} className="rpc"><b>JSON—RPC</b><small>{scene===7||scene>=13?'eth_sendRawTransaction':'request / response'}</small><span className="pulse"/></Btn></section>
     <section className="zone chain-zone"><div className="zone-title"><button onClick={()=>setNetwork('local')} className={network==='local'?'active':''}>LOCAL</button><button onClick={()=>setNetwork('sepolia')} className={network==='sepolia'?'active':''}>SEPOLIA</button><span>{network==='local'?'SIMULATED RUNTIME':'PUBLIC TESTNET'}</span></div>
      {network==='local'?<Local pick={pick} scene={scene}/>:<Sepolia pick={pick} scene={scene}/>} 
     </section>
    </div>
    <div className="distinction"><span>HARDHAT <b>≠</b> ETHEREUM</span><span>RPC PROVIDER <b>≠</b> BLOCKCHAIN</span><span>SOURCE <b>≠</b> DEPLOYED CONTRACT</span></div>
   </section>
   <section className="transport"><div><span>ACTIVE PAYLOAD</span><b>{current.packet||'SOURCE'}</b></div><div className="hex">{scene===10?'increment() → 0xd09de08a':scene===11||scene===16?'SSTORE [slot 0]  0x00 → 0x01':scene>=8?'0x6080604052348015610010…':'Counter.sol → compile pipeline'}</div><button onClick={()=>setReadOpen(v=>!v)}>↳ TRY READ CALL</button></section>
   {readOpen&&<section className="read-call"><b>READ · counter.count()</b><span>→</span><code>eth_call</code><span>→</span><span>node</span><span>→</span><span>EVM reads state</span><span>→</span><strong>return {scene>=11?1:0}</strong><small>NO TRANSACTION · NO GAS · NO BLOCK · NO STATE CHANGE</small></section>}
   <section className="controls"><div className="main-controls"><button onClick={()=>go(scene-1)}>← <span>PREVIOUS</span></button><button className="play" onClick={()=>{if(playing){timeline.current?.pause();setPlaying(false)}else{if(scene===scenes.length-1)go(0,true);else{timeline.current?.play();setPlaying(true)}}}}>{playing?'Ⅱ':'▶'} <span>{playing?'PAUSE':'PLAY TRACE'}</span></button><button onClick={()=>go(scene+1)}><span>NEXT</span> →</button><button className="restart" onClick={restart}>↻ RESTART</button></div><div className="progress"><i style={{width:`${((scene+1)/scenes.length)*100}%`}}/></div><nav>{scenes.map((s,i)=><button key={s.label} className={i===scene?'active':''} onClick={()=>go(i)}><em>{String(i+1).padStart(2,'0')}</em>{s.label}</button>)}</nav></section>
   <section className="explanation"><div className="ex-index">{String(scene+1).padStart(2,'0')}</div><div className="ex-copy"><div className="eyebrow">CURRENT OPERATION</div><h2>{current.title}</h2><p>{current.description}</p></div><div className="io"><div><span>INPUT</span><p>{current.input}</p></div><div><span>PROCESS</span><p>{current.process}</p></div><div><span>OUTPUT</span><p>{current.output}</p></div></div></section>
  </main>
  {selected&&info[selected]&&<InfoPanel item={info[selected]} onClose={()=>setSelected(null)}/>} 
 </div>
}

function Local({pick,scene}:{pick:(s:string)=>void;scene:number}){return <div className="network local-net" data-focus="local"><div className="net-head"><div><i/> LOCAL ETHEREUM NETWORK</div><small>CHAIN ID 31337 · 127.0.0.1:8545</small></div><div className="accounts"><span>ACCOUNTS</span><b>0xf39F… <em>10,000 ETH</em></b><b>0x7099… <em>10,000 ETH</em></b></div><div className="runtime"><Btn id="tx" onPick={pick} className="pool"><b>TRANSACTION POOL</b><small>{scene>=8?'1 pending':'empty'}</small></Btn><Btn id="evm" onPick={pick} className="evm"><span className="evm-ring">EVM</span><small>{scene===8?'CREATE':scene>=10?'CALL':'IDLE'}</small></Btn><Btn id="contract" onPick={pick} className="contract"><b>COUNTER CONTRACT</b><small>0x5FbDB231…</small><code>CODE 0x608060…</code><span className="storage" onClick={e=>{e.stopPropagation();pick('storage')}}>SLOT 0 · count = <strong className="storage-value">{scene>=11?1:0}</strong></span></Btn></div><div className="blocks"><Btn id="block" onPick={pick}><b>BLOCK #0</b><small>genesis</small></Btn><i>→</i><Btn id="block" onPick={pick}><b>BLOCK #1</b><small>contract creation</small></Btn><i>→</i><Btn id="block" onPick={pick}><b>BLOCK #2</b><small>increment() · 0 → 1</small></Btn></div></div>}
function Sepolia({pick,scene}:{pick:(s:string)=>void;scene:number}){return <div className="network sepolia-net" data-focus="sepolia"><div className="net-head"><div><i/> ETHEREUM SEPOLIA TESTNET</div><small>PUBLIC · DISTRIBUTED · CHAIN ID 11155111</small></div><div className="peer-row"><Btn id="remoteRpc" onPick={pick}><b>RPC PROVIDER</b><small>remote access</small></Btn><span>⇄</span><Btn id="node" onPick={pick}><b>ETHEREUM NODE</b><small>peer / mempool</small></Btn><span>⇄</span><Btn id="validator" onPick={pick}><b>VALIDATOR</b><small>propose + attest</small></Btn></div><div className="runtime public"><Btn id="evm" onPick={pick} className="evm"><span className="evm-ring">EVM</span><small>{scene>=14?'EXECUTING':'READY'}</small></Btn><Btn id="publicContract" onPick={pick} className="contract"><b>SEPOLIA CONTRACT</b><small>0x742…</small><code>CODE 0x608060…</code><span className="storage" onClick={e=>{e.stopPropagation();pick('publicStorage')}}>PUBLIC STATE · count = <strong className="storage-value">{scene>=16?1:0}</strong></span></Btn></div><div className="blocks"><Btn id="block" onPick={pick}><b>BLOCK #…91</b><small>parent</small></Btn><i>→</i><Btn id="block" onPick={pick}><b>BLOCK #…92</b><small>{scene>=14?'Counter deploy':'latest'}</small></Btn><i>→</i><Btn id="block" onPick={pick}><b>BLOCK #…93</b><small>{scene>=16?'increment()':'pending'}</small></Btn></div></div>}
