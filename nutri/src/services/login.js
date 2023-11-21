import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
	const response = await axios.post(baseUrl, credentials)

	

	return response.data
}

/*
// Creación de usuario
const userCreationREsponse = await axios.post('/api/users', {
	username: "test",
	password: "1234",
	nom:"Test User"	
})
*/

export default { login }