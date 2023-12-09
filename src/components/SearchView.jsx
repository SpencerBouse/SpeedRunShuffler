import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import BarLoader from 'react-spinners/BarLoader';

import { fetchPageSearchResults } from '../features/search/searchSlice';
import { selectAllCollections } from '../features/collections/collectionsSlice';

import GameCard from './GameCard';
import AddtoCollectionButton from './AddtoCollection';
import ShuffleButton from './ShuffleButton';

function SearchView({searchResults, searchStatus, searchPagination}) {
  const dispatch = useDispatch()
  const [noResults, setNoResults] = useState(false)
  const collections = [...useSelector(selectAllCollections)].reverse()

  useEffect(()=>{
    setNoResults(searchResults[0]==='No Results'? true : false)
  },[searchResults, searchStatus, searchPagination])
  
  const fetchPage=(link)=>{
    dispatch(fetchPageSearchResults(link))
  }

  if(searchResults || (searchStatus==='loading')){
    return (
      <div className='search-view-container'>
        
        <div className='bar-container'>
          {!!(searchStatus==='loading') &&
            <BarLoader width='25em' color='#e49a4e'/>
          }
        </div>
          {noResults &&
            <p className='no-results'>No Results</p>
          }
          {!noResults &&
            <ul className='search-results-grid'>
            {searchResults.map(game=>
              <li className='search-results-item' key={game.id}>
                {game.id &&
                  <>
                    <GameCard
                    game={game}
                    removable={false}/>
                  <ShuffleButton
                    className='light-gray mr-sm'
                    titleText='Shuffle Game Runs'
                    gameIds={game.id}/>
                  <AddtoCollectionButton
                    className='light-gray ml-sm'
                    collections={collections}
                    game={game}/>
                  </>
                }
              </li>
            )}
          </ul>
          }

        <div className='pagination-control overflow-auto'>
          <button
            disabled={!!searchPagination.prev ? false : true}
            className='light-gray float-l'
            title='Previous Page'
            onClick={()=>fetchPage(searchPagination.prev)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Prev
          </button>
          <button
            disabled={!!searchPagination.next ? false : true}
            className='light-gray float-r'
            title='Next Page'
            onClick={()=>fetchPage(searchPagination.next)}>
            Next <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    )
  }
}

export default SearchView