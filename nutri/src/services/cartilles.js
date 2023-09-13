import axios from 'axios'
//const baseUrl = 'http://localhost:3001/persons'
const baseUrl = 'http://localhost:3001/api/nutri/cartilles'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)

	return request.then(response => response.data)
}

const retrieveTodayData = async user => {

	// Pescar si este usuario tiene datos para el dia de hoy
	const config = {
		headers: { Authorization: token },
	}

	const query = {
		params: {
			user_id: user.id
		}
	}
	const response = await axios.get(`${baseUrl}/today`, query)
	return response.data
}

const validateCartilla = cartillaObj => {

	cartillaObj.dinar.fibra = parseFloat(cartillaObj.dinar.fibra)
	cartillaObj.dinar.hidrats = parseFloat(cartillaObj.dinar.hidrats)
	cartillaObj.dinar.proteines = parseFloat(cartillaObj.dinar.proteines)
	cartillaObj.dinar.greixos = parseFloat(cartillaObj.dinar.greixos)
	cartillaObj.dinar.lactics = parseFloat(cartillaObj.dinar.lactics)

	cartillaObj.sopar.fibra = parseFloat(cartillaObj.sopar.fibra)
	cartillaObj.sopar.hidrats = parseFloat(cartillaObj.sopar.hidrats)
	cartillaObj.sopar.proteines = parseFloat(cartillaObj.sopar.proteines)
	cartillaObj.sopar.greixos = parseFloat(cartillaObj.sopar.greixos)
	cartillaObj.sopar.lactics = parseFloat(cartillaObj.sopar.lactics)

	cartillaObj.esmorzar.fibra = parseFloat(cartillaObj.esmorzar.fibra)
	cartillaObj.esmorzar.hidrats = parseFloat(cartillaObj.esmorzar.hidrats)
	cartillaObj.esmorzar.proteines = parseFloat(cartillaObj.esmorzar.proteines)
	cartillaObj.esmorzar.greixos = parseFloat(cartillaObj.esmorzar.greixos)
	cartillaObj.esmorzar.lactics = parseFloat(cartillaObj.esmorzar.lactics)

	cartillaObj.migMati.fibra = parseFloat(cartillaObj.migMati.fibra)
	cartillaObj.migMati.hidrats = parseFloat(cartillaObj.migMati.hidrats)
	cartillaObj.migMati.proteines = parseFloat(cartillaObj.migMati.proteines)
	cartillaObj.migMati.greixos = parseFloat(cartillaObj.migMati.greixos)
	cartillaObj.migMati.lactics = parseFloat(cartillaObj.migMati.lactics)

	cartillaObj.berenar.fibra = parseFloat(cartillaObj.berenar.fibra)
	cartillaObj.berenar.hidrats = parseFloat(cartillaObj.berenar.hidrats)
	cartillaObj.berenar.proteines = parseFloat(cartillaObj.berenar.proteines)
	cartillaObj.berenar.greixos = parseFloat(cartillaObj.berenar.greixos)
	cartillaObj.berenar.lactics = parseFloat(cartillaObj.berenar.lactics)
}

const sendCartilla = async (cartillaObject, isNew, cartillaID) =>{
	// create cartilla o updatecartilla
	console.log(`sendCartilla, isNew:${isNew} cartillaID:${cartillaID}`)
	if(isNew){
		return createCartilla(cartillaObject)
	}else{
		return updateCartilla(cartillaObject, cartillaID)
	}
}

const createCartilla = async newObject => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const updateCartilla = async (cartillaObj, cartillaID) => {
	const config = {
		headers: { Authorization: token },
	}
	console.log("updateCartilla cartillaObj.id " + cartillaObj.id)
	console.log(cartillaObj)
	const response = await axios.put(`${baseUrl}/${cartillaID}`, cartillaObj, config)
	return response.data
}

const deleteEntry = idToDelete => {
	const request = axios.delete(`${baseUrl}/${idToDelete}`)
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

export default { getAll, createCartilla, updateCartilla, sendCartilla, update, deleteEntry, setToken, validateCartilla, retrieveTodayData }