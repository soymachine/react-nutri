
class UserStorage {
    static myInstance = null
    static getInstance(){
        if(UserStorage.myInstance == null){
            UserStorage.myInstance = new UserStorage()   
        }
        return this.myInstance
    }

    constructor() {
        this.localStorageItem = 'loggedNutriAppUser'
    }

    isUserInStorage = ()=>{
        const loggedUserJSON = window.localStorage.getItem(this.localStorageItem)
		if (loggedUserJSON) {
			return true
		}else{
            return false
        }
    }

    saveUser = (user)=>{
        window.localStorage.setItem(this.localStorageItem, JSON.stringify(user))
    }

    removeUser = ()=>{
        window.localStorage.removeItem(this.localStorageItem)
    }

    getJSON = ()=>{
        const loggedUserJSON = window.localStorage.getItem(this.localStorageItem)
        const userJSON = JSON.parse(loggedUserJSON)
        return userJSON;
    }
 }

 export default UserStorage;