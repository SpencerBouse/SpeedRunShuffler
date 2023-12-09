import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  query: '',
  pagination:{
    prev: {},
    next: {}
  },
  status: 'idle',
  error: null
}

export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (args) => {
  const {query, resultNum} = args
  const response = await fetch(`https://www.speedrun.com/api/v1/games?name=${query}&max=${resultNum}`)
    .then(response=> response.json())
  
    return response
})

export const fetchPageSearchResults = createAsyncThunk('search/fetchPageSearchResults', async(link)=>{
  if(link.uri){
    const response = await fetch(link.uri)
      .then(response => response.json())
    
    return response
  }
})

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults: {
      reducer(state) {
        state.searchResults = []
      }
    },
    setStatus: {
      reducer(state,action) {
        state.status = action.payload
      } 
    },
    setQuery: {
      reducer(state,action) {
        state.query = action.payload
      }
    }
  },
  extraReducers(builder){
    builder
      .addCase(fetchSearchResults.pending, (state,action) => {
        state.status = 'loading'
      })
      .addCase(fetchSearchResults.fulfilled, (state,action) => {
        state.status = 'succeeded'
        state.searchResults = action.payload.data.length ? action.payload.data : ['No Results']
        
        state.pagination.prev = action.payload.pagination.links.find(link=>link.rel === 'prev') 
        state.pagination.next = action.payload.pagination.links.find(link=>link.rel === 'next')
      })
      .addCase(fetchSearchResults.rejected, (state,action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchPageSearchResults.pending, (state,action) => {
        state.status = 'loading';
      })
      .addCase(fetchPageSearchResults.fulfilled, (state,action) => {
        state.status = 'succeeded'
        state.searchResults = action.payload.data

        state.pagination.prev = action.payload.pagination.links.find(link=>link.rel === 'prev') 
        state.pagination.next = action.payload.pagination.links.find(link=>link.rel === 'next')
      })
      .addCase(fetchPageSearchResults.rejected, (state,action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { clearSearchResults, setStatus, setQuery } = searchSlice.actions

export default searchSlice.reducer

export const selectAllSearchResults = state => {
  return state.search.searchResults
}