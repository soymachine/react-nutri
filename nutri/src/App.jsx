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
	const [responseFromServer, setResponseFromServer] = useState(false)
	
	useEffect(() => {
		if (userStorage.isUserInStorage()) {
			const user = userStorage.getWithExpiry()
			OnUserLoggedIn(user)
		}else{
			navigate('/')
		}
	}, [])

	const OnCartillaNewDataSelected = (newDate)=>{
		console.log(newDate)

		cartillesService.retrieveDateData(userData.user, newDate)
		.then( cartillaReturned =>{
			if(cartillaReturned[0] != undefined){
				userData.isTodayDataSet = false
				userData.setTodayData(cartillaReturned[0])
				console.log("Hay datos para esta fecha")
				navigate('/data')
			}else{
				console.log("NO Hay datos para esta fecha")
				userData.isTodayDataSet = false
				userData.setBlankData()
			}
		})
	}

	const OnCartillaSubmit = (cartillaObj) => {
		cartillesService.validateCartilla(cartillaObj)
		setResponseFromServer(false)
		let cartillaID = null
		if(userData.isTodayDataSet){
			cartillaID = userData.todayData.id
		}

		//console.log(cartillaObj)
		//console.log(`OnCartillaSubmit, cartillaID:${cartillaID} userData.isTodayDataSet:${userData.isTodayDataSet}`)

		// O creamos una nueva o actualizamos la actual
		// Comentar esto para development que no se envie nada
		//*
		cartillesService.sendCartilla(cartillaObj, !userData.isTodayDataSet, cartillaID)
			.then(cartillaReturned => {
				// Mostrar algo de éxito aqui
				// Agregar la info de todayData al objeto userData
				userData.setTodayData(cartillaReturned)
			})
			.catch(error => {
				console.log(error)
			}).finally(()=>{
				setResponseFromServer(true)
			})
		//*/
	}

	const OnGoalsSubmit = (goalsObj) => {
		console.log("[App] OnGoalsSubmit")
		setResponseFromServer(false)
		let goalID = null
		if(userData.isGoalsSet){
			goalID = userData.goalsData.id
		}

		// O creamos una nueva o actualizamos la actual
		// Comentar esto para development que no se envie nada
		//*
		goalsService.sendObjectives(goalsObj, !userData.isGoalsSet, goalID)
			.then(goalsReturned => {
				// Mostrar algo de éxito aqui
				// Agregar la info de todayData al objeto userData
				console.log(goalsReturned)
				userData.setGoalsData(goalsReturned)
			})
			.catch(error => {
				console.log(error)
				
			}).finally(()=>{
				setResponseFromServer(true)
			})
		//*/
	}

	const OnUserLoggedIn = (user, remember) => {
		setUser(user)
		userData.user = user
		cartillesService.setToken(user.token)
		goalsService.setToken(user.token)
		userStorage.saveUserWithExpirationTime(user, remember)
		
		// Pescar si este usuario tiene datos para el dia de hoy
		//console.log(user)
		cartillesService.retrieveTodayData(userData.user)
			.then(todayData => {
				//console.log("Hay datos para hoy?", todayData[0])
				if(todayData[0] != undefined){
					userData.setTodayData(todayData[0])
				}
				
				//console.log("retrieve user goals")
				goalsService.retrieveUserGoalsData(user)
				.then(goalsData =>{
					if(goalsData[0] != undefined){
						userData.setGoalsData(goalsData[0])
					}

					navigate('/data')
				})
			})
	}

	const OnUserLoggedOut = () => {
		userData.onLoggedOut()
		userStorage.removeUser()		
		setUser(null)
		navigate('/')
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
				<Route path="/data" element={<CartillaForm OnCartillaNewDataSelected={OnCartillaNewDataSelected} responseFromServer={responseFromServer} userData={userData} OnCartillaSubmit={OnCartillaSubmit} navigate={navigate} user={userData.user} />} />
				<Route path="/goals" element={<GoalsForm responseFromServer={responseFromServer} OnGoalsSubmit={OnGoalsSubmit} navigate={navigate} user={user} />} />
				<Route path="/" element={<Login OnUserLoggedIn={OnUserLoggedIn} user={userData.user} />} />
			</Routes>
		</>
	)
}

export default App
