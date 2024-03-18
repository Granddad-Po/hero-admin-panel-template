const initialState = {
	heroes: [],
	filteredHeroes: [],
	heroesLoadingStatus: 'idle',
	filters: [],
	activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HEROES_FETCHING':
			return {
				...state,
				heroesLoadingStatus: 'loading'
			}
		case 'HEROES_FETCHED':
			return {
				...state,
				heroes: action.payload.heroes,
				filteredHeroes: action.payload.heroes,
				filters: action.payload.filters,
				heroesLoadingStatus: 'idle'
			}
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error'
			}
		case 'HEROES_CREATE':
			return {
				...state,
				heroes: [...state.heroes, action.payload],
				heroesLoadingStatus: 'idle'
			}
		case 'HEROES_DELETE':
			return {
				...state,
				heroes: state.heroes.filter(hero => hero.id !== action.payload),
				heroesLoadingStatus: 'idle'
			}
		case 'CHANGE_ACTIVE_FILTER':
			return {
				...state,
				activeFilter: action.payload,
				filteredHeroes: action.payload === 'all'
					? state.heroes
					: state.heroes.filter(item => item.element === action.payload)
			}
		default:
			return state
	}
}

export default reducer;