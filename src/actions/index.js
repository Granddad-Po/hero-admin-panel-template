import { heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice.js'
import { filtersFetched } from '../components/heroesFilters/filtersSlice.js'

export const fetchHeroes = (requestHeroes, requestFilters) => (dispatch) => {
	dispatch(heroesFetching())
	requestHeroes()
		.then((data) => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
	requestFilters()
		.then(data => dispatch(filtersFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}