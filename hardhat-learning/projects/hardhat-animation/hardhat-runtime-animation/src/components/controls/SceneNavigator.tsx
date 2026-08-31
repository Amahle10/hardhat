import {scenes} from '../../data/scenes'
import {sceneProgress} from '../../animation/animationState'
export function SceneNavigator({current,onSelect}:{current:number;onSelect:(i:number)=>void}){return <div className="scene-nav"><div className="progress"><i style={{width:`${sceneProgress(current,scenes.length)}%`}}/></div><nav>{scenes.map((scene,index)=><button className={current===index?'active':''} key={scene.id} onClick={()=>onSelect(index)}><em>{String(index+1).padStart(2,'0')}</em>{scene.short}</button>)}</nav></div>}
