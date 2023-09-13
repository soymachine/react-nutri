import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cartillesService from '../services/cartilles'
import loginService from '../services/login'
import Notification from '../components/Notification'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


let maxNotificationTime = 2000

function Copyright(props) {
	return (
	  <Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
		<Link color="inherit" href="https://www.nutriapp.com/">
		  NutriApp
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  }
  
 
  
const defaultTheme = createTheme();

function Login(props) {
	const navigate = useNavigate()
	const [notification, setNotification] = useState(null)
	const [remember, setRemember] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let username = data.get('username')
		let password = data.get('password')
		
		try {
			const user = await loginService.login({
				username, password,
			})

			props.OnUserLoggedIn(user, remember)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setNotification('Wrong credentials')
			setTimeout(() => {
				setNotification(null)
			}, maxNotificationTime)
		}
	  };

	const handleChangeRemember = () => {
		let newRemember = !remember
		setRemember(newRemember)
	}

	const loginForm = () => (
		<>
			
			<ThemeProvider theme={defaultTheme}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
					sx={{
						marginTop: 1,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
					>
					<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Notification show={false} message={notification} />
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						/>
						<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						/>
						<FormControlLabel
						id="remember"
						control={<Checkbox checked={remember} onChange={handleChangeRemember} color="primary" />}
						label="Remember me"
						/>
						<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						>
						Sign In
						</Button>
						<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
							Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
							{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
						</Grid>
					</Box>
					</Box>
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</Container>
    		</ThemeProvider>
		</>
	)

	const alreadyLogged = () => (
		<>
			<div>Already logged in as {props.user.username}</div>
		</>
	)

	const checkRender = () => {
		if(props.user != null && props.user != ""){
			return alreadyLogged()
		}else{
			return loginForm()
		}
	}


	return (
		<>
			{checkRender()}
		</>
	)
}

export default Login