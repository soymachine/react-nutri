import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, AlertTitle } from '@mui/material';

const defaultTheme = createTheme();

const Notification = (props) => {
	let message = props.message
	if (message === null) {
		return null
		// message = "Wrong credentials"
	}

	const fullWidth = {
		width: 1
	}

	const margins = {
		marginTop: 25,
	}

	console.log(`message:${message}`)
	console.log(`show:${props.show}`)

	return (
		<>
			<ThemeProvider theme={defaultTheme}>
			<Alert sx={fullWidth} style={margins} severity="error">{message}</Alert>
			</ThemeProvider>
		</>
	)
}

export default Notification