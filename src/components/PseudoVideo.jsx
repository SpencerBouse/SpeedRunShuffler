import { BarLoader } from "react-spinners"

function PseudoVideo(){
  return(
    <div className='video-view-container stretch-shadow'>
        <div className='video-header'>
          <div className='float-l pt-1 pseduo-title light-gray'>
            
          </div>
        </div>
        <div className='video-container'>
          <div className='video-frame pseduo-video'>
            <div className='video-bar-container'>
              <BarLoader width='25em' color='#e49a4e'/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PseudoVideo