import { useState } from 'react'

function Users() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
	}

	return (
		<>
			<h1>Login page</h1>
			<form onSubmit={handleLogin}>
				<div>
          username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
          password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>

	)
}

export default Users