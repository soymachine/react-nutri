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
    static proteinasTable = {
        "carn_vermella": 0,
        "carn_blanca": 1,
        "peix_blanc": 2,
        "peix_blau": 3,
        "llegums": 4,
        "ous": 5,
        "res": 6,
    }

    static maxProteinasPerWeekTable = {
        "carn_vermella": 2,
        "carn_blanca": 2,
        "peix_blanc": 2,
        "peix_blau": 2,
        "llegums": 2,
        "ous": 4
    }

    constructor(props) {
        this.user= ''
        this.todayData= {}
        this.goalsData= {}
        this.isTodayDataSet = false
        this.isGoalsSet = false
        this.today = new Date()
    }

    setToday = (newDate) =>{
        this.today = new Date(newDate)
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

    setTodayData = (todayData, toUpdate)=>{
        
        this.isTodayDataSet = true
        this.todayData = todayData
        console.log(`[UserData ->setTodayData] todayData.date:${todayData.date} toUpdate:${toUpdate}`)
        console.log(`[UserData ->setTodayData] todayData:`)
        console.log(todayData)
        if(this.yearData && toUpdate){
            // Actualizamos también la entrada de este dia en yearData
            this.yearData = this.yearData.map( cartilla => {
                console.log(`cartilla.date:${cartilla.date} todayData.date:´${todayData.date}`)
                
                if(this.areDatesEqual(cartilla.date, todayData.date)){
                    console.log("fecha encontrada, vamos a actualizarla")
                    return todayData
                }else{
                    return cartilla
                }
            })
            // console.log(this.yearData)
        }
    }

    areDatesEqual = (date1, date2)=>{
        date1 = new Date(date1)
        date2 = new Date(date2)

        const date1Year = date1.getFullYear()
        const date1Month = date1.getMonth()
        const date1Day = date1.getDate()

        const date2Year = date2.getFullYear()
        const date2Month = date2.getMonth()
        const date2Day = date2.getDate()

        if(date1Year == date2Year && date1Month == date2Month && date1Day == date2Day){
            return true
        }

        return false

    }

    getMaximsForAliment = (aliment)=>{
        
        if(this.user != null){
            for (const [key, value] of Object.entries(this.user.maxims)) {
                // console.log(`${key}: ${value}`);
                if(key == aliment){
                    return value
                }
            }
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
        
        if( this.yearData == null ||  this.yearData == undefined) return null

        const fromStr = condition.from
        const toStr = condition.to

        const fromDate = new Date(fromStr)
        const toDate = new Date(toStr)
        
        const newData = this.yearData.filter( cartilla =>{
            const cartillaDate = new Date(cartilla.date)
            //console.log(`filtering, cartillaDate:${cartillaDate} fromDate:${fromDate} toDate:${toDate}` )
            if(fromDate < cartillaDate && cartillaDate < toDate){
                //console.log(`Pasa el filtro!`)
                return true
            }else{
                return false
            }
        } )
        
        return newData
        // console.log(`fromDate:${fromDate} toDate:${toDate}`)
    }

    getSumatorioDe = (alimento, coleccionCartillas) =>{
        const alimentoAcumulado = coleccionCartillas.reduce((sum, cartilla) =>{
			return sum + cartilla[alimento]
		}, 0)
        return alimentoAcumulado
    }

    getSumatorioDeProteinas = (proteina, coleccionCartillas) =>{

        const proteina_id = UserData.proteinasTable[proteina]

        const proteinaAcumulada = coleccionCartillas.reduce((sum, cartilla) =>{
            // Los ids
            const proteines_esmorzar = cartilla.berenar.proteines
            const proteines_migMati = cartilla.migMati.proteines
            const proteines_dinar = cartilla.dinar.proteines
            const proteines_sopar = cartilla.sopar.proteines

            let totalProteines = 0
            if(proteines_esmorzar == proteina_id) totalProteines += 1
            if(proteines_migMati == proteina_id) totalProteines += 1
            if(proteines_dinar == proteina_id) totalProteines += 1
            if(proteines_sopar == proteina_id) totalProteines += 1

			return sum + totalProteines
		}, 0)
        return proteinaAcumulada
    }

    getCartillasFromCurentWeek = (currentDate) =>{
        // from:"2023/09/11", to:"2023/09/18"
        const today = new Date(currentDate)
        let dayNumber = today.getDay()
        if(dayNumber == 0) dayNumber = 7
        const day = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()
        const dayWeekStart = day - (dayNumber - 1)
        const dayWeekEnd = dayWeekStart + 7
        const initialDateStr = `${year}/${this.zeroPad(month, 2)}/${this.zeroPad(dayWeekStart, 2)}`
        const endDateStr = `${year}/${this.zeroPad(month, 2)}/${this.zeroPad(dayWeekEnd, 2)}`

        // console.log(`[getCartillasFromCurentWeek] currentDate:${currentDate} initialDateStr:${initialDateStr} endDateStr:${endDateStr}`)

        return this.getCartillasFromDates({
            from:initialDateStr,
            to:endDateStr
        })           

    }

    getStringSetmana = (currentDate) =>{
        const today = new Date(currentDate)
        let dayNumber = today.getDay()
        if(dayNumber == 0) dayNumber = 7
        const day = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()
        const dayWeekStart = day - (dayNumber - 1)
        const dayWeekEnd = dayWeekStart + 7
        const initialDateStr = `${this.zeroPad(dayWeekStart, 2)}/${this.zeroPad(month, 2)}/`
        const endDateStr = `${this.zeroPad(dayWeekEnd, 2)}/${this.zeroPad(month, 2)}`
        const str = `Setmana del ${initialDateStr} al ${endDateStr}`
        return str
    }

    getStartAndEndWeekDays = (currentDate) =>{
        const today = new Date(currentDate)
        let dayNumber = today.getDay()
        if(dayNumber == 0) dayNumber = 7
        const day = today.getDate()
        const dayWeekStart = day - (dayNumber - 1)
        const dayWeekEnd = dayWeekStart + 6
        return {
            start:dayWeekStart,
            end:dayWeekEnd
        }
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
            /**** proteines ****/
            case "carn_vermella_vegades":
                return this.isGoalsSet && this.goalsData.proteines?.carn_vermella? this.goalsData.proteines.carn_vermella.vegades: defaultValue
            case "carn_vermella_grams":
                return this.isGoalsSet && this.goalsData.proteines?.carn_vermella? this.goalsData.proteines.carn_vermella.grams: defaultValue   
            case "carn_blanca_vegades":
                return this.isGoalsSet && this.goalsData.proteines?.carn_blanca? this.goalsData.proteines.carn_blanca.vegades: defaultValue
            case "carn_blanca_grams":
                return this.isGoalsSet && this.goalsData.proteines?.carn_blanca? this.goalsData.proteines.carn_blanca.grams: defaultValue
            case "peix_blau_vegades":
                return this.isGoalsSet && this.goalsData.proteines?.peix_blau? this.goalsData.proteines.peix_blau.vegades: defaultValue
            case "peix_blau_grams":
                return this.isGoalsSet && this.goalsData.proteines?.peix_blau? this.goalsData.proteines.peix_blau.grams: defaultValue 
            case "peix_blanc_vegades":
                return this.isGoalsSet && this.goalsData.proteines?.peix_blanc? this.goalsData.proteines.peix_blanc.vegades: defaultValue
            case "peix_blanc_grams":
                return this.isGoalsSet && this.goalsData.proteines?.peix_blanc? this.goalsData.proteines.peix_blanc.grams: defaultValue  
            case "ous_vegades":
                return this.isGoalsSet && this.goalsData.proteines?.ous? this.goalsData.proteines.ous.vegades: defaultValue
            case "ous_grams":
                return this.isGoalsSet && this.goalsData.proteines?.ous? this.goalsData.proteines.ous.grams: defaultValue    
            case "llegums_vegades":
                return this.isGoalsSet && this.goalsData.proteines?.llegums? this.goalsData.proteines.llegums.vegades: defaultValue
            case "llegums_grams":
                return this.isGoalsSet && this.goalsData.proteines?.llegums? this.goalsData.proteines.llegums.grams: defaultValue             
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