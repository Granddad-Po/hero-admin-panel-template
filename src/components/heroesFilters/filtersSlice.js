import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { useHttp } from "../../hooks/http.hook.js";


const filtersAdapter = createEntityAdapter()

export const fetchFilters = createAsyncThunk(
	'fetch/fetchFilters',
	() => {
		const {requestFilters} = useHttp()
		return requestFilters()
	}
)

const filtersSlice = createSlice({
	name: 'filters',
	initialState: filtersAdapter.getInitialState({filtersLoadingStatus: 'idle', activeFilter: 'all'}),
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
				filtersAdapter.setAll(state, action.payload)
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

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)
export const selectActiveFilter = state => state.filters.activeFilter
export const selectFiltersLoadingStatus = state => state.filters.filtersLoadingStatus

export const {
	changeActiveFilter
} = actions