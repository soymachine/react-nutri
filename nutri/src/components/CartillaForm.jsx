import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ApatForm from './ApatForm'
import NumberForm from './NumberForm'
import ExerciciForm from './ExerciciForm'
import ShowDate from './helpers/ShowDate'
import { Box, Chip, Container, Divider, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import UserData from '../logic/data/UserData'

let greenColor = '#96C291'
let yellowColor = '#FFDBAA'
let redColor = '#FFB7B7'
const userData = UserData.getInstance()

function CartillaForm(props) {
	let navigate = props.navigate
	//let userData = props.userData
	let submitLabel = userData.isTodayDataSet? "Actualitzar": "Desar"

	let fruita_init_value = userData.getTodayData("fruita")
	let alcohol_init_value = userData.getTodayData("alcohol")
	let refrescos_init_value = userData.getTodayData("refrescos")
	let verdura_init_value = userData.getTodayData("verdura")
	let xocolata_init_value = userData.getTodayData("xocolata")
	let dolcos_init_value = userData.getTodayData("dolcos")
	let extresSalats_init_value = userData.getTodayData("extresSalats")
	let forca_init_value = userData.getTodayData("forca")
	let cardio_init_value = userData.getTodayData("cardio")
	let pes_init_value = userData.getTodayData("pes")

	const fruitaNumberRef = useRef()	
	const verduraNumberRef = useRef()	
	const alcoholNumberRef = useRef()
	const xocolataNumberRef = useRef()
	const dolcosNumberRef = useRef()
	const refrescosNumberRef = useRef()
	const extresSalatsNumberRef = useRef()
	const pesNumberRef = useRef()

	const [hasData, setHasData] = useState(false)
	const [pes, setPes] = useState(()=>{return userData.getTodayData("pes")})
	const [date, setDate] = useState(()=>{return userData.getTodayData("data")})
	const [esmorzar, setEsmorzar] = useState(()=>{return userData.getTodayData("esmorzar")})
	const [migMati, setMigMati] = useState(()=>{return userData.getTodayData("migMati")})
	const [dinar, setDinar] = useState(()=>{return userData.getTodayData("dinar")})
	const [berenar, setBerenar] = useState(()=>{return userData.getTodayData("berenar")})
	const [sopar, setSopar] = useState(()=>{return userData.getTodayData("sopar")})
	const [forca, setForca] = useState(()=>{return userData.getTodayData("forca")})
	const [cardio, setCardio] = useState(()=>{return userData.getTodayData("cardio")})
	const [user, setUser] = useState(props.user)

	const hook = () => {
		// Si no hay usuario, entonces navegamos a otra página
		if(props.user == null || props.user == "") {
			returnToHome()
		}

		// Get date if not userData.isTodayDataSet
		if(userData.isTodayDataSet){
			console.log(`data? ${userData.getTodayData("data")}`)
			
			console.log(userData.getTodayData("data"))
			// setDate(dat)
		}else{
			setDate(new Date().toString())
		}

		// Depending on the date and the 
	}

	useEffect(hook, [])

	const dataUpdateHook = () => {
		console.log("Data updated")
	}

	useEffect(dataUpdateHook, [userData.isTodayDataSet])

	const OnCartillaSubmit = (event) => {
		event.preventDefault()

		const fruita = fruitaNumberRef.current.getQuantity()
		const alcohol = alcoholNumberRef.current.getQuantity()
		const dolcos = dolcosNumberRef.current.getQuantity()
		const verdura = verduraNumberRef.current.getQuantity()
		const xocolata = xocolataNumberRef.current.getQuantity()
		const extresSalats = extresSalatsNumberRef.current.getQuantity()
		const refrescos = refrescosNumberRef.current.getQuantity()
		const pes = pesNumberRef.current.getQuantity()
		//console.log(dinar)
		
		props.OnCartillaSubmit({
			pes, fruita, dolcos, alcohol, date, esmorzar, migMati, dinar, berenar, sopar, forca, cardio, xocolata, verdura, extresSalats, refrescos
		})
		
	}

	const returnToHome = () => {
		navigate('/')
	}

	const plantillaForm = () => (
		<>
			<div>Usuario: {user.username}</div>
			<h1>Dades d'avui</h1>
			<ShowDate dateString={date} />
			<div>
				<form onSubmit={OnCartillaSubmit}>
					<ApatForm title={'Esmorzar'} setModel={setEsmorzar} model={esmorzar}/>
					<ApatForm title={'Mig Matí'} setModel={setMigMati} model={migMati}/>
					<ApatForm title={'Dinar'} setModel={setDinar} model={dinar}/>
					<ApatForm title={'Berenar'} setModel={setBerenar} model={berenar}/>
					<ApatForm title={'Sopar'} setModel={setSopar} model={sopar}/>
					<Divider maxwidth="md">
						<Chip label="Altres objectius"/>
					</Divider>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent:"center",
							marginTop:2
					}}>
						{userData.hasCamp("verdures")? <NumberForm title={'Verdura'} ref={verduraNumberRef} initValue={verdura_init_value} color={greenColor}/>: <div></div>} 
						<Divider orientation="vertical" flexItem sx={{m:1}} />
						{userData.hasCamp("fruita")? <NumberForm title={'Fruita'} ref={fruitaNumberRef} initValue={fruita_init_value} color={greenColor}/>: <div></div>} 
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent:"center",
							marginTop:2,
							marginBottom:2
					}}>
						{userData.hasCamp("xocolata")? <NumberForm title={'Xocolata negra'} ref={xocolataNumberRef} initValue={xocolata_init_value} color={redColor}/>: <div></div>} 
						<Divider orientation="vertical" flexItem sx={{m:1}} />
						{userData.hasCamp("dolcos")? <NumberForm title={'Dolços'} ref={dolcosNumberRef} initValue={dolcos_init_value} color={redColor}/>: <div></div>} 
						<Divider orientation="vertical" flexItem sx={{m:1}} />
						{userData.hasCamp("extresSalats")? <NumberForm title={'Extres salats'} ref={extresSalatsNumberRef} initValue={extresSalats_init_value} color={redColor}/>: <div></div>} 
						<Divider orientation="vertical" flexItem sx={{m:1}} />
						{userData.hasCamp("alcohol")? <NumberForm title={'Alcohol'} ref={alcoholNumberRef} initValue={alcohol_init_value} color={redColor}/>: <div></div>} 
						<Divider orientation="vertical" flexItem sx={{m:1}} />
						{userData.hasCamp("refrescos")? <NumberForm title={'Refrescos'} ref={refrescosNumberRef} initValue={refrescos_init_value} color={redColor}/>: <div></div>} 
					</Box>
					<Divider maxwidth="md">
						<Chip label="Pes"/>
					</Divider>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent:"center",
							marginTop:2,
							marginBottom:2
					}}>
						<NumberForm ref={pesNumberRef} initValue={pes_init_value} title={'Kg.'}/>						
					</Box>
					<Divider maxwidth="md" sx={{mt:1}}>
							<Chip label="Activitat física"/>
						</Divider>
					<ExerciciForm setForca={setForca} setCardio={setCardio} forca={forca_init_value} cardio={cardio_init_value}/>
					<div>
						<button type="submit">{submitLabel}</button>
					</div>

				</form>
			</div>
		</>
	)


	const checkRender = () => {

		if(props.user != null && props.user != "") {
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

export default CartillaForm