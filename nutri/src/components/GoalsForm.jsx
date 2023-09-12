import { useState, useEffect, useRef } from 'react'
import ObjectiveNumberForm from './ObjectiveNumberForm'
import NumberForm from './NumberForm'
import { Box, Chip, Divider, TextField } from '@mui/material'
import UserData from '../logic/data/UserData'

let greenColor = '#96C291'
let yellowColor = '#FFBA86'
let redColor = '#FFB7B7'

const userData = UserData.getInstance()

function GoalsForm(props) {
	let navigate = props.navigate

	let submitLabel = userData.isGoalsSet? "Actualitzar": "Desar"

	let fruita_init_value = userData.getGoalsData("fruita")
	let alcohol_init_value = userData.getGoalsData("alcohol")
	let refrescos_init_value = userData.getGoalsData("refrescos")
	let verdura_init_value = userData.getGoalsData("verdura")
	let xocolata_init_value = userData.getGoalsData("xocolata")
	let dolcos_init_value = userData.getGoalsData("dolcos")
	let extresSalats_init_value = userData.getGoalsData("extresSalats")
	let forca_init_value = userData.getGoalsData("forca")
	let cardio_init_value = userData.getGoalsData("cardio")
	let pes_init_value = userData.getGoalsData("pes")

	const fruitaNumberRef = useRef()	
	const verduraNumberRef = useRef()	
	const alcoholNumberRef = useRef()
	const xocolataNumberRef = useRef()
	const dolcosNumberRef = useRef()
	const refrescosNumberRef = useRef()
	const extresSalatsNumberRef = useRef()
	const pesNumberRef = useRef()
	const forcaNumberRef = useRef()
	const cardioNumberRef = useRef()
	
	const [user, setUser] = useState(props.user)

	const hook = () => {
		// Si no hay usuario, entonces navegamos a otra página
		if(user === null){
			returnToHome()
		}
	}

	useEffect(hook, [])

	const OnGoalsSubmit = (event) => {
		event.preventDefault()

		const fruita = fruitaNumberRef.current.getQuantity()
		const alcohol = alcoholNumberRef.current.getQuantity()
		const dolcos = dolcosNumberRef.current.getQuantity()
		const verdura = verduraNumberRef.current.getQuantity()
		const xocolata = xocolataNumberRef.current.getQuantity()
		const extresSalats = extresSalatsNumberRef.current.getQuantity()
		const refrescos = refrescosNumberRef.current.getQuantity()
		const forca = forcaNumberRef.current.getQuantity()
		const cardio = cardioNumberRef.current.getQuantity()
		const pes = pesNumberRef.current.getQuantity()

		props.OnGoalsSubmit({
			fruita, verdura, xocolata, dolcos, extresSalats, alcohol, refrescos, forca, cardio, pes
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
			<div>Usuari: {user.username}</div>
			<h1>Objectius</h1>
			<div>
				<form onSubmit={OnGoalsSubmit}>
				<Divider maxwidth="md" sx={{m:1}}>
					<Chip label="Menjar"/>
				</Divider>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent:"center",
						marginTop:2
						}}>
					<ObjectiveNumberForm ref={verduraNumberRef} initValue={verdura_init_value} title={'Verdura'} color={greenColor} />
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					<ObjectiveNumberForm ref={fruitaNumberRef} initValue={fruita_init_value} title={'Fruita'} color={greenColor}/>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent:"center",
						marginTop:2
						}}>
					<ObjectiveNumberForm ref={xocolataNumberRef} initValue={xocolata_init_value} title={'Xocolata'} color={redColor}/>
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					<ObjectiveNumberForm ref={dolcosNumberRef} initValue={dolcos_init_value} title={'Dolços'} color={redColor}/>
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					<ObjectiveNumberForm ref={extresSalatsNumberRef} initValue={extresSalats_init_value} title={'Extres Salats'} color={redColor}/>
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					<ObjectiveNumberForm ref={alcoholNumberRef} initValue={alcohol_init_value} title={'Alcohol'} color={redColor}/>
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					<ObjectiveNumberForm ref={refrescosNumberRef} initValue={refrescos_init_value} title={'Refrescos'} color={redColor}/>
				</Box>
				<Divider maxwidth="md" sx={{mt:2}}>
					<Chip label="Exercici físic"/>
				</Divider>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent:"center",
						marginTop:2
						}}>
					<ObjectiveNumberForm ref={forcaNumberRef} initValue={forca_init_value} title={'Força'} color={yellowColor}/>
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					<ObjectiveNumberForm ref={cardioNumberRef} initValue={cardio_init_value} title={'Cardio'} color={yellowColor}/>
				</Box>
				<Divider maxwidth="md" sx={{mt:2}}>
					<Chip label="Altres"/>
				</Divider>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent:"center",
						marginTop:2,
						mb:2
						}}>
					<NumberForm ref={pesNumberRef} initValue={forca_init_value} title={'Pes'}/>
				</Box>
					<div>
						<button type="submit">{submitLabel}</button>
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