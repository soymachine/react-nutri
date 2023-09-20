import { useState, useEffect, useRef } from 'react'
import { Box, Chip, Divider, TextField, Alert, AlertTitle, Paper, IconButton, Typography, List } from '@mui/material'
import UserData from '../logic/data/UserData'
import CustomBackdrop from '../components/helpers/CustomBackdrop'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ca';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Circle } from '@mui/icons-material'

import {
	ResponsiveChartContainer,
	BarPlot,
	LinePlot,
	LineChart,
	ChartsXAxis,
	ChartsYAxis,
	axisClasses,
  } from '@mui/x-charts';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';

import RestaurantIcon from '@mui/icons-material/Restaurant';
import {
  usePickerLayout,
  pickersLayoutClasses,
  PickersLayoutRoot,
  PickersLayoutContentWrapper,
} from '@mui/x-date-pickers/PickersLayout';

const userData = UserData.getInstance()
let spanAmount = 5
let lightGreyColor = '#00000003'
let greenColor = '#96C291'
let lightGreenColor = "#96c2912e"
let yellowColor = '#FFDBAA'
let lightYellowColor = '#FFDBAA'
let redColor = '#A73121'
let lightRedColor = '#a7312142'
let blueColor = '#0E21A0'
let lightBlueColor = '#0E21A0'
let pinkColor = '#9400FF'
let lightPinkColor = '#9400FF'
let whiteColor = '#FFFFFF'

const checkedStyle = {
    color:"green"
}

const pendingStyle = {
    color:"orange"
}

const alertStyle = {
    color:"red"
}

let dadesFuturesString = "(Estem a una data futura)"
let dadesPasadesString = "(Estem a una data del pasat)"
let dadesActualsString = "(Dades d'avui)"

const createTag = (type)=>{
    switch(type){
        case "checked":
            return (<CheckCircleIcon sx={checkedStyle} />)
        case "pending":
            return (<ErrorOutlineIcon sx={pendingStyle} />)
    }
}

const addTagMinims = (accumulat, minSetmana)=>{
	if(accumulat >= minSetmana){
		return createTag("checked")
	}else{
		return createTag("pending")	
	}
}

const addTagMaxims = (accumulat, maxSetmana)=>{
	if(accumulat > maxSetmana){
		return createTag("pending")
	}else{
		return createTag("checked")	
	}
}

function ActionList(props) {
	return (
		<List>
		
		</List>
	);
}

function RestaurantHeader() {
	return (
	  <Box
		sx={{
		  // Place the element in the grid layout
		  gridColumn: 1,
		  gridRow: 1,
		  // Center the icon
		  display: 'flex',
		  justifyContent: 'center',
		  alignItems: 'center',
		}}
	  >
		<RestaurantIcon />
	  </Box>
	);
  }

