import { useCallback } from "react";

const _apiUrl = 'https://65f0508bda8c6584131b69b7.mockapi.io/api'

export const useHttp = () => {

	const requestAll = useCallback(async (method = 'GET', headers = {'Content-Type': 'application/json'}) => {

		try {
			const responseHeroes = await fetch(`${_apiUrl}/hero`, {method, headers});
			const responseFilters = await fetch(`${_apiUrl}/filter`, {method, headers});

			if (!responseHeroes.ok || !responseFilters.ok) {
				throw new Error(`Oops! Something went wrong when trying to request`);
			}

			const dataHeroes = await responseHeroes.json();
			const dataFilters = await responseFilters.json();

            const data = {
                heroes: dataHeroes,
                filters: dataFilters
            }
			return data;
		} catch (e) {
			throw e;
		}
	}, []);

	const requestAddHero = useCallback(async (body = null) => {

		if (body === null || Object.keys(body).length === 0) {
			throw new Error('The body should not be empty')
		}

		try {
			const response = await fetch(`${_apiUrl}/hero`, {
				method: 'POST',
				body: body,
				headers: {'Content-Type': 'application/json'}
			});

			if (!response.ok) {
				throw new Error(`Could not fetch ${`${_apiUrl}/hero`}, status: ${response.status}`);
			}

			const data = await response.json();

			return data;
		} catch (e) {
			throw e;
		}
	}, []);

	const requestDeleteHero = useCallback(async (id = null) => {

		if (!id) {
			throw new Error('You didn\'t specify an ID')
		}

		try {
			const response = await fetch(`${_apiUrl}/hero/${id}`, {
				method: 'DELETE',
				headers: {'Content-Type': 'application/json'}
			});

			if (!response.ok) {
				throw new Error(`Could not fetch ${_apiUrl}, status: ${response.status}`);
			}

			const data = await response.json();

			return data;
		} catch (e) {
			throw e;
		}
	}, []);


	return {
		requestAll,
		requestAddHero,
		requestDeleteHero
	}
}