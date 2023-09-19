 class Model{

    constructor(_properties) {
        this.properties = _properties
    }

    getValue = (id)=>{
        const value = this.properties.find( item => {
            return (item["label"] == id)
        })
        return value["value"]
    }

    getLabel = (id)=>{
        const value = this.properties.find( item => {
            return (item["label"] == id)
        })
        return value["label"]
    }
    

 }

 export default Model;