import { AppBar, Avatar, Badge, Box, CssBaseline, Divider, IconButton, List, ListItemAvatar, Stack, Toolbar, Typography } from '@mui/material'
import Drawer from '@mui/material/Drawer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import {
	useNavigate, useLocation, 
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'
import { LocationOn, ThirtyFpsSelectRounded } from '@mui/icons-material';

function Menu(props) {
	const navigate = useNavigate()
	const location = useLocation();
  	
	const padding = {
		padding: 5
	}

	let logOutButton = () => (<button onClick={OnClickLogOut} style={green}>log out</button>)

	const OnClickLogOut = () => {
		props.OnUserLoggedOut()
	}

	const trySelected =(_path) =>{
		let isSelected = _path === location.pathname		
		return isSelected
	}

	const green = {
		color: 'green',
		padding: 5,
		marginLeft: 10
	}

	const menuDisplay = ()=>(
		<div>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Drawer variant="permanent" >

					<Box sx={{ px: [8], 
						display: 'flex', flexDirection: 'column',
						alignItems: 'center', }}>
						<img
							alt={`Avatar n°1`}
							src={`/src/assets/logo.png`}
						/>
						
					</Box>
					<Divider />
					<List component="nav">
						<React.Fragment>
							{/*  Dades diarias (insert data)  */}
							<ListItemButton
								selected={trySelected('/data')}
								onClick={() => {
									navigate('/data')
								}}
							>
								<ListItemIcon>
									<LayersIcon />
								</ListItemIcon>
								<ListItemText primary="Dades diaries" />
							</ListItemButton>
							{/*  Objectius  */}
							<ListItemButton
								selected={trySelected('/goals')}
								onClick={() => {
									navigate('/goals')
								}}
							>
								<ListItemIcon>
									<EmojiEventsIcon />
								</ListItemIcon>
								<ListItemText primary="Objectius" />
							</ListItemButton>
							{/*  Estadístiqes  */}
							<ListItemButton
								selected={trySelected('/stats')}
								onClick={() => {
									navigate('/stats')
								}}
							>
								<ListItemIcon>
									<BarChartIcon />
								</ListItemIcon>
								<ListItemText primary="Estadístiques" />
							</ListItemButton>
							
						</React.Fragment>	
						<React.Fragment>
						<Divider sx={{ my: 1 }} />
						<Box sx={{ p: 2, display: 'flex' }}>
							<Avatar
								alt={`Avatar n°1`}
								src={`/src/assets/${props.user.username}_profile.png`}
							/>
							<Stack sx={{ml:2, mt:1}} spacing={1}>
								<Typography  fontWeight={700}>{props.user.username}</Typography>
							</Stack>
						</Box>						
						<ListItemButton
							onClick={() => {
								OnClickLogOut()
							}}
						>
							<ListItemIcon >
								<LogoutIcon color="error" />
							</ListItemIcon>
							<ListItemText sx={{color:"#d32f2f"}} primary="Sortir" />
						</ListItemButton>			
						</React.Fragment>
					</List>
				</Drawer>
			</Box>			
		</div>

	)

	return (
		<>
		{props.user === null ?
			<></> :
			menuDisplay()
		}
		</>
	)
}

export default Menu