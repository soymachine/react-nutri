import { forwardRef, useImperativeHandle } from 'react'
import useQuantity from './customhooks/useQuantity'
import { IconButton, TextField  } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const regex = /^[0-9\b]+$/;


const ObjectiveNumberForm = forwardRef(function NumberForm(props, refs) {
	let quantity = useQuantity(props.initValue)

	let marginTop = props.marginTop? props.marginTop: -2

	const getQuantity = () =>{
		/*
		console.log(`getQuantity:`)
		console.log(`quantity.value:${quantity.value}`)
		console.log(`props.initValue:${props.initValue}`)
		console.log(`--------`)
		*/
		if(quantity.value == undefined)
		{
			return props.initValue
		}else
		{ 
			return quantity.value
		}
		
	}

	const handleValueChange = (event) => {
		if (event.target.value === "" || regex.test(event.target.value))
		{
			let newValue = (event.target.value)
			//console.log(`newValue:${newValue}`)
			quantity.changeNumber(newValue)
		}
	}

	useImperativeHandle(refs, () => {
		return {
			getQuantity
		}
	  })

	return (
		<>
		<IconButton sx={{mt: marginTop, color: props.color}}  onClick={quantity.removeNumber} aria-label="delete">
			<Remove />
		</IconButton>
		<TextField  
			sx={{
				"& .MuiInputLabel-root": {color: `${props.color}`},
				"& .MuiOutlinedInput-root": {
				"& > fieldset": { borderColor: `${props.color}` },
				},
				border: { color: 'red' }, ml:1, mr:1, width: '13ch',
				"& .MuiFormHelperText-root": {fontSize:"1.3ch"}
			}}
		
			id="outlined-basic" label={props.title} value={getQuantity()} onChange={handleValueChange} variant="outlined" 
			
			/>
		<IconButton sx={{mt: marginTop, color: props.color}} onClick={quantity.addNumber} aria-label="delete">
			<Add />
		</IconButton>
		</>
	)

});

export default ObjectiveNumberForm