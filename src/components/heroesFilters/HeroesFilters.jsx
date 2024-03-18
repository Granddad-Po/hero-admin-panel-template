// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useDispatch, useSelector } from "react-redux";
import { changeActiveFilter } from "../../actions/index.js";
import classnames from 'classnames'

const HeroesFilters = () => {

	const activeFilter = useSelector(state => state.activeFilter)
	const filters = useSelector(state => state.filters)
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