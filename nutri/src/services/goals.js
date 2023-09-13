import axios from 'axios'
//const baseUrl = 'http://localhost:3001/persons'
const baseUrl = 'http://localhost:3001/api/nutri/objectius'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)

	return request.then(response => response.data)
}

const retrieveUserGoalsData = async user => {

	// Pescar si este usuario tiene datos para el dia de hoy
	const config = {
		headers: { Authorization: token },
	}

	const query = {
		params: {
			user_id: user.id
		}
	}
	const response = await axios.get(baseUrl, query)
	return response.data
}

const updateObjectives = async (cartillaObj, cartillaID) => {
	const config = {
		headers: { Authorization: token },
	}
	console.log("updateCartilla cartillaObj.id " + cartillaObj.id)
	console.log(cartillaObj)
	const response = await axios.put(`${baseUrl}/${cartillaID}`, cartillaObj, config)
	return response.data
}

const sendObjectives = async (objectivesObject, isNew, objectiveID) =>{
	// create cartilla o updatecartilla
	console.log(`sendCartilla, isNew:${isNew} cartillaID:${objectiveID}`)
	if(isNew){
		return createObjectives(objectivesObject)
	}else{
		return updateObjectives(objectivesObject, objectiveID)
	}
}

const createObjectives = async newObject => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

export default { getAll, createObjectives, updateObjectives, sendObjectives, retrieveUserGoalsData, setToken }