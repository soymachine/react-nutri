import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ApatForm from '../components/ApatForm'
import NumberForm from '../components/NumberForm'
import ExerciciForm from '../components/ExerciciForm'
import CustomBackdrop from '../components/helpers/CustomBackdrop'
import { Box, Chip, Container, Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UserData from '../logic/data/UserData'
import Models from '../logic/data/Models'
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Circle } from '@mui/icons-material'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


let greenColor = '#96C291'
let lightGreenColor = "#96c2912e"
let yellowColor = '#FFDBAA'
let lightYellowColor = '#FFDBAA'
let redColor = '#A73121'
let lightRedColor = '#a731211a'
let lightGreyColor = '#00000003'
let blueColor = '#0E21A0'
let lightBlueColor = '#0E21A0'
let pinkColor = '#9400FF'
let lightPinkColor = '#9400FF'
const userData = UserData.getInstance()
const models = Models.getInstance()
let dadesFuturesString = "(Estem a una data futura)"
let dadesPasadesString = "(Estem a una data del pasat)"
let dadesActualsString = "(Dades d'avui)"

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
	const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

	// Construir un array con los datos rellenados de esta semana

	const dataCartillas = userData.getCartillasFromCurentWeek(value.toDate())


	const returnInfoDate = ()=>{
		const today = dayjs(new Date().toString())
		
		let sameDay = false
		if(today.year() == value.year()){
			
			if(today.month() == value.month()){
				if(today.date() == value.date()){
					sameDay = true
				}
			}			
		}
		
		if(!sameDay){
			const dif = today - value
			if(dif <0){
				// estamos en el futuro
				return dadesFuturesString
			}else
			{
				// estamos en el pasado
				return dadesPasadesString
			}
		}else{
			return dadesActualsString
		}
	}

	const returnColorDate = ()=>{
		const dateString = returnInfoDate()
		if(dateString == dadesFuturesString){
			return pinkColor
		}else if(dateString == dadesPasadesString){
			return redColor
		}else if(dateString == dadesActualsString){
			return blueColor
		}
	}

	const colorForDatePicker = returnColorDate()
	
	const hook = () => {
		// Si no hay usuario, entonces navegamos a otra página
		if(props.user == null || props.user == "") {
			returnToHome()
		}

		// Get date if not userData.isTodayDataSet
		if(userData.isTodayDataSet){
			//console.log(`data? ${userData.getTodayData("data")}`)			
			//console.log(userData.getTodayData("data"))
			// setDate(dat)
		}else{
			setDate(new Date().toString())
		}
		
	}

	useEffect(hook, [])

	const dataUpdateHook = () => {
		console.log(`Data updated userData.isTodayDataSet:${userData.isTodayDataSet}`) // 
		setEsmorzar(userData.getTodayData("esmorzar"))
		setMigMati(userData.getTodayData("migMati"))
		setDinar(userData.getTodayData("dinar"))
		setBerenar(userData.getTodayData("berenar"))
		setSopar(userData.getTodayData("sopar"))
	}

	useEffect(dataUpdateHook, [props, userData.isTodayDataSet])

	const handleCloseBackdrop = () => {
		setOpenBackdrop(false);
	};

	const OnCartillaSubmit = (event) => {
		event.preventDefault()
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
		setValue(newValue)
		setDate(newValue.toDate())
		props.OnCartillaNewDataSelected(newValue)
	}

	function CustomDay({ selectedDay, ...other }) {
		// do something with 'selectedDay'
		let backgroundColor = "#FFFFFF"

		let hasData = userData.yearData.find(currentCartilla =>{

			let date = new Date(currentCartilla.date)
			let day = date.getDate()
			let year = date.getFullYear()
			let month = date.getMonth()
			
			return (day == other.day.$D && year == other.day.$y && month == other.day.$M)
		})
				
		const style = {
			position:"absolute",
			width:8,
			height:8,
			top:24,
			zIndex:1,
			color:"#87b3df"
		}
		
		const renderDay = (hasData)=>{
			if(hasData){
				return (<PickersDay {...other}>
							<Circle sx={{position:"relative"}} style={style}/>
							{other.day.$D}
						</PickersDay>)
			}else{
				return (<PickersDay {...other}>
					{other.day.$D}
				</PickersDay>)
			}
		}
		return renderDay(hasData)
	  }

	const plantillaForm = () => (
		<>
			<CustomBackdrop openBackdrop={openBackdrop} responseFromServer={props.responseFromServer}></CustomBackdrop>
			<h1>Dades diaries</h1>
			<Box
				sx={{
					marginTop: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb" >
								<DatePicker
									label="Data:"
									value={value}
									onChange={onChangeDatePicker}
									
									slots={{ day: CustomDay }}

									sx={{
										mb:1,
										"& .MuiInputLabel-root": {color: `${colorForDatePicker}`},
										"& .MuiInputBase-root": {
										"& > fieldset": { borderColor: `${colorForDatePicker}` },
										},
										"& .MuiButtonBase-root":{ color: `${colorForDatePicker}` },
									}}

								/>
								
				</LocalizationProvider>
				<Typography sx={{mb:4, fontSize:12, color: `${colorForDatePicker}`}} component="h1" variant="h5">
					{returnInfoDate()}
				</Typography>
				
			</Box>
			
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
					<TableContainer sx={{mt:3, mb:3}} component={Paper}>
						<Table sx={{}} aria-label="simple table">
							<TableHead>
								<TableRow sx={{backgroundColor:lightGreyColor,
									'& .MuiTableCell-root':{fontWeight:700} }}>
									<TableCell>Tipus</TableCell>
									<TableCell align="center" >Avui</TableCell>
									<TableCell align="right">Acumulat setmana</TableCell>
									<TableCell align="right">Màxim diari</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{/* ROWS aqui, condicionales según usuario */}
								{userData.hasCamp("verdura") &&
									<TableRow
										key="verdura"
										sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:lightGreenColor }}
										>
										<TableCell component="th" scope="row">Verdura</TableCell>
										<TableCell align="center" >
											<NumberForm hasTitle={false} title={'Verdura'} ref={verduraNumberRef} initValue={verdura_init_value} color={greenColor}/>
										</TableCell>
										<TableCell align="right">{"2/" + userData.user.maxims["verdura"].setmana}</TableCell>
										<TableCell align="right">{userData.user.maxims["verdura"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("fruita") &&
									<TableRow
										key="fruita"
										sx={{ '&:last-child td, &:last-child th': { border: 0},backgroundColor:lightGreenColor }}
										>
										<TableCell component="th" scope="row">Fruita</TableCell>
										<TableCell align="center">
											<NumberForm hasTitle={false} title={'Fruita'} ref={fruitaNumberRef} initValue={fruita_init_value} color={greenColor}/>
										</TableCell>
										<TableCell align="right">{"2/" + userData.user.maxims["fruita"].setmana}</TableCell>
										<TableCell align="right">{userData.user.maxims["fruita"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("xocolata") &&
									<TableRow
										key="xocolata"
										sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:lightRedColor }}
										>
										<TableCell component="th" scope="row">Xocolata</TableCell>
										<TableCell align="center">
											<NumberForm hasTitle={false} title={'Xocolata negra'} ref={xocolataNumberRef} initValue={xocolata_init_value} color={redColor}/>	
										</TableCell>
										<TableCell align="right">{"2/" + userData.user.maxims["xocolata"].setmana}</TableCell>
										<TableCell align="right">{userData.user.maxims["xocolata"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("dolcos") &&
									<TableRow
										key="dolcos"
										sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:lightRedColor }}
										>
										<TableCell component="th" scope="row">Dolços</TableCell>
										<TableCell align="center">
											<NumberForm hasTitle={false} title={'Dolços'} ref={dolcosNumberRef} initValue={dolcos_init_value} color={redColor}/>
										</TableCell>
										<TableCell align="right">{"2/" + userData.user.maxims["dolcos"].setmana}</TableCell>
										<TableCell align="right">{userData.user.maxims["dolcos"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("extresSalats") &&
									<TableRow
										key="extresSalats"
										sx={{ '&:last-child td, &:last-child th': { border: 0 } ,backgroundColor:lightRedColor}}
										>
										<TableCell component="th" scope="row">Extres Salats</TableCell>
										<TableCell align="center">
											<NumberForm hasTitle={false} title={'Extres salats'} ref={extresSalatsNumberRef} initValue={extresSalats_init_value} color={redColor}/>
										</TableCell>
										<TableCell align="right">{"2/" + userData.user.maxims["extresSalats"].setmana}</TableCell>
										<TableCell align="right">{userData.user.maxims["extresSalats"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("alcohol") &&
									<TableRow
										key="alcohol"
										sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:lightRedColor }}
										>
										<TableCell component="th" scope="row">Alcohol</TableCell>
										<TableCell align="center">
											<NumberForm hasTitle={false} title={'Alcohol'} ref={alcoholNumberRef} initValue={alcohol_init_value} color={redColor}/>
										</TableCell>
										<TableCell align="right">{"2/" + userData.user.maxims["alcohol"].setmana}</TableCell>
										<TableCell align="right">{userData.user.maxims["alcohol"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("refrescos") &&
									<TableRow
										key="refrescos"
										sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:lightRedColor }}
										>
										<TableCell component="th" scope="row">Refrescos</TableCell>
										<TableCell align="center">
											<NumberForm hasTitle={false} title={'Refrescos'} ref={refrescosNumberRef} initValue={refrescos_init_value} color={redColor}/>
										</TableCell>
										<TableCell align="right">{"2/" + userData.user.maxims["refrescos"].setmana}</TableCell>
										<TableCell align="right">{userData.user.maxims["refrescos"].dia}</TableCell>
									</TableRow>
								}
							</TableBody>
						</Table>
						</TableContainer>
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
					{userData.isGoalsSet > 0 &&
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent:"center",
								marginTop:2,
								marginBottom:2
						}}>
						
						<Typography>
						El teu pes objectiu és: {userData.goalsData.pes} kgs.
						</Typography>
						</Box>
					}		
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