function Stats(props) {
	let navigate = props.navigate

	const [user, setUser] = useState(props.user)
	const [xLabels, setXLabels] = useState( ["1","2","3","4","5","6","7"])
	const [pesValues, setPesValues] = useState( ["1","2","3","4","5","6","7"])
	const [pesObjectiuValues, setPesObjectiuValues] = useState( ["1","2","3","4","5","6","7"])
	const [minValue, setMinValue] = useState(0)
	const [maxValue, setMaxValue] = useState(1000)
	const [date, setDate] = useState(()=>{return userData.today})
	const [value, setValue] = useState(dayjs(new Date().toString()));
	const [setmanaString, setSetmanaString] = useState("");

	const setmanaText = userData.getStringSetmana(date)
	const dataCartillas = userData.getCartillasFromCurentWeek(date)
	console.log(dataCartillas)
	let verduresAcc = 0
	let fruitesAcc = 0
	let dolcosAcc = 0
	let xocolataAcc = 0
	let extresSalatsAcc = 0
	let alcoholAcc = 0
	let refrescosAcc = 0

	const CustomLayout = (props)=> {
		const { toolbar, tabs, content, actionBar } = usePickerLayout(props);
		return (
		  <PickersLayoutRoot
			ownerState={props}
			sx={{
			  overflow: 'auto',
			  [`.title`]: {
				gridColumn: 1,
				gridRow: 2,
				margin:"auto"
			  },
			  [`.${pickersLayoutClasses.toolbar}`]: {
				gridColumn: 2,
				gridRow: 1,
			  },
			}}
		  >
			<Typography className="title" sx={{width:200, px:2, mb:4, fontSize:"1.5rem", textAlign:"right"}} component="h1" variant="h5">
				{userData.getStringSetmana(date)}
			</Typography>
			
			<PickersLayoutContentWrapper className={pickersLayoutClasses.contentWrapper}>
			  {tabs}
			  {content}
			</PickersLayoutContentWrapper>
		  </PickersLayoutRoot>
		);
	}
	
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

	const noPaddingStyle = {
		padding:1,
		textAlign:"center"
	}

	const centeringStyle = {
		padding:1,
		textAlign:"center"
	}

	const firstElementStyle = {
		width:200,
		...noPaddingStyle
	}

	const hook = () => {
		// console.log("[Stats] hook!")
		// Si no hay usuario, entonces navegamos a otra página
		if(user === null){
			returnToHome()
		}

		// Actualizamos los datos de los dias 11 a 17 de septiembre  (YYYY-MM-DD)
		const dataCartillas = userData.getCartillasFromDates({from:"2023/09/11", to:"2023/09/18"})

		if(dataCartillas){
			let newLabels = dataCartillas.map(cartilla =>{
				return userData.getCartillaDayAndMonth(cartilla)
			})
	
			let newPesValues = dataCartillas.map(cartilla =>{
				return cartilla.pes
			})
	
			let newObjectiveValues = dataCartillas.map(cartilla =>{
				return userData.goalsData.pes
			})
	
			let _minValue = userData.goalsData.pes;
			let _maxValue = userData.goalsData.pes;
			newPesValues.reduce(
				(accumulator, currentValue) => 
				{
					// console.log(`current value ${currentValue}`)
					if(currentValue < _minValue) _minValue = currentValue
					if(currentValue > _maxValue) _maxValue = currentValue				
				}, minValue)
			
	
			_minValue -= spanAmount 	
			_maxValue += spanAmount 	
	
			setMinValue(_minValue)
			setMaxValue(_maxValue)
	
			/*
			console.log(`minValue:${_minValue} maxValue:${_maxValue}`);
			console.log(newObjectiveValues);
			console.log(userData.goalsData);
			*/
			setXLabels(newLabels)
			setPesValues(newPesValues)
			setPesObjectiuValues(newObjectiveValues)
		}
	}

	useEffect(hook, [])

	const returnToHome = () => {
		navigate('/')
	}

	const onChangeDatePicker = (newValue)=>{
		setValue(newValue)
		setDate(newValue.toDate())
		// props.OnStatsNewDataSelected(newValue)
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

	const estadistiquesRender = () => (
		<>
			<h1>Estadístiques</h1>
			<div>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent:"center",
						marginTop:2
				}}>
					<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ca" >
						<StaticDatePicker
							orientation="landscape" 
							label="Data:"
							value={value}
							onChange={onChangeDatePicker}
							
							slots={{ day: CustomDay, actionBar: ActionList, layout: CustomLayout }}

							sx={{
								mb:1
							}}

						/>
					</LocalizationProvider>
					
				</Box>	
				
				<Divider maxwidth="md" sx={{m:1}}>
					<Chip label="Pes"/>
				</Divider>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent:"center",
						marginTop:2
						}}>
				</Box>	
				<LineChart
					width={1000}
					height={300}
					series={[
						{ yAxisKey: 'yAxisID', data: pesValues, label: 'Evolució', id: 'pvId' },
						{ xAxisKey: 'xAxisID', data: pesObjectiuValues, label: 'Objectiu', id: 'ovId' },
					]}
					xAxis={[{ 
						scaleType: 'point', data: xLabels, id: 'xAxisID'
					}]}
					yAxis={[{
						scaleTyle:'point', id: 'yAxisID',
						min: minValue, max: maxValue,
					}]}
					sx={{
						
						'.MuiLineElement-root, .MuiMarkElement-root': {
						strokeWidth: 1,
						},
						'.MuiLineElement-series-ovId': {
						strokeDasharray: '5',
						},
						'.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
						fill: '#fff',
						},
						'& .MuiMarkElement-highlighted': {
						stroke: 'none',
						},
						marginTop:-10,
					}}
				/>
				<Divider maxwidth="md" sx={{m:1}}>
					<Chip label="Objectius mínims"/>
				</Divider>
				<TableContainer maxwidth="md" sx={{mt:3, mb:3}} component={Paper}>
					<Table sx={{}} aria-label="simple table">
						<TableHead>
							<TableRow sx={{backgroundColor:lightGreyColor,
								'& .MuiTableCell-root':{fontWeight:700} }}>
								<TableCell sx={firstElementStyle} >Tipus</TableCell>
								<TableCell sx={noPaddingStyle} >Total setmana</TableCell>
								<TableCell sx={noPaddingStyle} >Min. setmana</TableCell>
								<TableCell sx={noPaddingStyle} >Resultat</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{/* ROWS aqui, condicionales según usuario */}
							{userData.hasCamp("verdura") &&
								<TableRow
									key="verdura"
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
									<TableCell sx={centeringStyle} component="th" scope="row">Verdura</TableCell>
									<TableCell sx={centeringStyle}>{acumulados["verdura"]}</TableCell>
									<TableCell sx={centeringStyle}>{userData.user.maxims["verdura"].setmana}</TableCell>
									<TableCell sx={centeringStyle}>{addTagMinims(acumulados["verdura"], userData.user.maxims["verdura"].setmana)}</TableCell>
								</TableRow>
							}
							{userData.hasCamp("fruita") &&
								<TableRow
									key="fruita"
									sx={{ '&:last-child td, &:last-child th': { border: 0} }}
									>
									<TableCell sx={centeringStyle} component="th" scope="row">Fruita</TableCell>
									<TableCell sx={centeringStyle}>{acumulados["fruita"]}</TableCell>
									<TableCell sx={centeringStyle}>{userData.user.maxims["fruita"].setmana}</TableCell>
									<TableCell sx={centeringStyle}>{addTagMinims(acumulados["fruita"], userData.user.maxims["fruita"].setmana)}</TableCell>

								</TableRow>
							}							
						</TableBody>
					</Table>
				</TableContainer>	
				<Divider maxwidth="md" sx={{m:1}}>
					<Chip label="Objectius máxims"/>
				</Divider>	
				<TableContainer sx={{mt:3, mb:3}} component={Paper}>
					<Table sx={{}} aria-label="simple table">
						<TableHead>
							<TableRow sx={{backgroundColor:lightGreyColor,
								'& .MuiTableCell-root':{fontWeight:700} }}>
								<TableCell sx={firstElementStyle} >Tipus</TableCell>
								<TableCell sx={noPaddingStyle} >Total setmana</TableCell>
								<TableCell sx={noPaddingStyle} >Max. setmana</TableCell>
								<TableCell sx={noPaddingStyle} >Resultat</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{/* ROWS aqui, condicionales según usuario */}
							{userData.hasCamp("xocolata") &&
								<TableRow
									key="xocolata"
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
									<TableCell sx={centeringStyle} component="th" scope="row">Xocolata</TableCell>
									<TableCell sx={centeringStyle}>{xocolataAcc}</TableCell>
									<TableCell sx={centeringStyle}>{userData.user.maxims["xocolata"].setmana}</TableCell>
									<TableCell sx={centeringStyle}>{addTagMaxims(acumulados["xocolata"], userData.user.maxims["xocolata"].setmana)}</TableCell>
								</TableRow>
							}
							{userData.hasCamp("dolcos") &&
								<TableRow
									key="dolcos"
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
									<TableCell sx={centeringStyle} component="th" scope="row">Dolços</TableCell>
									<TableCell sx={centeringStyle}>{dolcosAcc}</TableCell>
									<TableCell sx={centeringStyle}>{userData.user.maxims["dolcos"].setmana}</TableCell>
									<TableCell sx={centeringStyle}>{addTagMaxims(acumulados["dolcos"], userData.user.maxims["dolcos"].setmana)}</TableCell>
								</TableRow>
							}
							{userData.hasCamp("extresSalats") &&
								<TableRow
									key="extresSalats"
									sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
									>
									<TableCell sx={centeringStyle} component="th" scope="row">Extres Salats</TableCell>
									<TableCell sx={centeringStyle}>{extresSalatsAcc}</TableCell>
									<TableCell sx={centeringStyle}>{userData.user.maxims["extresSalats"].setmana}</TableCell>
									<TableCell sx={centeringStyle} >{addTagMaxims(acumulados["extresSalats"], userData.user.maxims["extresSalats"].setmana)}</TableCell>
								</TableRow>
							}
							{userData.hasCamp("alcohol") &&
								<TableRow
									key="alcohol"
									sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
									>
									<TableCell sx={centeringStyle} component="th" scope="row">Alcohol</TableCell>
									<TableCell sx={centeringStyle}>{alcoholAcc}</TableCell>
									<TableCell sx={centeringStyle}>{userData.user.maxims["alcohol"].setmana}</TableCell>
									<TableCell sx={centeringStyle}>{addTagMaxims(acumulados["alcohol"], userData.user.maxims["alcohol"].setmana)}</TableCell>
								</TableRow>
							}
							{userData.hasCamp("refrescos") &&
								<TableRow
									key="refrescos"
									sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
									>
									<TableCell sx={centeringStyle} component="th" scope="row">Refrescos</TableCell>
									<TableCell sx={centeringStyle}>{refrescosAcc}</TableCell>
									<TableCell sx={centeringStyle}>{userData.user.maxims["refrescos"].setmana}</TableCell>
									<TableCell sx={centeringStyle}>{addTagMaxims(acumulados["refrescos"], userData.user.maxims["refrescos"].setmana)}</TableCell>
								</TableRow>
							}
						</TableBody>
					</Table>
				</TableContainer>						
			</div>
		</>
	)


	const checkRender = () => {

		if(user != null) {
			return estadistiquesRender()
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

export default Stats