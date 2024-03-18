import { createAction } from '@reduxjs/toolkit'

export const fetchHeroes = (requestHeroes, requestFilters) => (dispatch) => {
	dispatch(heroesFetching())
	requestHeroes()
		.then((data) => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
	requestFilters()
		.then(data => dispatch(filtersFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = createAction('HEROES_FETCHING')

export const heroesFetched = createAction('HEROES_FETCHED')

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

export const heroesCreated = createAction('HEROES_CREATE')

export const heroesDeleted = createAction('HEROES_DELETE')

export const changeActiveFilter = createAction('CHANGE_ACTIVE_FILTER')

export const filtersFetched = createAction('FILTERS_FETCHED')