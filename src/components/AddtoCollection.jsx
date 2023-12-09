import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { gameAdded } from '../features/games/gamesSlice';
import { addGameToCollection } from '../features/collections/collectionsSlice';

import OutsideAlert from './OutsideAlert';
import { useState } from 'react';

function Dropdown({collections, addGame}){
  return(
    <div className='dropdown-container'>
      <ul className='light-gray dropdown'>
        {collections.map((collection)=>
          <li 
            className='dropdown-item'
            key={collection.id}
            onClick={() => addGame(collection)}>
              {collection.name}
          </li>
        )}
      </ul>
    </div>
  )
}

function AddtoCollection({className, game, collections}){
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)

  const addGame=(collection)=>{
    setToggle(false)
    dispatch(gameAdded(game))
    if(!collection.gameIds.includes(game.id)){
      dispatch(addGameToCollection({collectionId:collection.id, gameId:game.id}))
    }
  }

  return(
    <>
      <button 
        className={className} 
        title='Add Game to Collection' 
        disabled={toggle}
        onClick={()=>  setToggle(true)} >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      
      {toggle &&
        <OutsideAlert action={()=> setToggle(false)}>
          <Dropdown collections={collections} addGame={addGame}/>
        </OutsideAlert>
      }  
    </>  
  )
}

export default AddtoCollection