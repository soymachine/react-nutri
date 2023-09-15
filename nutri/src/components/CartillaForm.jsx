import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ApatForm from './ApatForm'
import NumberForm from './NumberForm'
import ExerciciForm from './ExerciciForm'
import ShowDate from './helpers/ShowDate'
import CustomBackdrop from './helpers/CustomBackdrop'
import { Box, Chip, Container, Divider, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import UserData from '../logic/data/UserData'
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';

let greenColor = '#96C291'
let yellowColor = '#FFDBAA'
let redColor = '#FFB7B7'
const userData = UserData.getInstance()

function CartillaForm(props) {
	console.log("[CartillaForm]")
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
	const [date, setDate] = useState(()=>{return userData.getTodayData("data")})
	const [esmorzar, setEsmorzar] = useState(()=>{return userData.getTodayData("esmorzar")})
	const [migMati, setMigMati] = useState(()=>{return userData.getTodayData("migMati")})
	const [dinar, setDinar] = useState(()=>{return userData.getTodayData("dinar")})
	const [berenar, setBerenar] = useState(()=>{return userData.getTodayData("berenar")})
	const [sopar, setSopar] = useState(()=>{return userData.getTodayData("sopar")})
	const [forca, setForca] = useState(()=>{return userData.getTodayData("forca")})
	const [cardio, setCardio] = useState(()=>{return userData.getTodayData("cardio")})
	const [user, setUser] = useState(props.user)
	const [openBackdrop, setOpenBackdrop] = useState(false)
	const [value, setValue] = useState(dayjs(new Date().toString()));
	
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
		
	}

	useEffect(hook, [])

	const dataUpdateHook = () => {
		console.log("Data updated")
		setEsmorzar(userData.getTodayData("esmorzar"))
		setMigMati(userData.getTodayData("migMati"))
		setDinar(userData.getTodayData("dinar"))
		setBerenar(userData.getTodayData("berenar"))
		setSopar(userData.getTodayData("sopar"))
	}

	console.log(`esmorzar:`)
	console.log(userData.getTodayData("esmorzar"))
	console.log(esmorzar)

	useEffect(dataUpdateHook, [props])

	const handleCloseBackdrop = () => {
		setOpenBackdrop(false);
	};

	const OnCartillaSubmit = (event) => {
		event.preventDefault()
		console.log("OnCartillaSubmit")
		setOpenBackdrop(true)
		
		setTimeout(handleCloseBackdrop, 3000);

		const pes = pesNumberRef.current.getQuantity()		
		const sendObject = {}
		sendObject["pes"] = pes
		sendObject["esmorzar"] = esmorzar
		sendObject["migMati"] = migMati
		sendObject["dinar"] = dinar
		sendObject["berenar"] = berenar
		sendObject["sopar"] = sopar
		sendObject["date"] = date

		userData.hasCamp("fruita")? sendObject["fruita"] = fruitaNumberRef.current.getQuantity():null
		userData.hasCamp("dolcos")? sendObject["dolcos"] = dolcosNumberRef.current.getQuantity():null
		userData.hasCamp("alcohol")? sendObject["alcohol"] = alcoholNumberRef.current.getQuantity():null
		userData.hasCamp("forca")? sendObject["forca"] = forca:null
		userData.hasCamp("cardio")? sendObject["cardio"] = cardio:null
		userData.hasCamp("xocolata")? sendObject["xocolata"] = xocolataNumberRef.current.getQuantity():null
		userData.hasCamp("verdura")? sendObject["verdura"] = verduraNumberRef.current.getQuantity():null
		userData.hasCamp("extresSalats")? sendObject["extresSalats"] = extresSalatsNumberRef.current.getQuantity():null
		userData.hasCamp("refrescos")? sendObject["refrescos"] = refrescosNumberRef.current.getQuantity():null
		
		props.OnCartillaSubmit(sendObject)
		
	}

	// console.log("[CartillaForm] openBackdrop " + openBackdrop)

	const returnToHome = () => {
		navigate('/')
	}

	const onChangeDatePicker = (newValue)=>{
		console.log(newValue)
		setValue(newValue)

		props.OnCartillaNewDataSelected(newValue)
	}

	const plantillaForm = () => (
		<>
			<CustomBackdrop openBackdrop={openBackdrop} responseFromServer={props.responseFromServer}></CustomBackdrop>
		
			<div>Usuario: {user.username}</div>
			<h1>Dades alimenticies/físiques</h1>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb" >
				<DatePicker
				label="Data:"
				value={value}
				onChange={onChangeDatePicker}
				sx={{mb:3.5}}
				/>
			</LocalizationProvider>
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
						{userData.hasCamp("verdura")? <NumberForm title={'Verdura'} ref={verduraNumberRef} initValue={verdura_init_value} color={greenColor}/>: <div></div>} 
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