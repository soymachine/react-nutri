import React from "react";

class UserData{
    static myInstance = null
    static getInstance(){
        if(UserData.myInstance == null){
            UserData.myInstance = new UserData()   
        }
        return this.myInstance
    }

    constructor(props) {
        this.user= ''
        this.todayData= {}
        this.goalsData= {}
        this.isTodayDataSet = false
        this.isGoalsSet = false
    }

    setTodayData = (todayData)=>{
        console.log(`setTodayData: this.isTodayDataSet:${this.isTodayDataSet}`)
        console.error(todayData)
        if(!this.isTodayDataSet){
            this.isTodayDataSet = true
            this.todayData = todayData
        }
    }

    setGoalsData = (goalsData) =>{
        console.log(`setGoalsData: this.isGoalsSet:${this.isGoalsSet}`)
        console.error(goalsData)
        if(!this.isGoalsSet){
            this.isGoalsSet = true
            this.goalsData = goalsData
        }
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
                    hidrats: this.isTodayDataSet? this.todayData.dinar.hidrats: defaultValue,
                    proteines: this.isTodayDataSet? this.todayData.dinar.proteines: defaultValue,
                    fibra: this.isTodayDataSet? this.todayData.dinar.fibra: defaultValue,
                    greixos: this.isTodayDataSet? this.todayData.dinar.greixos: defaultValue,
                    lactics: this.isTodayDataSet? this.todayData.dinar.lactics: defaultValue,
                }
            case "sopar":
                return {
                    hidrats: this.isTodayDataSet? this.todayData.sopar.hidrats: defaultValue,
                    proteines: this.isTodayDataSet? this.todayData.sopar.proteines: defaultValue,
                    fibra: this.isTodayDataSet? this.todayData.sopar.fibra: defaultValue,
                    greixos: this.isTodayDataSet? this.todayData.sopar.greixos: defaultValue,
                    lactics: this.isTodayDataSet? this.todayData.sopar.lactics: defaultValue,
                }
            case "esmorzar":
                return {
                    hidrats: this.isTodayDataSet? this.todayData.esmorzar.hidrats: defaultValue,
                    proteines: this.isTodayDataSet? this.todayData.esmorzar.proteines: defaultValue,
                    fibra: this.isTodayDataSet? this.todayData.esmorzar.fibra: defaultValue,
                    greixos: this.isTodayDataSet? this.todayData.esmorzar.greixos: defaultValue,
                    lactics: this.isTodayDataSet? this.todayData.esmorzar.lactics: defaultValue,
                }
            case "migMati":
                return {
                    hidrats: this.isTodayDataSet? this.todayData.migMati.hidrats: defaultValue,
                    proteines: this.isTodayDataSet? this.todayData.migMati.proteines: defaultValue,
                    fibra: this.isTodayDataSet? this.todayData.migMati.fibra: defaultValue,
                    greixos: this.isTodayDataSet? this.todayData.migMati.greixos: defaultValue,
                    lactics: this.isTodayDataSet? this.todayData.migMati.lactics: defaultValue,
                }
            case "berenar":
                return {
                    hidrats: this.isTodayDataSet? this.todayData.berenar.hidrats: defaultValue,
                    proteines: this.isTodayDataSet? this.todayData.berenar.proteines: defaultValue,
                    fibra: this.isTodayDataSet? this.todayData.berenar.fibra: defaultValue,
                    greixos: this.isTodayDataSet? this.todayData.berenar.greixos: defaultValue,
                    lactics: this.isTodayDataSet? this.todayData.berenar.lactics: defaultValue,
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