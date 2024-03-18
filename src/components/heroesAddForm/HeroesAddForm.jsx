import { useForm } from 'react-hook-form'
import { useHttp } from "../../hooks/http.hook.js";
import { useDispatch, useSelector } from "react-redux";
import { heroesCreated, heroesFetchingError } from "../heroesList/heroesSlice.js";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uuid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const {requestAddHero} = useHttp()
	const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const filters = useSelector(({filters}) => filters.filters)

    const onSubmit = (data) => {
        const hero = JSON.stringify({name: data.name, description: data.text, element: data.element})
        requestAddHero(hero)
            .then((data) => dispatch(heroesCreated(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="border p-4 shadow-lg rounded">
			<div className="mb-3">
				<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
				<input
					required
					type="text"
                    {...register("name")}
					className="form-control"
					id="name"
					placeholder="Как меня зовут?" />
			</div>

			<div className="mb-3">
				<label htmlFor="text" className="form-label fs-4">Описание</label>
				<textarea
					required
                    {...register("text")}
					className="form-control"
					id="text"
					placeholder="Что я умею?"
					style={{"height": '130px'}} />
			</div>

			<div className="mb-3">
				<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
				<select
					required
					className="form-select"
					id="element"
                    {...register("element")}>
					<option value="">Я владею элементом...</option>
                    {filters.map(item => {
                        if (item.value === 'all') return null
                        return (
                            <option key={item.value} value={item.value}>{item.name}</option>
                        )
                    })}
				</select>
			</div>

			<button type="submit" className="btn btn-primary">Создать</button>
		</form>
	)
}

export default HeroesAddForm;