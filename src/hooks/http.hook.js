import { useCallback } from "react";

const _apiUrl = 'https://65f0508bda8c6584131b69b7.mockapi.io/api'

export const useHttp = () => {

	const requestHeroes = useCallback(async (method = 'GET', headers = {'Content-Type': 'application/json'}) => {

		try {
			const responseHeroes = await fetch(`${_apiUrl}/hero`, {method, headers});

			if (!responseHeroes.ok) {
				throw new Error(`Oops! Something went wrong when trying to request`);
			}

			return await responseHeroes.json();
		} catch (e) {
			throw e;
		}
	}, []);

	const requestFilters = useCallback(async (method = 'GET', headers = {'Content-Type': 'application/json'}) => {

		try {
			const responseFilters = await fetch(`${_apiUrl}/filter`, {method, headers});

			if (!responseFilters.ok) {
				throw new Error(`Oops! Something went wrong when trying to request`);
			}

			return await responseFilters.json();
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

			return await response.json();
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

			return await response.json();
		} catch (e) {
			throw e;
		}
	}, []);


	return {
		requestHeroes,
		requestFilters,
		requestAddHero,
		requestDeleteHero
	}
}