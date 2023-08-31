import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ApatForm from './ApatForm'
import NumberForm from './NumberForm'
import ExerciciForm from './ExerciciForm'
import ShowDate from './helpers/ShowDate'
import { Box, Divider, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';


let greenColor = '#96C291'
let yellowColor = '#FFDBAA'
let redColor = '#FFB7B7'

function CartillaForm(props) {
	let navigate = props.navigate
	let userData = props.userData

	let fruita_init_value = userData.getTodayData("fruita")
	let alcohol_init_value = userData.getTodayData("alcohol")
	let verdura_init_value = userData.getTodayData("verdura")
	let xocolata_init_value = userData.getTodayData("xocolata")
	let dolcos_init_value = userData.getTodayData("dolcos")
	let extresSalats_init_value = userData.getTodayData("extresSalats")

	const fruitaNumberRef = useRef()	
	const verduraNumberRef = useRef()	
	const alcoholNumberRef = useRef()
	const xocolataNumberRef = useRef()
	const dolcosNumberRef = useRef()
	const extresSalatsNumberRef = useRef()

	const [pes, setPes] = useState(()=>{return userData.getTodayData("pes")})
	const [date, setDate] = useState(()=>{return userData.getTodayData("data")})
	const [esmorzar, setEsmorzar] = useState(()=>{return userData.getTodayData("esmorzar")})
	const [migMati, setMigMati] = useState(()=>{return userData.getTodayData("migMati")})
	const [dinar, setDinar] = useState(()=>{return userData.getTodayData("dinar")})
	const [berenar, setBerenar] = useState(()=>{return userData.getTodayData("berenar")})
	const [sopar, setSopar] = useState(()=>{return userData.getTodayData("sopar")})
	const [exercici, setExercici] = useState({ fet:false, tipus:'correr' })
	const [user, setUser] = useState(props.user)

	const hook = () => {
		// Si no hay usuario, entonces navegamos a otra página
		if(user === null){
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

	const OnCartillaSubmit = (event) => {
		event.preventDefault()

		const fruita = fruitaNumberRef.current.getQuantity()
		const alcohol = alcoholNumberRef.current.getQuantity()
		console.log(dinar)
		
		props.OnCartillaSubmit({
			pes, fruita, alcohol, date, dinar, sopar, exercici
		})
		
	}

	const handlePesChange = (event) => {
		setPes(event.target.value)
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
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent:"center",
							marginTop:2
					}}>
						<NumberForm title={'Verdura'} ref={verduraNumberRef} initValue={verdura_init_value} color={greenColor}/> 
						<Divider orientation="vertical" flexItem sx={{m:1}} />
						<NumberForm title={'Fruita'} ref={fruitaNumberRef} initValue={fruita_init_value} color={greenColor}/> 
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent:"center",
							marginTop:2
					}}>
						<NumberForm title={'Xocolata negra'} ref={xocolataNumberRef} initValue={xocolata_init_value} color={redColor}/>
						<Divider orientation="vertical" flexItem sx={{m:1}} />
						<NumberForm title={'Dolços'} ref={dolcosNumberRef} initValue={dolcos_init_value} color={redColor}/>
						<Divider orientation="vertical" flexItem sx={{m:1}} />
						<NumberForm title={'Extres salats'} ref={extresSalatsNumberRef} initValue={extresSalats_init_value} color={redColor}/>
						<Divider orientation="vertical" flexItem sx={{m:1}} />
						<NumberForm title={'Alcohol'} ref={alcoholNumberRef} initValue={alcohol_init_value} color={redColor}/>
					</Box>
					<FormControl sx={{ m: 1, width: '12ch' }} variant="outlined">
						<OutlinedInput
							value={pes} onChange={handlePesChange}
							id="outlined-adornment-weight"
							endAdornment={<InputAdornment position="end">kg</InputAdornment>}
							aria-describedby="outlined-weight-helper-text"
							inputProps={{
							'aria-label': 'weight',
							}}
						/>
						<FormHelperText id="outlined-weight-helper-text">Pes</FormHelperText>
					</FormControl>
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

export default CartillaForm