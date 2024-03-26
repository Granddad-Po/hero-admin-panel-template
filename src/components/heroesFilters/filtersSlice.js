import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { useHttp } from "../../hooks/http.hook.js";


const initialState = {
	filters: [],
	filtersLoadingStatus: 'idle',
	activeFilter: 'all'
}

export const fetchFilters = createAsyncThunk(
	'fetch/fetchFilters',
	() => {
		const {requestFilters} = useHttp()
		return requestFilters()
	}
)

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		changeActiveFilter: (state, action) => {
			state.activeFilter = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFilters.pending, state => {
				state.filtersLoadingStatus = 'loading'
			})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filters = action.payload
				state.filtersLoadingStatus = 'idle'
				state.activeFilter = 'all'
			})
			.addCase(fetchFilters.rejected, state => {
				state.filtersLoadingStatus = 'error'
			})
	}
})

const {reducer, actions} = filtersSlice

export default reducer

const selectFilters = state => state.filters

export const selectFiltersState = createSelector(
	selectFilters,
	filtersState => filtersState
)

export const {
	changeActiveFilter
} = actions