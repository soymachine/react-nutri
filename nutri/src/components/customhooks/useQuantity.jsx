import { useState, useReducer, useEffect } from 'react'

function setValueTask(state, action){
	let newValue
	
	if (action.type == 'increase')
	{
		newValue = state + 1
	}
	else if (action.type == 'decrease')
	{
		newValue = state - 1
		if(newValue < 0){
			newValue = 0
		}
	}else if (action.type == 'change')
	{
		newValue = action.value
		if(newValue < 0){
			newValue = 0
		}
	}

	//console.log(`New value ${newValue} state:${state} action:${action}`)

	return newValue
}

const useCounter = (initValue) => {
	const [value, setValue] = useReducer(setValueTask, initValue)
	//console.log(`[useCounter] value:${value} initValue:${initValue}`)

	/*
	const hook = () => {
		
		changeNumber(initValue)
		//console.log(`[++useCounter] initValue:${initValue}`)
		
		//if(props.onChange){
		//	props.onChange(getQuantity())
		//}
		
	}

	useEffect(hook, [initValue]) //  , quantity.value
	*/
	const increase = () => {
		setValue({type:'increase'})
	}

	const decrease = () => {
		setValue({type:'decrease'})
	}

	const removeNumber = (e) => {
		e.preventDefault()
		decrease()
	}

	const addNumber = (e) => {
		e.preventDefault()
		//console.log("add number")
		increase({type:'decrease'})
	}

	const changeNumber = (_newValue) => {
		setValue({type:'change', value:_newValue})
	}

	return {
		value,
		increase,
		decrease,
		removeNumber,
		addNumber,
		changeNumber
	}
}

export default useCounter