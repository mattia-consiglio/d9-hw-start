export const ADD_FAVOURITE = 'ADD_FAVOURITE'
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING'
export const SET_SEARCH_ERROR = 'SET_SEARCH_ERROR'

export const addFavouriteAction = company => ({
	type: ADD_FAVOURITE,
	payload: company,
})

export const removeFavouriteAction = company => ({
	type: REMOVE_FAVOURITE,
	payload: company,
})

const baseEndpoint = 'https://strive-benchmark.herokuapp.com/api/jobs?search='

export const setSearchQueryAction = query => async (dispatch, getState) => {
	const { search } = getState()
	console.log(query)
	if (search.query === query) return
	dispatch({ type: SET_SEARCH_QUERY, payload: query })
	dispatch({ type: SET_SEARCH_LOADING, payload: true })
	dispatch({ type: SET_SEARCH_RESULTS, payload: [] })
	dispatch({ type: SET_SEARCH_ERROR, payload: '' })

	try {
		const response = await fetch(baseEndpoint + query + '&limit=20')
		if (response.ok) {
			const { data } = await response.json()
			if (data.length === 0) throw new Error('No results found')
			dispatch({ type: SET_SEARCH_RESULTS, payload: data })
		} else {
			dispatch({ type: SET_SEARCH_ERROR, payload: 'Error fetching results' })
		}
	} catch (error) {
		console.log(error, typeof error)
		let tmpError = error
		if (typeof error !== 'string') {
			tmpError = error.toString()
		}
		dispatch({ type: SET_SEARCH_ERROR, payload: tmpError })
	} finally {
		dispatch({ type: SET_SEARCH_LOADING, payload: false })
	}
}
