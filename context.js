import { createContext, useContext, useState } from "react"

export const UserContext = createContext()

export function UserProvider({value, children}){
	const [user, setUser] = useState(null)

	function changeUser(newUser) {
		console.log("new user:", newUser)
		if (newUser){
			setUser(newUser)
		} else {
			setUser(null)
		}
		// else do nothing
	}

	return (
		<UserContext.Provider value={{value, user, changeUser}}>
			{children}
		</UserContext.Provider>
	)
}

export function useUserContext() {
	return useContext(UserContext)
}
