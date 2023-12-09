import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';

import { fetchRandomGameRun, setCollectionIds } from '../features/runs/runsSlice';
import { clearSearchResults, setQuery } from '../features/search/searchSlice';

function ShuffleButton({ className, titleText, gameIds }) {
  const dispatch = useDispatch()
  
  const shuffleCategory = (ids) =>  {
    dispatch(clearSearchResults())
    dispatch(setQuery(''))

    dispatch(setCollectionIds(ids))
    dispatch(fetchRandomGameRun(ids))
  }

  return (
    <button 
      disabled={!gameIds.length}
      className={className} 
      title={titleText} 
      onClick={()=> shuffleCategory(gameIds) }
    >
      <FontAwesomeIcon icon={faShuffle} />
    </button>
  )
}

export default ShuffleButton