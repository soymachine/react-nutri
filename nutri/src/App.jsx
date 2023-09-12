import { useState, useEffect } from 'react'

import {
	useNavigate,
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'

import cartillesService from './services/cartilles'
import goalsService from './services/goals'

import CartillaForm from './components/CartillaForm'
import GoalsForm from './components/GoalsForm'
import Menu from './components/Menu'
import Login from './routes/Login'
import Users from './routes/Users'
import UserStorage from './logic/storage/UserStorage'
import UserData from './logic/data/UserData'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const userData = UserData.getInstance()
const userStorage = UserStorage.getInstance()

function App() {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)
	
	useEffect(() => {
		if (userStorage.isUserInStorage()) {
			const user = userStorage.getJSON()
			OnUserLoggedIn(user)
		}else{
			navigate('/')
		}
	}, [])

	const OnCartillaSubmit = (cartillaObj) => {
		cartillesService.validateCartilla(cartillaObj)

		let cartillaID = null
		if(userData.isTodayDataSet){
			cartillaID = userData.todayData.id
		}

		console.log(cartillaObj)
		console.log(`OnCartillaSubmit, cartillaID:${cartillaID} userData.isTodayDataSet:${userData.isTodayDataSet}`)

		// O creamos una nueva o actualizamos la actual
		// Comentar esto para development que no se envie nada
		//*
		cartillesService.sendCartilla(cartillaObj, !userData.isTodayDataSet, cartillaID)
			.then(cartillaReturned => {
				// Mostrar algo de éxito aqui
				console.log('Data updated correctly!')
				// Agregar la info de todayData al objeto userData
				userData.setTodayData(cartillaReturned)
			})
			.catch(error => {
				console.log(error)
			})
		//*/
	}

	const OnGoalsSubmit = (goalsObj) => {

		let goalID = null
		if(userData.isGoalsSet){
			goalID = userData.todayData.id
		}

		console.log(goalsObj)
		console.log(`OnGoalsSubmit, cartillaID:${goalID} userData.isGoalsSet:${userData.isGoalsSet}`)

		// O creamos una nueva o actualizamos la actual
		// Comentar esto para development que no se envie nada
		//*
		goalsService.sendObjectives(goalsObj, !userData.isGoalsSet, goalID)
			.then(goalsReturned => {
				// Mostrar algo de éxito aqui
				console.log('Data updated correctly!')
				// Agregar la info de todayData al objeto userData
				userData.setGoalsData(goalsReturned)
			})
			.catch(error => {
				console.log(error)
			})
		//*/
	}

	const OnUserLoggedIn = (user) => {
		setUser(user)
		userData.user = user
		cartillesService.setToken(user.token)
		userStorage.saveUser(user)
		
		// Pescar si este usuario tiene datos para el dia de hoy
		//console.log(user)
		cartillesService.retrieveTodayData(user)
			.then(todayData => {
				console.log("Hay datos para hoy?", todayData[0])
				if(todayData[0] != undefined){
					userData.setTodayData(todayData[0])
				}
				
				navigate('/data')
			})
	}

	const OnUserLoggedOut = () => {
		setUser(null)
		navigate('/')
		userStorage.removeUser()		
	}

	const OnClickLogOut = () => {
		OnUserLoggedOut()
	}

	return (
		<>
			<div>
				<Menu user={user} OnUserLoggedOut={OnUserLoggedOut}/>
			</div>
			<Routes>
				<Route path="/data" element={<CartillaForm userData={userData} OnCartillaSubmit={OnCartillaSubmit} navigate={navigate} user={userData.user} />} />
				<Route path="/goals" element={<GoalsForm OnGoalsSubmit={OnGoalsSubmit} navigate={navigate} user={user} />} />
				<Route path="/" element={<Login OnUserLoggedIn={OnUserLoggedIn} user={userData.user} />} />
			</Routes>
		</>
	)
}

export default App
