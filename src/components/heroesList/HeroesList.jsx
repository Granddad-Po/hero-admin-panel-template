import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHeroes, fetchDeleteHeroes, selectFilteredHeroes } from './heroesSlice.js';
import HeroesListItem from "../heroesListItem/HeroesListItem.jsx";
import Spinner from '../spinner/Spinner.jsx';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import './heroesList.scss'
import { fetchFilters } from "../heroesFilters/filtersSlice.js";


const HeroesList = () => {

	const filteredHeroes = useSelector(selectFilteredHeroes)
	const heroesLoadingStatus = useSelector(({heroes}) => heroes.heroesLoadingStatus)

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(fetchHeroes())
			dispatch(fetchFilters())
		}
		// eslint-disable-next-line
	}, []);

	const deleteHero = (id) => {
		dispatch(fetchDeleteHeroes(id))
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
					<HeroesListItem {...props} deleteHero={() => deleteHero(props.id)} />
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