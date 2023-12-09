import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { collectionRemoved, removeGameFromCollection } from '../features/collections/collectionsSlice';
import { fetchGame} from '../features/games/gamesSlice';

import ShuffleButton from './ShuffleButton';
import CloseButton from './CloseButton';
import GameShelf from './GameShelf';
import ConfirmModal from './ConfirmModal';
import OutsideAlert from './OutsideAlert';

function Collection({ collection }) {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)
  const games = useSelector(state => state.games.games.filter(game => collection.gameIds.includes(game.id)), shallowEqual)

  const handleRemove=(collectionId, gameId)=>{
    dispatch(removeGameFromCollection({collectionId:collectionId, gameId:gameId}))
  }

  useEffect(()=>{
    collection.gameIds.forEach(id=>{
      const inState = games.find(game => game.id === id)
      if(!inState) dispatch(fetchGame(id))
    })
  },[collection, dispatch])

  return (
    <div className='collection-container'>
      <div className={toggle ? 'modal-container' : ''}>
        {toggle &&
          <OutsideAlert action={()=>setToggle(false)}>
            <ConfirmModal
              title='Remove Collection?'
              onOkay={()=>dispatch(collectionRemoved(collection))}
              onCancel={()=>setToggle(false)}/>
          </OutsideAlert>
        }
        <div className='collection-header'>
          <h2 className='collection-title'>
            { collection.name }
          </h2>
          <div className='collection-buttons'>
            <ShuffleButton
              className='shuffle-collection-btn'
              titleText='Shuffle From Collection' 
              gameIds={ collection.gameIds } />
            <CloseButton
              className='remove-collection-btn'
              title='Close Search Results'
              action={()=>setToggle(true)} />
          </div>
        </div>
          
        <GameShelf
          games={games}
          collectionId={collection.id}
          onRemove={handleRemove}/>
      </div> 
    </div>
  )
}
export default Collection