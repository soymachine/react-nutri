import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Models from '../logic/data/Models'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react'
import { Chip, TextField, Divider, FormControlLabel, Checkbox } from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const defaultTheme = createTheme();
const regex = /^[0-9\b]+$/;
const models = Models.getInstance()

function ApatForm({ title, setModel, model }) {
	
	const returnCorrectDropdownValue = (value) =>{
		if(value == undefined || value == null){
			return ''
		}else{
			return value
		}
	}

	const returnCorrectCheckValue = (value) =>{
		if(value == undefined || value == null){
			return false
		}else{
			return value
		}
	}

	//console.log(`model.proteines:${model.proteines}`)
	const [proteines, setProteines] = useState(()=>{ return returnCorrectDropdownValue(model.proteines)})
	const [hidrats, setHidrats] = useState(()=>{ return returnCorrectDropdownValue(model.hidrats)})
	const [fibra, setFibra] = useState(()=>{ return returnCorrectCheckValue(model.fibra)})
	const [greixos, setGreixos] = useState(()=>{ return returnCorrectCheckValue(model.greixos)})
	const [lactics, setLactics] = useState(()=>{ return returnCorrectCheckValue(model.lactics)})
	const [comentaris, setComentaris] = useState(model.comentaris)

	// console.log(`Hook en ApatForm model.comentaris:${model.comentaris} title:${title}`)

	const hook = () => {
		setProteines(returnCorrectDropdownValue(model.proteines))
		setHidrats(returnCorrectDropdownValue(model.hidrats))
		setFibra(returnCorrectCheckValue(model.fibra))
		setGreixos(returnCorrectCheckValue(model.greixos))
		setLactics(returnCorrectCheckValue(model.lactics))
		setComentaris(model.comentaris)
	}

	useEffect(hook, [model])

	const handleProteinesChange = (event) => {
		
		let newProteines = (event.target.value)
		//console.log(`newProteines:${newProteines}`)
		setProteines(newProteines)
		setModel({ ...model, proteines:newProteines })
	}

	const handleHidratsChange = (event) => {
		if (event.target.value === "" || regex.test(event.target.value)) 
		{
			let newHidrats = (event.target.value)
			setHidrats(newHidrats)
			setModel({ ...model, hidrats:newHidrats })
		}
	}

	const handleFibraChange = (event) => {
		let newFibra = (event.target.checked)
			setFibra(newFibra)
			setModel({ ...model, fibra:newFibra })
	}

	const handleGreixosChange = (event) => {
		let newGreix = (event.target.checked)
		setGreixos(newGreix)
		setModel({ ...model, greixos:newGreix })
	}

	const handleLacticsChange = (event) => {
		let newLactics = (event.target.checked)
		setLactics(newLactics)
		setModel({ ...model, lactics:newLactics })
	}

	const handleComentarisChange = (event) => {
		let newComentaris = (event.target.value)
		setComentaris(newComentaris)
		setModel({ ...model, comentaris:newComentaris })
	}

	return (
		<>
			<ThemeProvider theme={defaultTheme}>
				<Container component="main" maxWidth="md">					
					<CssBaseline />
					<Divider>
						<Chip label={title} />
					</Divider>
					<Box
					sx={{
						marginTop: 1,
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 5
					}}>
						<FormControl >
							<InputLabel id="proteines-select-label">Proteines</InputLabel>
							<Select
								labelId="proteines-select-label"
								id="proteines-select"
								value={proteines}
								label="Proteines"
								sx={{ minWidth: 120 }}
								onChange={handleProteinesChange}
								>
								<MenuItem value={models.getProteinesValue(Models.CARN_VERMELLA)}>{models.getProteinesLabel(Models.CARN_VERMELLA)}</MenuItem>
								<MenuItem value={models.getProteinesValue(Models.CARN_BLANCA)}>{models.getProteinesLabel(Models.CARN_BLANCA)}</MenuItem>
								<MenuItem value={models.getProteinesValue(Models.PEIX_BLANC)}>{models.getProteinesLabel(Models.PEIX_BLANC)}</MenuItem>
								<MenuItem value={models.getProteinesValue(Models.PEIX_BLAU)}>{models.getProteinesLabel(Models.PEIX_BLAU)}</MenuItem>
								<MenuItem value={models.getProteinesValue(Models.LLEGUMS)}>{models.getProteinesLabel(Models.LLEGUMS)}</MenuItem>
								<MenuItem value={models.getProteinesValue(Models.OUS)}>{models.getProteinesLabel(Models.OUS)}</MenuItem>
								<MenuItem value={models.getProteinesValue(Models.RES)}>{models.getProteinesLabel(Models.RES)}</MenuItem>
							</Select>
						</FormControl>
						<FormControl >
							<InputLabel id="hidrats-select-label">Hidrats</InputLabel>
							<Select
								labelId="hidrats-select-label"
								id="hidrats-select"
								value={hidrats}
								label="Hidrats"
								sx={{ minWidth: 120 }}
								onChange={handleHidratsChange}
								>
								<MenuItem value={models.getHidratsValue(Models.PASTA)}>{models.getHidratsLabel(Models.PASTA)}</MenuItem>
								<MenuItem value={models.getHidratsValue(Models.ARROS)}>{models.getHidratsLabel(Models.ARROS)}</MenuItem>
								<MenuItem value={models.getHidratsValue(Models.PATATA)}>{models.getHidratsLabel(Models.PATATA)}</MenuItem>
								<MenuItem value={models.getHidratsValue(Models.PA)}>{models.getHidratsLabel(Models.PA)}</MenuItem>
								<MenuItem value={models.getHidratsValue(Models.RES)}>{models.getHidratsLabel(Models.RES)}</MenuItem>
							</Select>
							</FormControl>
						<FormControlLabel control={<Checkbox checked={fibra} onChange={handleFibraChange} />} label="Fibra" />
						<FormControlLabel control={<Checkbox checked={greixos} onChange={handleGreixosChange} />} label="Greixos" />
						<FormControlLabel control={<Checkbox checked={lactics} onChange={handleLacticsChange} />} label="Làctics" />
					</Box>
					<Box
					sx={{
						marginTop: 2,
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom:2
					}}>
						<TextField
							fullWidth
							sx = {{margin:0}}
							type="text"
							id="comentaris"
							label="Comentaris"
							value={comentaris}
							onChange={handleComentarisChange}
						/>
					</Box>
				</Container>
			</ThemeProvider>
			
		</>
	)
}

export default ApatForm