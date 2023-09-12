import React from 'react'
import {
	useNavigate,
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'

function Menu(props) {

	const padding = {
		padding: 5
	}

	let logOutButton = () => (<button onClick={OnClickLogOut} style={green}>log out</button>)

	const OnClickLogOut = () => {
		props.OnUserLoggedOut()
	}

	const green = {
		color: 'green',
		padding: 5,
		marginLeft: 10
	}

	return (
		<div>
			<Link style={padding} to="/">Inici</Link>
			<Link style={padding} to="/data">Dades</Link>
			<Link style={padding} to="/goals">Objectius</Link>
			{props.user === null ?
				<></> :
				logOutButton()
			}
		</div>
	)
}

export default Menu