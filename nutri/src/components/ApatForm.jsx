import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import { Chip, TextField, Divider } from '@mui/material';

const defaultTheme = createTheme();


function ApatForm({ title, setModel, model }) {

	const styleObj = {
		
	}

	const [proteines, setProteines] = useState(model.proteines)
	const [hidrats, setHidrats] = useState(model.hidrats)
	const [fibra, setFibra] = useState(model.fibra)
	const [greixos, setGreixos] = useState(model.greixos)
	const [lactics, setLactics] = useState(model.lactics)

	const handleProteinesChange = (event) => {
		let newProteines = (event.target.value)
		setProteines(newProteines)
		setModel({ ...model, proteines:newProteines })
	}

	const handleHidratsChange = (event) => {
		let newHidrats = (event.target.value)
		setHidrats(newHidrats)
		setModel({ ...model, hidrats:newHidrats })
	}

	const handleFibraChange = (event) => {
		let newFibra = (event.target.value)
		setFibra(newFibra)
		setModel({ ...model, fibra:newFibra })
	}

	const handleGreixosChange = (event) => {
		let newGreix = (event.target.value)
		setGreixos(newGreix)
		setModel({ ...model, greixos:newGreix })
	}

	const handleLacticsChange = (event) => {
		let newLactics = (event.target.value)
		setLactics(newLactics)
		setModel({ ...model, lactics:newLactics })
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
						marginBottom:2
					}}>
						<TextField
							sx = {{margin:1}}
							
							id="outlined-controlled"
							label="Proteines"
							value={proteines}
							onChange={handleProteinesChange}
						/>
						<TextField
							sx = {{margin:1}}

							id="outlined-controlled"
							label="Hidrats"
							value={hidrats}
							onChange={handleHidratsChange}
						/>
						<TextField
							sx = {{margin:1}}
							id="outlined-controlled"
							label="Fibra"
							value={fibra}
							onChange={handleFibraChange}
						/>
						<TextField
							sx = {{margin:1}}
							id="outlined-controlled"
							label="Greixos"
							value={greixos}
							onChange={handleGreixosChange}
						/>
						<TextField
							sx = {{margin:1}}
							id="outlined-controlled"
							label="Làctics"
							value={lactics}
							onChange={handleLacticsChange}
						/>
					</Box>
				</Container>
			</ThemeProvider>
			
		</>
	)
}

export default ApatForm