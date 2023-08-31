import React from 'react'
function ShowDate({dateString}) {

    const dat = new Date(dateString) 
    const year = dat.getFullYear()
    const day = dat.getDate()
    const month = dat.getMonth()
    const months = ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre","desembre"]
    
    const getDeApostrof = (month)=>{
        const de = "de "
        const deap = "d'"
        switch(month){
            case 0:
            case 1:
            case 2:
            case 4:
            case 5:
            case 6:
            case 8:
            case 10:
            case 11:
                return de
            case 3:
            case 7:
            case 9:
                return deap

        }
    }

    return (
        <>
           
            <div>{`${day} ${getDeApostrof(month)}${months[month]} del ${year}`}</div>
        </>
    )
}

export default ShowDate