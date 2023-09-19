class UserData{
    static myInstance = null
    static getInstance(){
        if(UserData.myInstance == null){
            UserData.myInstance = new UserData()   
        }
        return this.myInstance
    }

    static defaultValueNumber = 0
    static defaultValueString = ""
    static defaultValueBoolean = false

    constructor(props) {
        this.user= ''
        this.todayData= {}
        this.goalsData= {}
        this.isTodayDataSet = false
        this.isGoalsSet = false
        this.today = new Date()
    }

    zeroPad = (num, places) => String(num).padStart(places, '0')

    getCurrentMonth = ()=>{
        return this.today.getMonth() + 1
    }

    getCurrentDay = ()=>{
        return this.today.getDate()
    }

    getCurrentYear = ()=>{
        return this.today.getFullYear()
    }

    onLoggedOut = () =>{
        this.user= ''
        this.todayData= {}
        this.goalsData= {}
        this.isTodayDataSet = false
        this.isGoalsSet = false
        
    }

    hasCamp = (campNom)=>{
		let result = this.user.camps.find(item => item == campNom)
		let isUndefined = (result == undefined)
		return !isUndefined
	}

    setTodayData = (todayData)=>{
        
        if(!this.isTodayDataSet){
            this.isTodayDataSet = true
            this.todayData = todayData
        }
    }

    setYearData = (yearData) =>{
        this.yearData = yearData        
    }

    isSameDate = (_cartillaDate, dateToFind)=>{
        const date = new Date(dateToFind)
        const month = date.getMonth()
        const day = date.getDate()
        const year = date.getFullYear()

        const cartillaDate = new Date(_cartillaDate)
        const cartillaMonth = date.getMonth()
        const cartillaDay = date.getDate()
        const cartillaYear = date.getFullYear()
        const hasData = (cartillaMonth == month && cartillaDay == day && cartillaYear == year)
        return hasData;
    }

    getCartillasFromDates = (condition) =>{
        const fromStr = condition.from
        const toStr = condition.to

        const fromDate = new Date(fromStr)
        const toDate = new Date(toStr)

        const newData = this.yearData.filter( cartilla =>{
            const cartillaDate = new Date(cartilla.date)
            if(fromDate < cartillaDate && cartillaDate < toDate){
                return true
            }else{
                return false
            }
        } )
        
        return newData
        // console.log(`fromDate:${fromDate} toDate:${toDate}`)
    }

    getCartillasFromCurentWeek = (currentDate) =>{
        // from:"2023/09/11", to:"2023/09/18"
        const today = currentDate
        
        console.log(`today:${today}`)
    }

    getCartillaDayAndMonth = (cartilla) =>{
        const date = new Date(cartilla.date)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const str = `${this.zeroPad(day, 2)}/${this.zeroPad(month, 2)}`
        return str
    }

    hasCartillaForDate = (date) =>{
        date = new Date(date)
        const month = date.getMonth()
        const day = date.getDate()
        const year = date.getFullYear()

        let result = this.yearData.find(cartilla => {
            const cartillaDate = new Date(cartilla.date)
            const cartillaMonth = cartillaDate.getMonth()
            const cartillaDay = cartillaDate.getDate()
            const cartillaYear = cartillaDate.getFullYear()
            //console.log(`cartillaMonth:${cartillaMonth} month:${month} cartillaDay:${cartillaDay} day:${day} cartillaYear:${cartillaYear} year:${year}`)
            return (cartillaMonth == month && cartillaDay == day && cartillaYear == year)
        })

        //console.log(this.yearData)
        //console.log(result)
        return !(result == undefined)
    }

    getCartillaIDForDate = (date)=>{
        date = new Date(date)
        const month = date.getMonth()
        const day = date.getDate()
        const year = date.getFullYear()

        let result = this.yearData.find(cartilla => {
            const cartillaDate = new Date(cartilla.date)
            const cartillaMonth = cartillaDate.getMonth()
            const cartillaDay = cartillaDate.getDate()
            const cartillaYear = cartillaDate.getFullYear()
            //console.log(`cartillaMonth:${cartillaMonth} month:${month} cartillaDay:${cartillaDay} day:${day} cartillaYear:${cartillaYear} year:${year}`)
            return (cartillaMonth == month && cartillaDay == day && cartillaYear == year)
        })

        //console.log(this.yearData)
        //console.log(result)
        return result.id
    }

    

    setBlankData = ()=>{
        this.isTodayDataSet = false
        this.todayData = {}
    }

    setGoalsData = (goalsData) =>{
        this.isGoalsSet = true
        this.goalsData = goalsData
    }

    getGoalsData = (dataType, defaultValue = 0) => {
        switch(dataType)
        {
            case "verdura":
                return this.isGoalsSet? this.goalsData.verdura: defaultValue
            case "fruita":
                return this.isGoalsSet? this.goalsData.fruita: defaultValue
            case "xocolata":
                return this.isGoalsSet? this.goalsData.xocolata: defaultValue
            case "dolcos":
                return this.isGoalsSet? this.goalsData.dolcos: defaultValue
            case "extresSalats":
                return this.isGoalsSet? this.goalsData.extresSalats: defaultValue
            case "alcohol":
                return this.isGoalsSet? this.goalsData.alcohol: defaultValue
            case "cardio":
                return this.isGoalsSet? this.goalsData.cardio: defaultValue
            case "forca":
                return this.isGoalsSet? this.goalsData.forca: defaultValue
            case "refrescos":
                return this.isGoalsSet? this.goalsData.refrescos: defaultValue
            case "pes":
                return this.isGoalsSet? this.goalsData.pes: defaultValue
        }
    }

    getTodayData = (dataType, defaultValue = 0) => {
        switch(dataType)
        {
            case "pes":
                return this.isTodayDataSet? this.todayData.pes: defaultValue
            case "fruita":
                return this.isTodayDataSet? this.todayData.fruita: defaultValue
            case "verdura":
                return this.isTodayDataSet? this.todayData.verdura: defaultValue
            case "dolcos":
                return this.isTodayDataSet? this.todayData.dolcos: defaultValue                
            case "xocolata":                
                return this.isTodayDataSet? this.todayData.xocolata: defaultValue                
            case "refrescos":                
                return this.isTodayDataSet? this.todayData.refrescos: defaultValue                
            case "extresSalats":
                return this.isTodayDataSet? this.todayData.extresSalats: defaultValue
            case "alcohol":
                return this.isTodayDataSet? this.todayData.alcohol: defaultValue
            case "dinar":
                return {
                    hidrats: this.isTodayDataSet? this.todayData.dinar.hidrats: UserData.defaultValueString,
                    proteines: this.isTodayDataSet? this.todayData.dinar.proteines: UserData.defaultValueString,
                    fibra: this.isTodayDataSet? this.todayData.dinar.fibra: UserData.defaultValueBoolean,
                    greixos: this.isTodayDataSet? this.todayData.dinar.greixos: UserData.defaultValueBoolean,
                    lactics: this.isTodayDataSet? this.todayData.dinar.lactics: UserData.defaultValueBoolean,
                    comentaris: (this.isTodayDataSet && this.todayData.dinar.comentaris!=undefined)? this.todayData.dinar.comentaris: UserData.defaultValueString,
                }
            case "sopar":
                return {
                    hidrats: this.isTodayDataSet? this.todayData.sopar.hidrats: UserData.defaultValueString,
                    proteines: this.isTodayDataSet? this.todayData.sopar.proteines: UserData.defaultValueString,
                    fibra: this.isTodayDataSet? this.todayData.sopar.fibra: UserData.defaultValueBoolean,
                    greixos: this.isTodayDataSet? this.todayData.sopar.greixos: UserData.defaultValueBoolean,
                    lactics: this.isTodayDataSet? this.todayData.sopar.lactics: UserData.defaultValueBoolean,
                    comentaris: (this.isTodayDataSet && this.todayData.sopar.comentaris!=undefined)? this.todayData.sopar.comentaris: UserData.defaultValueString,
                }
            case "esmorzar":
                return {
                    hidrats: this.isTodayDataSet? this.todayData.esmorzar.hidrats: UserData.defaultValueString,
                    proteines: this.isTodayDataSet? this.todayData.esmorzar.proteines: UserData.defaultValueString,
                    fibra: this.isTodayDataSet? this.todayData.esmorzar.fibra: UserData.defaultValueBoolean,
                    greixos: this.isTodayDataSet? this.todayData.esmorzar.greixos: UserData.defaultValueBoolean,
                    lactics: this.isTodayDataSet? this.todayData.esmorzar.lactics: UserData.defaultValueBoolean,
                    comentaris: (this.isTodayDataSet && this.todayData.esmorzar.comentaris!=undefined)? this.todayData.esmorzar.comentaris: UserData.defaultValueString,
                }
            case "migMati":
                return {
                    hidrats: this.isTodayDataSet? this.todayData.migMati.hidrats: UserData.defaultValueString,
                    proteines: this.isTodayDataSet? this.todayData.migMati.proteines: UserData.defaultValueString,
                    fibra: this.isTodayDataSet? this.todayData.migMati.fibra: UserData.defaultValueBoolean,
                    greixos: this.isTodayDataSet? this.todayData.migMati.greixos: UserData.defaultValueBoolean,
                    lactics: this.isTodayDataSet? this.todayData.migMati.lactics: UserData.defaultValueBoolean,
                    comentaris: (this.isTodayDataSet && this.todayData.migMati.comentaris!=undefined)? this.todayData.migMati.comentaris: UserData.defaultValueString,
                }
            case "berenar":
                return {
                    hidrats: this.isTodayDataSet? this.todayData.berenar.hidrats: UserData.defaultValueString,
                    proteines: this.isTodayDataSet? this.todayData.berenar.proteines: UserData.defaultValueString,
                    fibra: this.isTodayDataSet? this.todayData.berenar.fibra: UserData.defaultValueBoolean,
                    greixos: this.isTodayDataSet? this.todayData.berenar.greixos: UserData.defaultValueBoolean,
                    lactics: this.isTodayDataSet? this.todayData.berenar.lactics: UserData.defaultValueBoolean,
                    comentaris: (this.isTodayDataSet && this.todayData.berenar.comentaris!=undefined)? this.todayData.berenar.comentaris: UserData.defaultValueString,
                }
            case "forca":
                return this.isTodayDataSet? this.todayData.forca: false
            case "cardio":
                return this.isTodayDataSet? this.todayData.cardio: false
            case "data":
                return this.isTodayDataSet? this.todayData.date: null
        }
    }

 }

 export default UserData;