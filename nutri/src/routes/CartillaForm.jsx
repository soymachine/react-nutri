import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ApatForm from '../components/ApatForm'
import NumberForm from '../components/NumberForm'
import ExerciciForm from '../components/ExerciciForm'
import ResumSetmana from '../components/ResumSetmana'
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
let lightRedColor = '#a7312142'
let lightGreyColor = '#00000003'
let blueColor = '#0E21A0'
let lightBlueColor = '#0E21A0'
let pinkColor = '#9400FF'
let lightPinkColor = '#9400FF'
let whiteColor = '#FFFFFF'
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

	const initValues = {
		"fruita": fruita_init_value,
		"verdura": verdura_init_value,
		"alcohol": alcohol_init_value,
		"xocolata": xocolata_init_value,
		"dolcos": dolcos_init_value,
		"refrescos": refrescos_init_value,
		"extresSalats": extresSalats_init_value
	}

	const fruitaNumberRef = useRef()	
	const verduraNumberRef = useRef()	
	const alcoholNumberRef = useRef()
	const xocolataNumberRef = useRef()
	const dolcosNumberRef = useRef()
	const refrescosNumberRef = useRef()
	const extresSalatsNumberRef = useRef()
	const pesNumberRef = useRef()

	const refs = {
		"fruita": fruitaNumberRef,
		"verdura": verduraNumberRef,
		"alcohol": alcoholNumberRef,
		"xocolata": xocolataNumberRef,
		"dolcos": dolcosNumberRef,
		"refrescos": refrescosNumberRef,
		"extresSalats": extresSalatsNumberRef
	}

	const checkActualDate = (date) =>{
		if(date == null){
			console.error("New date on the fly")
			return new Date()
		}else{
			return date
		}
	}

	const [hasData, setHasData] = useState(false)
	const [date, setDate] = useState(()=>{return userData.today})
	const [esmorzar, setEsmorzar] = useState(()=>{return userData.getTodayData("esmorzar")})
	const [migMati, setMigMati] = useState(()=>{return userData.getTodayData("migMati")})
	const [dinar, setDinar] = useState(()=>{return userData.getTodayData("dinar")})
	const [berenar, setBerenar] = useState(()=>{return userData.getTodayData("berenar")})
	const [sopar, setSopar] = useState(()=>{return userData.getTodayData("sopar")})
	const [forca, setForca] = useState(()=>{return userData.getTodayData("forca")})
	const [cardio, setCardio] = useState(()=>{return userData.getTodayData("cardio")})
	
	// Se actualizan desde los NumberForms y sirven para actualizar el color de fondo de los inputs
	const [verdura, setVerdura] = useState(0)
	const [fruita, setFruita] = useState(0)
	const [xocolata, setXocolata] = useState(0)
	const [dolcos, setDolcos] = useState(0)
	const [extresSalats, setExtresSalats] = useState(0)
	const [alcohol, setAlcohol] = useState(0)
	const [refrescos, setRefrescos] = useState(0)
	
	const [user, setUser] = useState(props.user)
	const [openBackdrop, setOpenBackdrop] = useState(false)
	const [value, setValue] = useState(dayjs(new Date().toString()));
	const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

	// Construir un array con los datos rellenados de esta semana
	//console.log(`[getCartillasFromCurentWeek] date:${date}`)
	//console.log(`[getCartillasFromCurentWeek] userData.today:${userData.today}`)
	//console.log(`[getCartillasFromCurentWeek] verdura_init_value:${verdura_init_value}`)
	const dataCartillas = userData.getCartillasFromCurentWeek(date)
	//console.log("[Cartilla Form]")
	//console.log(dataCartillas)
	//console.log(userData.yearData)
	//console.log(`userData.getTodayData("data"):${date}`)
	let verduresAcc = 0
	let fruitesAcc = 0
	let dolcosAcc = 0
	let xocolataAcc = 0
	let extresSalatsAcc = 0
	let alcoholAcc = 0
	let refrescosAcc = 0
	
	if(dataCartillas){
		verduresAcc = userData.getSumatorioDe("verdura", dataCartillas)
		fruitesAcc = userData.getSumatorioDe("fruita", dataCartillas)
		dolcosAcc = userData.getSumatorioDe("dolcos", dataCartillas)
		xocolataAcc = userData.getSumatorioDe("xocolata", dataCartillas)
		extresSalatsAcc = userData.getSumatorioDe("extresSalats", dataCartillas)
		alcoholAcc = userData.getSumatorioDe("alcohol", dataCartillas)
		refrescosAcc = userData.getSumatorioDe("refrescos", dataCartillas)
		//console.log(`xocolataAcc:${xocolataAcc} extresSalatsAcc:${extresSalatsAcc} dolcosAcc:${dolcosAcc} verduresAcc:${verduresAcc} fruitesAcc:${fruitesAcc} refrescosAcc:${refrescosAcc} alcoholAcc:${alcoholAcc}`)
	}
	
	const acumulados = {
		"fruita": fruitesAcc,
		"verdura": verduresAcc,
		"alcohol": alcoholAcc,
		"xocolata": xocolataAcc,
		"dolcos": dolcosAcc,
		"refrescos": refrescosAcc,
		"extresSalats": extresSalatsAcc
	}

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

	const getBackgroundColorForAlimento = (alimento)=>{
		const acumulado = acumulados[alimento]
		//console.log(`alimento:${alimento}, acumulado:${acumulado}`)
		const ref = refs[alimento]
		//console.log(`ref:${ref} for alimento:${alimento}`)
		if(ref.current){
			const maxims = userData.getMaximsForAliment(alimento)		
		
			const currentValue = initValues[alimento]
			//console.log(ref.current.getQuantity())
			//console.log(`currentValue:${currentValue} maxims.dia:${maxims.dia} maxims.setmana:${maxims.setmana}`)

			if(currentValue > maxims.dia)
			{
				// current > max al dia?
				return lightRedColor

			}else if(acumulado > maxims.setmana)
			{
				// current > max a la setmana?
				return lightRedColor
			}else if(currentValue == 0)
			{
				return whiteColor
			}
			else if(currentValue == maxims.dia || acumulado == maxims.setmana)
			{
				return lightYellowColor
			}else{
				return lightGreenColor
			}
		}
		
	}
	
	const hook = () => {
		// Si no hay usuario, entonces navegamos a otra página
		if(props.user == null || props.user == "") {
			returnToHome()
		}

		// Get date if not userData.isTodayDataSet
		if(userData.isTodayDataSet){
			//console.log(`data? ${userData.getTodayData("data")}`)			
			//console.log(`otra manera de coger data? ${userData.todayData.data}`)			
			//console.error("Como sí hay datos para hoy, seteamos la fecha según getTodayData: " + userData.getTodayData("data"))
			setDate(userData.getTodayData("data"))
		}else{
			//console.error("Como no hay datos para hoy, ponemos la fecha a este momento: " + new Date().toString())
			setDate(new Date().toString())
		}
		
	}

	useEffect(hook, [])

	const dataUpdateHook = () => {
		// console.log(`dataUpdateHook`) // 
		setEsmorzar(userData.getTodayData("esmorzar"))
		setMigMati(userData.getTodayData("migMati"))
		setDinar(userData.getTodayData("dinar"))
		setBerenar(userData.getTodayData("berenar"))
		setSopar(userData.getTodayData("sopar"))
		setDate(userData.today)
	}

	useEffect(dataUpdateHook, [props, userData.isTodayDataSet])

	const valuesHook = () => {
		// TODO, pending
		if(fruitaNumberRef.current){
			// console.log(`valuesHook fruita:${fruitaNumberRef.current.getQuantity()}`) // 
		}
	}

	useEffect(valuesHook, [verdura, fruita, xocolata, dolcos, extresSalats, alcohol, refrescos])

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
		// setDate(newValue.toDate())
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
			color:"#02bb02"
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
					<ResumSetmana dataCartillas={dataCartillas} />
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
									<TableCell align="center">Acumulat setmana</TableCell>
									<TableCell align="center">Màxim diari</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{/* ROWS aqui, condicionales según usuario */}
								{userData.hasCamp("verdura") &&
									<TableRow
										key="verdura"
										sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:getBackgroundColorForAlimento("verdura") }}
										>
										<TableCell component="th" scope="row">Verdura</TableCell>
										<TableCell align="center" >
											<NumberForm onChange={setVerdura} hasTitle={false} title={'Verdura'} ref={verduraNumberRef} initValue={verdura_init_value}/>
										</TableCell>
										<TableCell align="center">{verduresAcc + "/" + userData.user.maxims["verdura"].setmana}</TableCell>
										<TableCell align="center">{userData.user.maxims["verdura"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("fruita") &&
									<TableRow
										key="fruita"
										sx={{ '&:last-child td, &:last-child th': { border: 0},backgroundColor:getBackgroundColorForAlimento("fruita") }}
										>
										<TableCell component="th" scope="row">Fruita</TableCell>
										<TableCell align="center">
											<NumberForm onChange={setFruita} hasTitle={false} title={'Fruita'} ref={fruitaNumberRef} initValue={fruita_init_value} />
										</TableCell>
										<TableCell align="center">{fruitesAcc +"/" + userData.user.maxims["fruita"].setmana}</TableCell>
										<TableCell align="center">{userData.user.maxims["fruita"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("xocolata") &&
									<TableRow
										key="xocolata"
										sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:getBackgroundColorForAlimento("xocolata") }}
										>
										<TableCell component="th" scope="row">Xocolata</TableCell>
										<TableCell align="center">
											<NumberForm onChange={setXocolata} hasTitle={false} title={'Xocolata negra'} ref={xocolataNumberRef} initValue={xocolata_init_value} />	
										</TableCell>
										<TableCell align="center">{xocolataAcc +"/" + userData.user.maxims["xocolata"].setmana}</TableCell>
										<TableCell align="center">{userData.user.maxims["xocolata"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("dolcos") &&
									<TableRow
										key="dolcos"
										sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:getBackgroundColorForAlimento("dolcos") }}
										>
										<TableCell component="th" scope="row">Dolços</TableCell>
										<TableCell align="center">
											<NumberForm onChange={setDolcos} hasTitle={false} title={'Dolços'} ref={dolcosNumberRef} initValue={dolcos_init_value} />
										</TableCell>
										<TableCell align="center">{dolcosAcc +"/" + userData.user.maxims["dolcos"].setmana}</TableCell>
										<TableCell align="center">{userData.user.maxims["dolcos"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("extresSalats") &&
									<TableRow
										key="extresSalats"
										sx={{ '&:last-child td, &:last-child th': { border: 0 } ,backgroundColor:getBackgroundColorForAlimento("extresSalats")}}
										>
										<TableCell component="th" scope="row">Extres Salats</TableCell>
										<TableCell align="center">
											<NumberForm onChange={setExtresSalats} hasTitle={false} title={'Extres salats'} ref={extresSalatsNumberRef} initValue={extresSalats_init_value} />
										</TableCell>
										<TableCell align="center">{extresSalatsAcc +"/" + userData.user.maxims["extresSalats"].setmana}</TableCell>
										<TableCell align="center">{userData.user.maxims["extresSalats"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("alcohol") &&
									<TableRow
										key="alcohol"
										sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:getBackgroundColorForAlimento("alcohol") }}
										>
										<TableCell component="th" scope="row">Alcohol</TableCell>
										<TableCell align="center">
											<NumberForm onChange={setAlcohol} hasTitle={false} title={'Alcohol'} ref={alcoholNumberRef} initValue={alcohol_init_value} />
										</TableCell>
										<TableCell align="center">{alcoholAcc +"/" + userData.user.maxims["alcohol"].setmana}</TableCell>
										<TableCell align="center">{userData.user.maxims["alcohol"].dia}</TableCell>
									</TableRow>
								}
								{userData.hasCamp("refrescos") &&
									<TableRow
										key="refrescos"
										sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:getBackgroundColorForAlimento("refrescos") }}
										>
										<TableCell component="th" scope="row">Refrescos</TableCell>
										<TableCell align="center">
											<NumberForm onChange={setRefrescos} hasTitle={false} title={'Refrescos'} ref={refrescosNumberRef} initValue={refrescos_init_value} />
										</TableCell>
										<TableCell align="center">{refrescosAcc +"/" + userData.user.maxims["refrescos"].setmana}</TableCell>
										<TableCell align="center">{userData.user.maxims["refrescos"].dia}</TableCell>
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
					<Divider maxwidth="md" sx={{mb:3,pb:3}}>
						
					</Divider>
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