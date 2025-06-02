import {  useEffect,useState } from "react";
import { calculateTime, formatTime} from "../Utils/utils";

export default function TimerSection() {
  const [time,setTime] = useState(0)
  const [isRunning,setisRunning] = useState(false)
  const [editTime,seteditTime] = useState({
    hour: 0,
    minutes: 0,
    seconds:0
  })

  useEffect(function(){
    console.log("hello form 1 useeffect")
    const totalTimeInSecond = calculateTime(editTime.hour,editTime.minutes,editTime.seconds)
    setTime(totalTimeInSecond)
  },[editTime])

  function handleOnChange(e){
    console.log("hello from onchange")
     const {name,value} = e.target 

     seteditTime((prevTime)=>({
      ...prevTime,
      [name]: Number(value)
     }))
  }

  useEffect(function(){
    console.log("hello from 2 useeffect")
    if(!isRunning) return

    const interval = setInterval(() => {
    setTime((prev)=> {
      if(prev <=1){
        setisRunning(false)
        clearInterval(interval)
        return 0
      }
      return prev -1
    })

  }, 1000);

    return () =>clearInterval(interval)
  },[isRunning])

  useEffect(function(){
    console.log("third component mounted")
    if(time === 0 && isRunning){
      setisRunning(false)
    }
  },[isRunning])

  const {hr,mins,sec} = formatTime(time)

  return (
    <div> 
      <div style={{marginBottom:"10px"}}>
      <input type="number" value={hr} name="hour" onChange={handleOnChange} onClick={()=> setisRunning(false)} style={{padding:"5px",textAlign:"center"} }/>
      <input type="number" value={mins} name="minutes" onChange={handleOnChange} onClick={()=> setisRunning(false)} style={{padding:"5px",textAlign:"center"}}/>
      <input type="number" value={sec} name="seconds"onChange={handleOnChange} onClick={()=> setisRunning(false)} style={{padding:"5px",textAlign:"center"}}/>
  </div>
      <button onClick={()=>setisRunning(!isRunning)} style={{marginRight:"20px"}}>{isRunning ? "pause":"start clock"}</button>
      <button onClick={() =>{
        setTime(0) 
        setisRunning(false)}}>Reset</button>
    </div>
  )
}
