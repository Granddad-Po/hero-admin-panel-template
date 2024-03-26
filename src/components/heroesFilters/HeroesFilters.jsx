import { useDispatch, useSelector } from "react-redux";
import {
	changeActiveFilter,
	selectActiveFilter,
	selectAll,
	selectFiltersLoadingStatus
} from "./filtersSlice.js";
import classnames from 'classnames'
import Spinner from "../spinner/Spinner.jsx";

const HeroesFilters = () => {

	const filters = useSelector(selectAll)
	const activeFilter = useSelector(selectActiveFilter)
	const filtersLoadingStatus = useSelector(selectFiltersLoadingStatus)
	const dispatch = useDispatch()

	const renderItems = (arr) => {

		if (filtersLoadingStatus === 'loading') {
			return <Spinner />
		}

		if (filtersLoadingStatus === 'idle' && arr.length === 0) {
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