import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroesDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem.jsx";
import Spinner from '../spinner/Spinner.jsx';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import './heroesList.scss'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

	const filteredHeroes = useSelector(state => state.filteredHeroes)
	const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus)

	const dispatch = useDispatch();
	const {requestAll, requestDeleteHero} = useHttp();

	useEffect(() => {
		return () => {
			dispatch(heroesFetching());
			requestAll()
				.then((data) => dispatch(heroesFetched(data)))
				.catch(() => dispatch(heroesFetchingError()))
		}
		// eslint-disable-next-line
	}, []);

	const deleteHero = async (id) => {
		await requestDeleteHero(id)
			.then(() => dispatch(heroesDelete(id)))
			.catch(() => dispatch(heroesFetchingError()))
	}

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return (
				<CSSTransition timeout={500} classNames="hero">
					<h5 className="text-center mt-5">Героев пока нет</h5>
				</CSSTransition>

			)
		}

		return arr.map((props) => {
			return (
				<CSSTransition key={props.id} timeout={500} classNames="hero">
					<HeroesListItem {...props} deleteHero={deleteHero} />
				</CSSTransition>
			)
		})
	}

	const elements = renderHeroesList(filteredHeroes);
	return (
		<TransitionGroup component="ul">
			{elements}
		</TransitionGroup>
	)
}

export default HeroesList;