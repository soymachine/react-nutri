import { forwardRef, useEffect, useImperativeHandle } from 'react'
import useQuantity from './customhooks/useQuantity'
import { IconButton, TextField  } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const regex = /^[0-9\b,.]+$/;

const NumberForm = forwardRef(function NumberForm(props, refs) {
	let quantity = useQuantity(props.initValue)
	
	let hasTitle = props.hasTitle
	if(hasTitle == undefined) hasTitle = true
	const titleProps = {}
	if(hasTitle){
		titleProps.label = props.title
	}

	const getQuantity = () =>{
		/*
		console.log(`getQuantity:`)
		console.log(`quantity.value:${quantity.value}`)
		//console.log(`props.initValue:${props.initValue}`)
		console.log(`--------`)
		//*/
		
		//*
		if(quantity.value == undefined)
		{
			return props.initValue
		}else
		{ 
			return quantity.value
		}
		//*/

		//return quantity.initValue
	}

	const hook = () => {
		quantity.changeNumber(props.initValue)
	}

	useEffect(hook, [props.initValue]) //  , quantity.value

	const onChange = () => {
		//console.log(`[NumberForm] newValue:${props.initValue} para :${props.title}`)
		if(props.onChange){
			props.onChange(getQuantity())
		}
		
	}

	useEffect(onChange, [quantity.value]) //  , quantity.value

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
		<IconButton sx={{mt: 1, color: props.color}} onClick={quantity.removeNumber} aria-label="delete">
			<Remove />
		</IconButton>
		<TextField  
			sx={{
				"& .MuiInputLabel-root": {color: `${props.color}`},
				"& .MuiOutlinedInput-root": {
				"& > fieldset": { borderColor: `${props.color}` },
				},
				"& input": {textAlign:"center"},
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