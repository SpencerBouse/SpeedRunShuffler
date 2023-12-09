import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSearchResults, setStatus, clearSearchResults, setQuery } from '../features/search/searchSlice';

import CloseButton from './CloseButton';

function Search() {
  const dispatch = useDispatch()
  const screenSize = useRef()

  const query = useSelector(state => state.search.query)

  const closeResultsView=()=> {
    dispatch(setQuery(''))
    dispatch(clearSearchResults())
  }

  useEffect(()=>{
    let resultNum = 21
    screenSize.current = window.innerWidth

    switch (true){
      case (screenSize.current<630):
        resultNum = 12
        break
      case (screenSize.current<1150):
        resultNum = 20
        break
      default:
        break
    }

    if(query){
      dispatch(setStatus('loading'))
      const timeout = setTimeout(()=>{
        dispatch(fetchSearchResults({query, resultNum}))
      },500)
      return () => clearTimeout(timeout);
    }else{
      dispatch(setStatus('idle'))
      dispatch(clearSearchResults())
    }
    
  },[query, screenSize])

  return (
    <div className='search-container'>
      <input
        name='search' 
        className='search-input'
        placeholder='Search'
        value={ query }
        onChange={evt => dispatch(setQuery(evt.target.value))} >
      </input>
      <CloseButton 
        className='close-results-btn'
        title='Close Search Results'
        disabled={!query}
        action={closeResultsView}/>
    </div>
  )
}

export default Search