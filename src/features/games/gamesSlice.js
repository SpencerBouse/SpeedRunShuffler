import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  games: [],
  status: 'idle',
  error: null
}

export const fetchGame = createAsyncThunk('games/fetchGame', async (id) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/games/${id}`)
    .then((resposne) => resposne.json())
    
  return response.data
})

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    gameAdded: {
      reducer(state, action) {
        const {id} = action.payload
        const existingGame = state.games.find(game=> game.id === id)
        if(!existingGame){
          state.games.push(action.payload)
          const inStorage = JSON.parse(localStorage['games']).find(game=> game.id === id)
          if(!inStorage) localStorage.setItem('games', JSON.stringify(state.games))
        }

      }
    },
    setGames: {
      reducer(state,action){
        state.games = action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGame.pending, (state,action) => {
        state.status = 'loading'
      })
      .addCase(fetchGame.fulfilled, (state,action) => {
        const {id} = action.payload
        const existingGame = state.games.find(game => game.id === id)

        state.status = 'succeeded'
        if(!existingGame) {
          state.games = state.games.concat(action.payload)
          localStorage.setItem('games', JSON.stringify(state.games))
        }
      })
      .addCase(fetchGame.rejected, (state,action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { gameAdded, setGames } = gamesSlice.actions

export default gamesSlice.reducer

export const selectAllGames = state => {
  return state.games.games
}

export const selectGameById = (state, id) => {
  return state.games.games.find(game => game.id === id)
}