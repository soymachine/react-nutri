import { useState } from 'react'
import Checkbox from './Checkbox'

function ExerciciForm({ cb_label, setModel, model }) {
	const [checked, setChecked] = useState(false)
	const [value, setDropdownValue] = useState(model)

	const handleChange = () => {
		let isChecked = !checked
		setChecked(isChecked)
		setModel({ ...model, fet:isChecked })
	}

	const handleDropdownChange = (event) => {
		let tipusExercici = event.target.value
		setModel({ ...model, tipus:tipusExercici })
		setDropdownValue(tipusExercici.value)
	}

	const options = [
		{ label: 'Correr', value: 'correr' },
		{ label: 'Força', value: 'força' },
	]

	let select = ''

	if(checked){
		select = <select value={value} onChange={handleDropdownChange}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>{option.label}</option>
			))}
		</select>

	}

	return (
		<>
			<Checkbox label={cb_label} value={checked} onChange={handleChange} />
			{select}
		</>
	)
}

export default ExerciciForm