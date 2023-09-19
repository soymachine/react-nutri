import { useState, useEffect, useRef } from 'react'
import { Box, Chip, Divider, TextField, Alert, AlertTitle } from '@mui/material'
import UserData from '../logic/data/UserData'
import CustomBackdrop from '../components/helpers/CustomBackdrop'

import {
	ResponsiveChartContainer,
	BarPlot,
	LinePlot,
	LineChart,
	ChartsXAxis,
	ChartsYAxis,
	axisClasses,
  } from '@mui/x-charts';

const userData = UserData.getInstance()
let spanAmount = 5

function Stats(props) {
	let navigate = props.navigate

	const [user, setUser] = useState(props.user)
	const [xLabels, setXLabels] = useState( ["1","2","3","4","5","6","7"])
	const [pesValues, setPesValues] = useState( ["1","2","3","4","5","6","7"])
	const [pesObjectiuValues, setPesObjectiuValues] = useState( ["1","2","3","4","5","6","7"])
	const [minValue, setMinValue] = useState(0)
	const [maxValue, setMaxValue] = useState(1000)

	const hook = () => {
		console.log("[Stats] hook!")
		// Si no hay usuario, entonces navegamos a otra página
		if(user === null){
			returnToHome()
		}

		// Actualizamos los datos de los dias 11 a 17 de septiembre  (YYYY-MM-DD)
		const dataCartillas = userData.getCartillasFromDates({from:"2023/09/11", to:"2023/09/18"})
		
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
				console.log(`current value ${currentValue}`)
				if(currentValue < _minValue) _minValue = currentValue
				if(currentValue > _maxValue) _maxValue = currentValue				
			}, minValue)
		

		_minValue -= spanAmount 	
		_maxValue += spanAmount 	

		setMinValue(_minValue)
		setMaxValue(_maxValue)

		console.log(`minValue:${_minValue} maxValue:${_maxValue}`);
		console.log(newObjectiveValues);
		console.log(userData.goalsData);

		setXLabels(newLabels)
		setPesValues(newPesValues)
		setPesObjectiuValues(newObjectiveValues)
		
	}

	useEffect(hook, [])

	const returnToHome = () => {
		navigate('/')
	}

	const estadistiquesRender = () => (
		<>
			<h1>Estadístiques</h1>
			<div>
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