import { useState, useEffect } from 'react'

import {
	useNavigate,
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'

import cartillesService from './services/cartilles'

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
		}
	}, [])

	const OnCartillaSubmit = (cartillaObj) => {
		cartillesService.validateCartilla(cartillaObj)

		let id = null
		if(userData.isTodayDataSet){
			id = userData.todayData.id
		}

		console.log(cartillaObj)

		// O creamos una nueva o actualizamos la actual
		/*
		cartillesService.sendCartilla(cartillaObj, !userData.isTodayDataSet, id)
			.then(cartillaReturned => {
				// Mostrar algo de éxito aqui
				console.log('Data updated correctly!')
			})
			.catch(error => {
				console.log(error)
			})
		*/
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
				userData.setTodayData(todayData[0])
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
				<Route path="/data" element={<CartillaForm userData={userData}  OnCartillaSubmit={OnCartillaSubmit} navigate={navigate} user={user} />} />
				<Route path="/goals" element={<GoalsForm  OnCartillaSubmit={OnCartillaSubmit} navigate={navigate} user={user} />} />
				<Route path="/" element={<Login OnUserLoggedIn={OnUserLoggedIn} user={user} />} />
			</Routes>


		</>
	)
}

export default App
