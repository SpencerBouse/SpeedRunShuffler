import { useDispatch } from 'react-redux';

import { clearSearchResults, setQuery } from '../features/search/searchSlice';
import { clearRuns } from '../features/runs/runsSlice';

import Search from './Search';

function Header(){
  const dispatch = useDispatch()
  
  const clearAll =()=>{
    dispatch(clearSearchResults())
    dispatch(setQuery(''))
    dispatch(clearRuns())
  }

  return(
    <div id='header'>
      <div 
        id='site-title'
        onClick={()=> clearAll()}>
        <h1>SpeedRun Shuffler</h1>
        <p>built using the www.speedrun.com api</p>
      </div>
      
      <Search />
    </div>
  )
}

export default Header