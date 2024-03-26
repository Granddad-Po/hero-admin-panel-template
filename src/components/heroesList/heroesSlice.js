import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook.js'

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
}

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
	initialState,
	extraReducers: builder => {
		builder
			.addCase(fetchHeroes.pending, state => {
				state.heroesLoadingStatus = 'loading'
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroes = action.payload
				state.heroesLoadingStatus = 'idle'
			})
			.addCase(fetchHeroes.rejected, state => {
				state.heroesLoadingStatus = 'error'
			})


			.addCase(fetchAddHeroes.fulfilled, (state, action) => {
				state.heroes.push(action.payload)
				state.heroesLoadingStatus = 'idle'
			})
			.addCase(fetchAddHeroes.rejected, state => {
				state.heroesLoadingStatus = 'error'
			})


			.addCase(fetchDeleteHeroes.fulfilled, (state, action) => {
				console.log(action.payload)
				state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
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

const selectHeroes = state => state.heroes.heroes
const selectActiveFilter = state => state.filters.activeFilter

export const selectFilteredHeroes = createSelector(
	selectHeroes,
	selectActiveFilter,
	(heroes, filter) => {
		return filter === 'all'
			? heroes
			: heroes.filter(hero => hero.element === filter)
	}
)

export default reducer