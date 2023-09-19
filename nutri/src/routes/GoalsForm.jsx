import { useState, useEffect, useRef } from 'react'
import ObjectiveNumberForm from '../components/ObjectiveNumberForm'
import NumberForm from '../components/NumberForm'
import { Box, Chip, Divider, TextField, Alert, AlertTitle } from '@mui/material'
import UserData from '../logic/data/UserData'
import CustomBackdrop from '../components/helpers/CustomBackdrop'

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
	const [open, setOpen] = useState(true);
	const [openBackdrop, setOpenBackdrop] = useState(false)
	

	const hook = () => {
		// Si no hay usuario, entonces navegamos a otra página
		if(user === null){
			returnToHome()
		}
	}

	useEffect(hook, [])

	const handleCloseBackdrop = () => {
		setOpenBackdrop(false);
	};

	if(props.responseFromServer) setTimeout(handleCloseBackdrop, 3000);

	const OnGoalsSubmit = (event) => {
		event.preventDefault()
		setOpenBackdrop(true)	

		const pes = pesNumberRef.current.getQuantity()
		const sendObject = {}
		sendObject["pes"] = pes
		
		userData.hasCamp("fruita")? sendObject["fruita"] = fruitaNumberRef.current.getQuantity():null
		userData.hasCamp("dolcos")? sendObject["dolcos"] = dolcosNumberRef.current.getQuantity():null
		userData.hasCamp("alcohol")? sendObject["alcohol"] = alcoholNumberRef.current.getQuantity():null
		userData.hasCamp("forca")? sendObject["forca"] = forcaNumberRef.current.getQuantity():null
		userData.hasCamp("cardio")? sendObject["cardio"] = cardioNumberRef.current.getQuantity():null
		userData.hasCamp("xocolata")? sendObject["xocolata"] = xocolataNumberRef.current.getQuantity():null
		userData.hasCamp("verdura")? sendObject["verdura"] = verduraNumberRef.current.getQuantity():null
		userData.hasCamp("extresSalats")? sendObject["extresSalats"] = extresSalatsNumberRef.current.getQuantity():null
		userData.hasCamp("refrescos")? sendObject["refrescos"] = refrescosNumberRef.current.getQuantity():null
		//console.log("OnGoalsSubmit")
		//console.log(sendObject)
		props.OnGoalsSubmit(sendObject)
	}

	const returnToHome = () => {
		navigate('/')
	}

	const plantillaForm = () => (
		<>
			<CustomBackdrop openBackdrop={openBackdrop} responseFromServer={props.responseFromServer}></CustomBackdrop>
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
					{userData.hasCamp("verdura")? <ObjectiveNumberForm ref={verduraNumberRef} initValue={verdura_init_value} title={'Verdura'} color={greenColor} />: <div></div>} 
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					{userData.hasCamp("fruita")? <ObjectiveNumberForm ref={fruitaNumberRef} initValue={fruita_init_value} title={'Fruita'} color={greenColor}/>: <div></div>} 
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent:"center",
						marginTop:2
						}}>
					{userData.hasCamp("xocolata")? <ObjectiveNumberForm ref={xocolataNumberRef} initValue={xocolata_init_value} title={'Xocolata'} color={redColor}/>: <div></div>} 
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					{userData.hasCamp("dolcos")? <ObjectiveNumberForm ref={dolcosNumberRef} initValue={dolcos_init_value} title={'Dolços'} color={redColor}/>: <div></div>} 
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					{userData.hasCamp("extresSalats")? <ObjectiveNumberForm ref={extresSalatsNumberRef} initValue={extresSalats_init_value} title={'Extres Salats'} color={redColor}/>: <div></div>} 
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					{userData.hasCamp("alcohol")? <ObjectiveNumberForm ref={alcoholNumberRef} initValue={alcohol_init_value} title={'Alcohol'} color={redColor}/>: <div></div>} 
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					{userData.hasCamp("refrescos")? <ObjectiveNumberForm ref={refrescosNumberRef} initValue={refrescos_init_value} title={'Refrescos'} color={redColor}/>: <div></div>} 
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
					{userData.hasCamp("forca")?<ObjectiveNumberForm ref={forcaNumberRef} initValue={forca_init_value} title={'Força'} color={yellowColor}/>: <div></div>} 
					<Divider orientation="vertical" flexItem sx={{m:1}} />
					{userData.hasCamp("cardio")?<ObjectiveNumberForm ref={cardioNumberRef} initValue={cardio_init_value} title={'Cardio'} color={yellowColor}/>: <div></div>} 
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
					<NumberForm ref={pesNumberRef} initValue={pes_init_value} title={'Pes'}/>
					
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