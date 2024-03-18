import { useDispatch, useSelector } from "react-redux";
import { changeActiveFilter } from "./filtersSlice.js";
import classnames from 'classnames'

const HeroesFilters = () => {

	const activeFilter = useSelector(({filters}) => filters.activeFilter)
	const filters = useSelector(({filters}) => filters.filters)
	const dispatch = useDispatch()

	const renderItems = (arr) => {

		if (arr.length === 0) {
			return <h5 className="text-center mt-5">Фильтры не найдены</h5>
		}

		return arr.map(({name, value, filterClass}) => {
			const buttonClass = classnames('btn', filterClass, {
				'active': activeFilter === value
			})

			return (
				<button
					key={value}
					onClick={() => {
						dispatch(changeActiveFilter(value))
					}}
					className={buttonClass}
				>
					{name}
				</button>
			)
		})
	}

	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					{renderItems(filters)}
				</div>
			</div>
		</div>
	)
}

export default HeroesFilters;