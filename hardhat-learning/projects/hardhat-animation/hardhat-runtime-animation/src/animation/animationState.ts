export const sceneProgress=(index:number,total:number)=>((index+1)/total)*100
export const sceneFromTime=(time:number,seconds:number,total:number)=>Math.min(total-1,Math.floor(time/seconds))
