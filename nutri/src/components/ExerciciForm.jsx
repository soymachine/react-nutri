import { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';

function ExerciciForm({setForca, setCardio, forca, cardio }) {
	console.log( `forca: ${forca}`)
	console.log( `cardio: ${cardio}`)
	const [checkedForca, setCheckedForca] = useState(forca)
	const [checkedCardio, setCheckedCardio] = useState(cardio)
	
	const handleChangeForca = () => {
		let newCheckedForca = !checkedForca
		setCheckedForca(newCheckedForca)
		setForca(newCheckedForca)
	}

	const handleChangeCardio = () => {
		let newCheckedCardio = !checkedCardio
		setCheckedCardio(newCheckedCardio)
		setCardio(newCheckedCardio)
	}

	const options = [
		{ label: 'Correr', value: 'correr' },
		{ label: 'Força', value: 'força' },
	]

	const labelForca = { inputProps: { 'aria-label': "Força" } };
	const labelCardio = { inputProps: { 'aria-label': "Cardio" } };

	return (
		
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent:"center",
				marginTop:2
		}}>
			<FormGroup>
				<FormControlLabel control={<Checkbox checked={checkedForca} onChange={handleChangeForca} inputProps={{ 'aria-label': 'controlled' }} />} label="Força" />
				<FormControlLabel control={<Checkbox checked={checkedCardio} onChange={handleChangeCardio} inputProps={{ 'aria-label': 'controlled' }} />} label="Cardio" />
			</FormGroup>
		</Box>
		
	)
}

export default ExerciciForm