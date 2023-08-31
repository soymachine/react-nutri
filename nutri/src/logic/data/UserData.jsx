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
        this.isTodayDataSet = false
    }

    setTodayData = (todayData)=>{
        console.error(todayData)
        this.todayData = todayData
        if(todayData !== undefined){
            this.isTodayDataSet = true
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
            case "exercici-fet":
                return this.isTodayDataSet? this.todayData.exercici.fet: false
            case "exercici-tipus":
                return this.isTodayDataSet? this.todayData.exercici.tipus: defaultValue
            case "data":
                return this.isTodayDataSet? this.todayData.date: null
        }
    }

 }

 export default UserData;