import { useState, useReducer } from 'react'

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

	console.log(`New value ${newValue} state:${state} action:${action}`)

	return newValue
}

const useCounter = (initValue) => {
	const [value, setValue] = useReducer(setValueTask, initValue)

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
		console.log("add number")
		increase({type:'decrease'})
	}

	const changeNumber = (value) => {
		console.log(`change value to:${value}`)
		setValue({type:'change', value:value})
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