
class UserStorage {
    static myInstance = null
    static getInstance(){
        if(UserStorage.myInstance == null){
            UserStorage.myInstance = new UserStorage()   
        }
        return this.myInstance
    }

    

    constructor() {
        this.localStorageKey = 'loggedNutriAppUser'
        this.longExpirationTime = 1000 * 60 * 60 * 24 * 30 // 1 mes 
        this.shortExpirationTime = 1000 * 60 * 30 // 30 minutos  // * 30 
    }

    saveUser = (user, remember)=>{
        window.localStorage.setItem(this.localStorageKey, JSON.stringify(user))
    }

    saveUserWithExpirationTime = (user, remember)=>{
        console.log("saveUserWithExpirationTime")
        let expirationTime = this.shortExpirationTime
        if(remember){
            expirationTime = this.longExpirationTime
        }

        const now = new Date()
        const item = {
            value: user,
            expiry: now.getTime() + expirationTime,
        }
        console.log(item)

        window.localStorage.setItem(this.localStorageKey, JSON.stringify(item))
    }

    removeUser = ()=>{
        window.localStorage.removeItem(this.localStorageKey)
    }

    getJSON = ()=>{
        const loggedUserJSON = window.localStorage.getItem(this.localStorageKey)
        const userJSON = JSON.parse(loggedUserJSON)
        return userJSON;
    }

    getWithExpiry = () => {
        const itemStr = window.localStorage.getItem(this.localStorageKey)
        // if the item doesn't exist, return null
        if (!itemStr) {
            return null
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            window.localStorage.removeItem(this.localStorageKey)
            return null
        }
        return item.value
    }

    isUserInStorage = ()=>{
        const itemStr = window.localStorage.getItem(this.localStorageKey)
        // if the item doesn't exist, return null
        if (!itemStr) {
            return false
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            window.localStorage.removeItem(this.localStorageKey)
            return false
        }
        return true
    }
 }

 export default UserStorage;