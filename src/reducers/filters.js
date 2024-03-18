const initialState = {
	filters: [],
	activeFilter: 'all'
}

const filters = (state = initialState, action) => {
	switch (action.type) {
		case 'FILTERS_FETCHED':
			return {
				...state,
				filters: action.payload,
				heroesLoadingStatus: 'idle'
			}
		case 'CHANGE_ACTIVE_FILTER':
			return {
				...state,
				activeFilter: action.payload,
			}
		default:
			return state
	}
}

export default filters;