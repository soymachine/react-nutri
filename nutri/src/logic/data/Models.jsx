import Model from './Model'

class Models{
    static CARN_VERMELLA = "Carn vermella"
    static CARN_BLANCA = "Carn blanca"
    static PEIX_BLAU = "Peix blau"
    static PEIX_BLANC = "Peix blanc"
    static LLEGUMS = "Llegums"
    static OUS = "Ous"
    static PASTA = "Pasta"
    static ARROS = "Arròs"
    static PATATA = "Patata"
    static PA = "Pà"
    static RES = "(Res)"

    static myInstance = null
    static getInstance(){
        if(Models.myInstance == null){
            Models.myInstance = new Models()   
        }
        return this.myInstance
    }
    
    constructor() {
        /************** PROTEINES ******************/

        const proteines_model = [
            {
                "value": 0,
                "label":Models.CARN_VERMELLA
            },
            {
                "value": 1,
                "label":Models.CARN_BLANCA
            },
            {
                "value": 2,
                "label":Models.PEIX_BLAU
            },
            {
                "value": 3,
                "label":Models.PEIX_BLANC
            },
            {
                "value": 4,
                "label":Models.LLEGUMS
            },
            {
                "value": 5,
                "label":Models.OUS
            },
            {
                "value": 6,
                "label":Models.RES
            }
        ]

        this.proteines = new Model(proteines_model)

        /************** HIDRATS ******************/

        const hidrats_model = [
            {
                "value": 0,

                "label":Models.PASTA
            },
            {
                "value": 1,

                "label":Models.ARROS
            },
            {
                "value": 2,

                "label":Models.PATATA
            },
            {
                "value": 3,

                "label":Models.PA
            },
            {
                "value": 4,

                "label":Models.RES
            },
        ]
        this.hidrats = new Model(hidrats_model)        
    }

    getHidratsLabel = (id)=>{
        return this.hidrats.getLabel(id)
    }

    getHidratsValue = (id)=>{
        return this.hidrats.getValue(id)
    }

    getProteinesLabel = (id)=>{
        return this.proteines.getLabel(id)
    }

    getProteinesValue = (id)=>{
        return this.proteines.getValue(id)
    }

 }

 export default Models;