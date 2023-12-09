import { useSelector } from 'react-redux';

import { selectAllSearchResults } from '../features/search/searchSlice';
import { selectRun } from '../features/runs/runsSlice';

import VideoView from './VideoView';
import SearchView from './SearchView';
import CollectionView from './CollectionView';

function PageContent(){
  const searchResults = useSelector(selectAllSearchResults)
  const searchStatus = useSelector(state => state.search.status)
  const searchPagination = useSelector(state => state.search.pagination)

  const runResults = useSelector(selectRun)
  const runStatus = useSelector(state => state.runs.status)

  return(
    <>
      {(searchResults.length || (searchStatus === 'loading')) &&
        <SearchView
          searchResults={searchResults}
          searchStatus={searchStatus}
          searchPagination={searchPagination} />
      }
      {(runResults.id || runStatus==='loading') &&
        <VideoView 
          run={runResults} />
      }
      <hr/>
      <CollectionView />
    </>
  )
}

export default PageContent