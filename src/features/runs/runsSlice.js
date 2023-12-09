import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  run: {},
  collectionIds: [],
  runIndex: '',
  status: 'idle',
  error: null
}

export const fetchRandomGameRun = createAsyncThunk('games/fetchRuns', async (ids) => {
  const id = ids instanceof Array ? ids[Math.floor(Math.random() * ids.length)] : ids
  let runIndex = 0

  const run  = await fetch(`https://www.speedrun.com/api/v1/runs?game=${id}&embed=category,platform,players,game`)
    .then((resposne) => resposne.json())
    .then((data) => {  
      const runs = data.data.filter(run=>run.videos)
      
      runIndex = Math.floor(Math.random() * runs.length)

      return runs[runIndex]
    })
  
  return {run: run, index: runIndex}
})

const runsSlice = createSlice({
  name: 'runs',
  initialState,
  reducers: {
    clearRuns: {
      reducer(state) {
        state.run = {}
      }
    },
    setCollectionIds: {
      reducer(state,action) {
        state.collectionIds = action.payload instanceof Array ? [...action.payload] : [action.payload]
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRandomGameRun.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRandomGameRun.fulfilled, (state,action) => {
        state.status = 'succeeded'
        if(state.run.id !== action.payload.run.id) {
          state.run = action.payload.run
          state.runIndex = action.payload.index
        }
      })
      .addCase(fetchRandomGameRun.rejected, (state,action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const {clearRuns,setCollectionIds} = runsSlice.actions

export default runsSlice.reducer

export const selectRun = state => {
  return state.runs.run
}