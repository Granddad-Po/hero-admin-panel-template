import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem.jsx";
import Spinner from '../spinner/Spinner.jsx';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDeleteHeroMutation, useGetHeroesQuery } from "../../api/apiSlice.js";

import './heroesList.scss'


const HeroesList = () => {

	const {data: heroes = [], isLoading, isError} = useGetHeroesQuery()
	const [deleteHeroById] = useDeleteHeroMutation()
	const activeFilter = useSelector(state => state.filters.activeFilter)


	const filteredHeroes = useMemo(() => {
		return activeFilter === 'all'
			? heroes
			: heroes.filter(hero => hero.element === activeFilter)
	}, [heroes, activeFilter])

	const deleteHero = (id) => {
		deleteHeroById(id)
	}

	if (isLoading) {
		return <Spinner />;
	} else if (isError) {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return (
				<CSSTransition timeout={0} classNames="hero">
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