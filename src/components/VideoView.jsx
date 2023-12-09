import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFastForward } from "@fortawesome/free-solid-svg-icons";

import { clearRuns, fetchRandomGameRun } from "../features/runs/runsSlice"

import CloseButton from "./CloseButton"
import PseduoGameCard from "./PseudoGameCard";
import PseudoVideo from "./PseudoVideo";

function VideoView({run}){
  const dispatch = useDispatch()
  const runIndexResults = useSelector(state => state.runs.runIndex)
  const collectionIdsResults = useSelector(state => state.runs.collectionIds)

  const [videoSrc, setVideoSrc] = useState('')
  const [hours,setHours] = useState('')
  const [minutes,setMinutes] = useState('')
  const [seconds,setSeconds] = useState('')
  const [runner,setRunner] = useState('')

  const alterVideoURI=(uri)=> {
    const twitchRegex = new RegExp('twitch')
    const twitchIdRegex = new RegExp('[^\/]*$')

    const ytRegex = new RegExp('youtu')
    const ytIdRegex = new RegExp('[^=]*$')
    const truncYTRegex = new RegExp('youtu.be')
    // http://youtu.be/-u_HbhM2ibA

    if(twitchRegex.test(uri)){
      setVideoSrc(`https://player.twitch.tv/?video=${uri.match(twitchIdRegex)}&parent=localhost`)
    }else if(ytRegex.test(uri)){
      setVideoSrc(`https://www.youtube.com/embed/${uri.match(ytIdRegex)}?autoplay=1`)
    }
  }

  const clearRun=()=> {
    dispatch(clearRuns())
  }

  const newRun=()=>{
    dispatch(fetchRandomGameRun(collectionIdsResults))
  }


  useEffect(() => {
    let runner = ''
    if(run.id){
      const time = new Date(run.times.primary_t * 1000).toISOString()

      if(run.players.data[0]){
        if(run.players.data[0].names && run.players.data[0].names.international){
          runner = run.players.data[0].names.international
        }else if(run.players.data[0].name){
          runner = run.players.data[0].name
        }
      }

      setRunner(runner)
      setHours(time.substring(11,13))
      setMinutes(time.substring(14,16))
      setSeconds(time.substring(17,19))

      if(run.videos.links[0]){
        alterVideoURI(run.videos.links[0].uri)
      }
    }
  },[run])

  if(run.id){
    return(
      <div className='video-view-container stretch-shadow'>
        <div className='video-header'>
          <div className='video-title float-l'>
            <b>#{runIndexResults+1}&nbsp;</b>
            <b>{run.game.data.names.international}&nbsp;|&nbsp;</b>
            {!!run.category.data.name &&
              <b>{run.category.data.name}&nbsp;</b>
            }
            {!!run.platform.data.name &&
              <>
                on&nbsp;
                <b>{run.platform.data.name}&nbsp;</b>
              </>
            }
            in&nbsp;
            {!!parseInt(hours) &&
              <>
                <b>{hours}</b>h&nbsp;
              </>
            }
            {!!parseInt(minutes) &&
              <>
                <b>{minutes}</b>m&nbsp;
              </>
            }
            {!!parseInt(seconds) &&
              <>
                <b>{seconds}</b>s&nbsp;
              </>
            }
            {!!runner &&
              <>
                by&nbsp;
                <b>{runner}</b>
              </>
            }
          </div>
          <div className='float-r mb-1'>
            <button
              className='light-gray mr-1'
              title='Skip Video'
              onClick={()=>newRun()}>
              <FontAwesomeIcon icon={faFastForward} />
            </button>
            <CloseButton 
              className='light-gray'
              title='Close Run'
              action={clearRun} />
          </div>
        </div>
        <div className='video-container'>
          <iframe className='video-frame' allow="fullscreen;" src={videoSrc}></iframe>
        </div>
      </div>
    )
  }else{
    return(<PseudoVideo/>)
  }
}

export default VideoView