import { forwardRef, useEffect, useImperativeHandle } from 'react'
import useQuantity from './customhooks/useQuantity'
import { IconButton, TextField  } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const regex = /^[0-9\b,.]+$/;

const NumberForm = forwardRef(function NumberForm(props, refs) {
	let quantity = useQuantity(props.initValue)
	
	let hasTitle = props.hasTitle
	if(hasTitle == undefined) hasTitle = true

	const getQuantity = () =>{
		/*
		console.log(`getQuantity:`)
		console.log(`quantity.value:${quantity.value}`)
		console.log(`props.initValue:${props.initValue}`)
		console.log(`--------`)
		//*/
		if(quantity.value == undefined)
		{
			return props.initValue
		}else
		{ 
			return quantity.value
		}
	}

	const hook = () => {
		quantity.changeNumber(props.initValue)
	}

	useEffect(hook, [props.initValue])

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

	const titleProps = {}
	if(hasTitle){
		titleProps.label = props.title
	}

	return (
		<>
		<IconButton sx={{mt: 1, color: props.color}} onClick={quantity.removeNumber} aria-label="delete">
			<Remove />
		</IconButton>
		<TextField  
			sx={{
				"& .MuiInputLabel-root": {color: `${props.color}`},
				"& .MuiOutlinedInput-root": {
				"& > fieldset": { borderColor: `${props.color}` },
				},
				border: { color: 'red' }, ml:1, mr:1, width: '15ch'
			}}
		
			id="outlined-basic" 
			{...titleProps}
			value={getQuantity()} onChange={handleValueChange} variant="outlined" />
		<IconButton sx={{mt: 1, color: props.color}} onClick={quantity.addNumber} aria-label="delete">
			<Add />
		</IconButton>
		</>
	)

});

export default NumberForm