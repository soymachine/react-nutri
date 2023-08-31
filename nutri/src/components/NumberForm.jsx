import { forwardRef, useImperativeHandle } from 'react'
import useQuantity from './customhooks/useQuantity'
import { IconButton, TextField  } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';


const NumberForm = forwardRef(function NumberForm(props, refs) {
	let quantity = useQuantity(props.initValue)

	const getQuantity = () =>{
		return quantity.value
	}

	const handleValueChange = (event) => {
		let newValue = (event.target.value)
		console.log(`newValue:${newValue}`)
		quantity.changeNumber(newValue)
	}

	useImperativeHandle(refs, () => {
		return {
			getQuantity
		}
	  })

	return (
		<>
		<IconButton sx={{mt: 1, color: props.color}}  onClick={quantity.removeNumber} aria-label="delete">
			<Remove />
		</IconButton>
		<TextField  
			sx={{
				"& .MuiInputLabel-root": {color: `${props.color}`},
				"& .MuiOutlinedInput-root": {
				"& > fieldset": { borderColor: `${props.color}` },
				},
				border: { color: 'red' }, ml:1, mr:1, width: '12ch'
			}}
		
			id="outlined-basic" label={props.title} value={quantity.value} onChange={handleValueChange} variant="outlined" />
		<IconButton sx={{mt: 1, color: props.color}} onClick={quantity.addNumber} aria-label="delete">
			<Add />
		</IconButton>
		</>
	)

});

export default NumberForm