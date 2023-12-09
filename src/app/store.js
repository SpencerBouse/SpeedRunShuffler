import { configureStore } from "@reduxjs/toolkit";
import gameReducer from '../features/games/gamesSlice'
import runReducer from '../features/runs/runsSlice'
import searchReducer from '../features/search/searchSlice'
import collectionReducer from '../features/collections/collectionsSlice'

export default configureStore({
  reducer: {
    games: gameReducer,
    runs: runReducer,
    search: searchReducer,
    collections: collectionReducer
  }
})