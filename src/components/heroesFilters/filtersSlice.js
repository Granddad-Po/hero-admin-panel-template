import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'


const filtersAdapter = createEntityAdapter()

const filtersSlice = createSlice({
	name: 'filters',
	initialState: filtersAdapter.getInitialState({filtersLoadingStatus: 'idle', activeFilter: 'all'}),
	reducers: {
		changeActiveFilter: (state, action) => {
			state.activeFilter = action.payload
		}
	}
})

const {reducer, actions} = filtersSlice

export default reducer

export const selectActiveFilter = state => state.filters.activeFilter
export const selectFiltersLoadingStatus = state => state.filters.filtersLoadingStatus

export const {
	changeActiveFilter
} = actions