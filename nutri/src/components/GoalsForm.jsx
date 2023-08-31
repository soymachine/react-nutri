import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ApatForm from './ApatForm'
import NumberForm from './NumberForm'
import ExerciciForm from './ExerciciForm'

function GoalsForm(props) {
	let navigate = props.navigate

	const [fruita, setFruita] = useState(3)
	const [pes, setPes] = useState(60)
	const [alcohol, setAlcohol] = useState(1)
	const [date, setDate] = useState('')
	const [dinar, setDinar] = useState({})
	const [sopar, setSopar] = useState({})
	const [exercici, setExercici] = useState({ fet:false, tipus:'correr' })
	const [user, setUser] = useState(props.user)

	const hook = () => {
		// Si no hay usuario, entonces navegamos a otra página
		if(user === null){
			returnToHome()
		}

		// Get date
		setDate(new Date().toString())
	}

	useEffect(hook, [])

	const OnCartillaSubmit = (event) => {
		event.preventDefault()
		props.OnCartillaSubmit({
			pes, fruita, alcohol, date, dinar, sopar, exercici
		})
	}

	const handleFruitaChange = (event) => {
		setFruita(event.target.value)
	}

	const handlePesChange = (event) => {
		setPes(event.target.value)
	}

	const handleAlcoholChange = (event) => {
		setAlcohol(event.target.value)
	}

	const returnToHome = () => {
		navigate('/')
	}

	const plantillaForm = () => (
		<>
			<div>Usuario: {user.username}</div>
			<h1>Metas</h1>

			<div>Fecha: {date}</div>
			<div>
				<form onSubmit={OnCartillaSubmit}>
					<NumberForm title={'Fruita'} setModel={setFruita} model={fruita}/>
					<ApatForm title={'Dinar'} setModel={setDinar} model={dinar}/>
					<ApatForm title={'Sopar'} setModel={setSopar} model={sopar}/>
					<div>
                    Pes: <input value={pes} onChange={handlePesChange} />
					</div>
					<NumberForm title={'Alcohol'} setModel={setAlcohol} model={alcohol}/>
					<ExerciciForm cb_label={'Exercici?'} setModel={setExercici} model={exercici}/>
					<div>
						<button type="submit">Save</button>
					</div>

				</form>
			</div>
		</>
	)


	const checkRender = () => {

		if(user != null) {
			return plantillaForm()
		}else{
			return <></>
		}
	}

	return (
		<>
			{checkRender()}
		</>
	)
}

export default GoalsForm