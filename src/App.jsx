import { useDispatch } from 'react-redux';

import defaultCollections from './assets/defaultCollections'
import { setCollections } from './features/collections/collectionsSlice';
import { setGames } from './features/games/gamesSlice';

import Header from './components/Header';
import PageContent from './components/PageContent';

function App() {
  const dispatch = useDispatch()

  if(!localStorage['collections']){
    dispatch(setCollections(defaultCollections))
    localStorage['collections'] = JSON.stringify(defaultCollections)
  }else{
    dispatch(setCollections(JSON.parse(localStorage['collections'])))
  }

  if(!localStorage['games']){
    localStorage['games'] = JSON.stringify([])
  }else{
    dispatch(setGames(JSON.parse(localStorage['games'])))
  }

  return (
    <div id='application'>
      <Header/>
      <PageContent 
        id='page-content'/>
    </div>
  )
}

export default App