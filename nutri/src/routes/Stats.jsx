import { useState, useEffect, useRef } from 'react'
import { Box, Chip, Divider, TextField, Alert, AlertTitle, Paper, IconButton, Typography, List } from '@mui/material'
import UserData from '../logic/data/UserData'
import CustomBackdrop from '../components/helpers/CustomBackdrop'
import ObjectivesTables from '../components/stats/ObjectivesTables'
import ProteinesTables from '../components/stats/ProteinesTables'

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ca';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Circle } from '@mui/icons-material'

import { LineChart } from '@mui/x-charts';
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
	const [pesValues, setPesValues] = useState( [1,2,3,4,5,6,7])
	const [hasPesValues, setHasPesValues] = useState(false)
	const [pesObjectiuValues, setPesObjectiuValues] = useState( [1,2,3,4,5,6,7])
	const [minValue, setMinValue] = useState(0)
	const [maxValue, setMaxValue] = useState(1000)
	const [date, setDate] = useState(()=>{return userData.today})
	const [value, setValue] = useState(dayjs(userData.today.toString()));
	
	const dataCartillas = userData.getCartillasFromCurentWeek(date)
	console.log("[Stats]")
	console.log(`date:${date}`)
	//console.log(dataCartillas)


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
		// const dataCartillas = userData.getCartillasFromDates({from:"2023/09/11", to:"2023/09/18"})
		//console.log(`dataCartillas en hook lenght:${dataCartillas.length}`)		
		//console.log(dataCartillas)		
		if(dataCartillas){

			if(dataCartillas.length == 7 ){
				setHasPesValues(true)

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
		
				setXLabels(newLabels)
				setPesValues(newPesValues)
				setPesObjectiuValues(newObjectiveValues)
			}else{
				setHasPesValues(false)
			}
			
		}
	}

	useEffect(hook, [date])

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

	let weekStartAndEnd = userData.getStartAndEndWeekDays(date)

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

		const currentDayStyle = {}
		console.log(`other.day.$D:${other.day.$D} start:${weekStartAndEnd.start} end:${weekStartAndEnd.end}`)
		if((other.day.$D >= weekStartAndEnd.start) && (other.day.$D <= weekStartAndEnd.end)){
			currentDayStyle.backgroundColor = "#1976d230"
		}

		console.log(currentDayStyle)
				
		const style = {
			position:"absolute",
			width:8,
			height:8,
			top:24,
			zIndex:1,
			color:"#02bb02"
		}
		
		// #1976d230 para los dias de la semana en curso

		const renderDay = (hasData)=>{
			if(hasData){
				return (<PickersDay {...other} sx={currentDayStyle}>
							<Circle sx={{position:"relative"}} style={style}/>
							{other.day.$D}
						</PickersDay>)
			}else{
				return (<PickersDay {...other} sx={currentDayStyle}>
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
						marginTop:2,
						minWidth:1000
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
				{hasPesValues?
					(
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
						
					):
					(
						<Typography className="title" sx={{fontSize:".9em", mb:4, mt:4}} component="h1" variant="h5">
							(<strong>No hi han dades suficients</strong> de pes per aquesta setmana)
						</Typography>
					)
				}
				
				<ObjectivesTables dataCartillas={dataCartillas} />				
				<ProteinesTables dataCartillas={dataCartillas} />				
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