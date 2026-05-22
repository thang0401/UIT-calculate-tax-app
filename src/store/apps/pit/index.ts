import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PitRecordInput } from 'src/types/apps/pitTypes'

export interface PitDataParams {
  q: string
  quy?: string
  nam?: string
}

export const fetchPitData = createAsyncThunk('appPit/fetchData', async (params: PitDataParams) => {
  const response = await axios.get('/apps/tax/pit/records', { params })

  return response.data
})

export const savePitRecord = createAsyncThunk(
  'appPit/save',
  async (record: PitRecordInput & { id?: number }, { getState, dispatch }) => {
    const response = await axios.post('/apps/tax/pit/save', record)
    const state = getState() as { pit: { params: PitDataParams } }
    await dispatch(fetchPitData(state.pit.params))

    return response.data
  }
)

export const deletePitRecord = createAsyncThunk(
  'appPit/deleteData',
  async (id: number | string, { getState, dispatch }) => {
    await axios.delete('/apps/tax/pit/delete', { data: id })
    const state = getState() as { pit: { params: PitDataParams } }
    await dispatch(fetchPitData(state.pit.params))
  }
)

const appPitSlice = createSlice({
  name: 'appPit',
  initialState: {
    data: [] as unknown[],
    total: 0,
    params: {} as PitDataParams,
    allData: [] as unknown[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPitData.fulfilled, (state, action) => {
      state.data = action.payload.records
      state.allData = action.payload.allData
      state.params = action.payload.params
      state.total = action.payload.total
    })
  }
})

export default appPitSlice.reducer
