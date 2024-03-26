import { createAsyncThunk, createSelector, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook.js'


const heroesAdapter = createEntityAdapter()

export const fetchHeroes = createAsyncThunk(
	'heroes/fetchHeroes',
	() => {
		const {requestHeroes} = useHttp()
		return requestHeroes()
	}
)

export const fetchAddHeroes = createAsyncThunk(
	'heroes/fetchAddHeroes',
	(data) => {
		{
			const {requestAddHero} = useHttp()
			return requestAddHero(data)
		}
	}
)

export const fetchDeleteHeroes = createAsyncThunk(
	'heroes/fetchDeleteHeroes',
	(id) => {
		const {requestDeleteHero} = useHttp()
		return requestDeleteHero(id)
	}
)

const heroesSlice = createSlice({
	name: 'heroes',
	initialState: heroesAdapter.getInitialState({heroesLoadingStatus: 'idle'}),
	extraReducers: builder => {
		builder
			.addCase(fetchHeroes.pending, state => {
				state.heroesLoadingStatus = 'loading'
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				heroesAdapter.setAll(state, action.payload)
				state.heroesLoadingStatus = 'idle'
			})
			.addCase(fetchHeroes.rejected, state => {
				state.heroesLoadingStatus = 'error'
			})


			.addCase(fetchAddHeroes.fulfilled, (state, action) => {
				heroesAdapter.addOne(state, action.payload)
				state.heroesLoadingStatus = 'idle'
			})
			.addCase(fetchAddHeroes.rejected, state => {
				state.heroesLoadingStatus = 'error'
			})


			.addCase(fetchDeleteHeroes.fulfilled, (state, action) => {
				heroesAdapter.removeOne(state, action.payload)
				state.heroesLoadingStatus = 'idle'
			})
			.addCase(fetchDeleteHeroes.rejected, state => {
				state.heroesLoadingStatus = 'error'
			})
			.addDefaultCase(() => {
			})
	}
})

const {reducer, actions} = heroesSlice

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)
const selectActiveFilter = state => state.filters.activeFilter

export const selectFilteredHeroes = createSelector(
	selectAll,
	selectActiveFilter,
	(heroes, filter) => {
		return filter === 'all'
			? heroes
			: heroes.filter(hero => hero.element === filter)
	}
)

export default reducer