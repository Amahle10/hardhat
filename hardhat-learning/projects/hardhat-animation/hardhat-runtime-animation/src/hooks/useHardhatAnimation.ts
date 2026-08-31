import {useCallback,useLayoutEffect,useRef,useState} from 'react'
import type {RefObject} from 'react'
import {createHardhatTimeline} from '../animation/createHardhatTimeline'
import {scenes} from '../data/scenes'
export function useHardhatAnimation(root:RefObject<HTMLDivElement|null>){
 const timeline=useRef<ReturnType<typeof createHardhatTimeline>|null>(null);const [sceneIndex,setSceneIndex]=useState(0);const [playing,setPlaying]=useState(false);const[speed,setSpeedState]=useState(1)
 useLayoutEffect(()=>{if(!root.current)return;timeline.current=createHardhatTimeline(setSceneIndex,()=>setPlaying(false));return()=>{timeline.current?.kill()}},[root])
 const goTo=useCallback((index:number,play=false)=>{const next=Math.max(0,Math.min(scenes.length-1,index));setSceneIndex(next);timeline.current?.seek(scenes[next].id,false);if(play){timeline.current?.play();setPlaying(true)}else{timeline.current?.pause();setPlaying(false)}},[])
 const toggle=()=>{if(playing){timeline.current?.pause();setPlaying(false)}else{if(sceneIndex===scenes.length-1)goTo(0,true);else{timeline.current?.play();setPlaying(true)}}}
 const restart=()=>{timeline.current?.restart();setPlaying(true)}
 const setSpeed=(next:number)=>{setSpeedState(next);timeline.current?.timeScale(next)}
 const pause=()=>{timeline.current?.pause();setPlaying(false)}
 return{sceneIndex,playing,speed,goTo,toggle,restart,setSpeed,pause}
}
