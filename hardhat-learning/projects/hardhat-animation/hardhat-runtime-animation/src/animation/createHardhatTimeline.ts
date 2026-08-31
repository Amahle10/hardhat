import {gsap} from 'gsap'
import {MotionPathPlugin} from 'gsap/MotionPathPlugin'
import {scenes} from '../data/scenes'
import {SCENE_SECONDS} from './sceneRegistry'
gsap.registerPlugin(MotionPathPlugin)

export function createHardhatTimeline(onScene:(index:number)=>void,onComplete:()=>void){
 const timeline=gsap.timeline({paused:true,onUpdate(){onScene(Math.min(scenes.length-1,Math.floor(timeline.time()/SCENE_SECONDS)))},onComplete})
 timeline.set('.cinematic-scene',{autoAlpha:0,pointerEvents:'none'}).set('.cinematic-scene[data-cinematic-index="0"]',{autoAlpha:1,pointerEvents:'auto'})
 scenes.forEach((scene,index)=>{
  const at=index*SCENE_SECONDS,frame=`.cinematic-scene[data-cinematic-index="${index}"]`,previous=index?`.cinematic-scene[data-cinematic-index="${index-1}"]`:null
  timeline.addLabel(scene.id,at).call(()=>onScene(index),[],at)
  if(previous)timeline.to(previous,{autoAlpha:0,scale:.94,filter:'blur(8px)',duration:.48,ease:'power2.in'},at)
  timeline.set(frame,{pointerEvents:'auto'},at+.36)
  if(index>0)timeline.fromTo(frame,{autoAlpha:0,scale:1.08,xPercent:index%2?2:-2,filter:'blur(9px)'},{autoAlpha:1,scale:1,xPercent:0,filter:'blur(0px)',duration:.72,ease:'power3.out',immediateRender:false},at+.36)
  timeline.fromTo(`${frame} .shot-title`,{y:20,autoAlpha:0},{y:0,autoAlpha:1,duration:.5,immediateRender:false},at+.75)
  if(document.querySelector(`${frame} .process-item`))timeline.fromTo(`${frame} .process-item`,{y:18,autoAlpha:0},{y:0,autoAlpha:1,stagger:.14,duration:.44,ease:'power2.out'},at+1.05)
  if(document.querySelector(`${frame} .type-reveal`))timeline.fromTo(`${frame} .type-reveal`,{width:0},{width:'100%',duration:2.2,ease:'steps(34)'},at+.9)
  timeline.fromTo(`${frame} .scene-packet`,{autoAlpha:0},{autoAlpha:1,duration:.15},at+1.1)
  timeline.to(`${frame} .scene-packet`,{motionPath:{path:`${frame} .cinematic-route`,align:`${frame} .cinematic-route`,alignOrigin:[.5,.5],start:scene.packet==='RECEIPT'||scene.packet==='RESPONSE'?1:0,end:scene.packet==='RECEIPT'||scene.packet==='RESPONSE'?0:1},duration:2.3,ease:'power1.inOut'},at+1.25)
  if(document.querySelector(`${frame} .process-active`))timeline.to(`${frame} .process-active`,{boxShadow:'0 0 30px rgba(246,201,69,.28)',borderColor:'#f6c945',duration:.35,yoyo:true,repeat:1},at+2.3)
 })
 return timeline
}
