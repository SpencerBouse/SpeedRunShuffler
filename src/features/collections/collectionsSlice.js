import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  collections: [],
  status: 'idle',
  error: null
}

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    addGameToCollection: {
      reducer(state,action) {
        state.collections.map(collection=>{
          if(collection.id === action.payload.collectionId){
            collection.gameIds.push(action.payload.gameId)
          }
          return collection
        })
        localStorage.setItem('collections', JSON.stringify(state.collections))
      }
    },
    removeGameFromCollection: {
      reducer(state,action) {
        state.collections.map(collection=>{
          if(collection.id === action.payload.collectionId){
            collection.gameIds.splice(collection.gameIds.indexOf(action.payload.gameId),1)
          }
          return collection
        })
        localStorage.setItem('collections', JSON.stringify(state.collections))
      }
    },
    collectionAdded: {
      reducer(state, action) {
        const existingCollection = state.collections.find(collection => collection.id === action.payload.id)
        
        if(!existingCollection){
          state.collections = state.collections.concat(action.payload)
          localStorage.setItem('collections', JSON.stringify(state.collections))
        }
      }
    },
    collectionRemoved: {
      reducer(state, action) {
        state.collections = state.collections.filter(collection=> collection.id !== action.payload.id)
        localStorage.setItem('collections', JSON.stringify(state.collections))
      }
    },
    setCollections: {
      reducer(state, action) {
        state.collections = action.payload
      }
    }
  }
})

export const { addGameToCollection, removeGameFromCollection, collectionAdded, collectionRemoved, setCollections} = collectionsSlice.actions
export default collectionsSlice.reducer

export const selectAllCollections = state => {
  return state.collections.collections
}

export const selectCollectionById = (state, id) => {
  return state.collections.collections.find(collection => collection.id === id)
}