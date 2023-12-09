import { useState } from "react"

import GameCard from "./GameCard"
import OutsideAlert from "./OutsideAlert"
import ConfirmModal from "./ConfirmModal"
import ShuffleButton from "./ShuffleButton"
import CloseButton from "./CloseButton"

function GameShelfItem({game,collectionId,onRemove}){
  const [modalToggle, setModalToggle] = useState(false)

  return(
    <div className={modalToggle ? 'modal-container' : ''}>
      {modalToggle &&
        <OutsideAlert action={()=>setModalToggle(false)}>
          <ConfirmModal
            title='Remove Game?'
            onOkay={()=>onRemove(collectionId, game.id)}
            onCancel={()=>setModalToggle(false)}/>
        </OutsideAlert>
      }
      <GameCard
        key={game.id}
        game={ game }
        removable={true}
        collectionId={collectionId}
        onRemove={onRemove}/>
      <div className='shelf-btns'>
        <ShuffleButton
          className='light-gray mr-sm'
          titleText='Shuffle Game Runs'
          gameIds={game.id}/>
        <CloseButton 
          className='light-gray ml-sm'
          action={()=>setModalToggle(true)}/>
      </div>
    </div>
  )
}

export default GameShelfItem