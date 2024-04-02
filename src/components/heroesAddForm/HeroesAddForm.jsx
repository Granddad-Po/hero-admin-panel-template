import { useForm } from 'react-hook-form'
import { useEffect } from "react";
import { useCreateHeroMutation, useGetFiltersQuery } from "../../api/apiSlice.js";

const HeroesAddForm = () => {

	const {
		register,
		handleSubmit,
		reset,
		formState
	} = useForm()
	const [createHero] = useCreateHeroMutation()
	const {data: filters = []} = useGetFiltersQuery()

	const onSubmit = (data) => {
		const hero = {name: data.name, description: data.text, element: data.element}
		createHero(hero).unwrap()
		if (formState.isSubmitSuccessful) {
			reset()
		}
	}

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset()
		}
	}, [formState]);

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