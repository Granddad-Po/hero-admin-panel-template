export const heroesFetching = () => {
	return {
		type: 'HEROES_FETCHING'
	}
}

export const heroesFetched = (heroes) => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes
	}
}

export const heroesFetchingError = () => {
	return {
		type: 'HEROES_FETCHING_ERROR'
	}
}

export const heroesCreate = (hero) => {
	return {
		type: 'HEROES_CREATE',
		payload: hero
	}
}

export const heroesDelete = (id) => {
	return {
		type: 'HEROES_DELETE',
		payload: id
	}
}

export const changeActiveFilter = (filter) => {
	return {
		type: 'CHANGE_ACTIVE_FILTER',
		payload: filter
	}
}