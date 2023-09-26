import { useState, useEffect, useRef } from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const halfPercent = 0.5
const fullPercent = 1.0
const extraPercent = 1.25

const redRGB = {
    r:209,
    g:40,
    b:20
}

const orangeRGB = {
    r:209,
    g:157,
    b:22
}

const greenRGB = {
    r:18,
    g:133,
    b:13
}

const greenLightRGB = {
    r:32,
    g:219,
    b:56
}

function colorInterpolate(colorA, colorB, intval) {
    const rgbA = colorA
    const rgbB = colorB;
    const colorVal = (prop) =>
      Math.round(rgbA[prop] * (1 - intval) + rgbB[prop] * intval);

    return {
      r: colorVal('r'),
      g: colorVal('g'),
      b: colorVal('b'),
    }
  }

const addTagMinims = (accumulat, minSetmana)=>{
    const percent = accumulat / minSetmana
    let subPercent = 0
    let alphaPercent = 0
    let style = {}
    if(percent < halfPercent){
        // Entre 0-50%
        subPercent = (percent) / halfPercent
        
        // Alfa de 100 a 50%
        alphaPercent = 1 - (subPercent)
        style.color = `rgb(${redRGB.r},${redRGB.g},${redRGB.b},${alphaPercent})`
        return (<ErrorOutlineIcon sx={style} />)
    }else if(percent >= halfPercent && percent < fullPercent){
        // Entre 50-100%
        subPercent = (percent - halfPercent) / (fullPercent - halfPercent)
        // Alfa de 100 a 50%
        alphaPercent = .5 + (subPercent * .5)
        style.color = `rgb(${orangeRGB.r},${orangeRGB.g},${orangeRGB.b},${alphaPercent})`
        return (<ErrorOutlineIcon sx={style} />)
    }else{
        // >= 100% pero solo nos interesa hasta el 15% extra 115%
        subPercent = percent
        if(subPercent > extraPercent)  subPercent = extraPercent

        // Alfa de 50 a 100%
        alphaPercent = (subPercent - 1) / (extraPercent- 1)
        const colorInt = colorInterpolate(greenRGB, greenLightRGB, alphaPercent)
        style.color = `rgb(${colorInt.r},${colorInt.g},${colorInt.b})`
        //console.log(`alphaPercent:${alphaPercent} para acc:${accumulat} min.set:${minSetmana} subPercent:${subPercent} extraPercent:${extraPercent}`)
        return (<CheckCircleIcon sx={style} />)
    }
}

const addTagMaxims = (accumulat, maxSetmana)=>{

    let percent = accumulat / maxSetmana
    let subPercent = percent
    if(percent > 1) percent = 1
    let alphaPercent = 0
    let style = {}
    // Alfa de 50 a 100%
    alphaPercent = percent
    const colorInt = colorInterpolate(greenRGB, greenLightRGB, alphaPercent)
    style.color = `rgb(${colorInt.r},${colorInt.g},${colorInt.b})`
    // console.log(`[max] percent:${percent} alphaPercent:${alphaPercent} para acc:${accumulat} maxSetmana:${maxSetmana} subPercent:${subPercent} extraPercent:${extraPercent}`)

    if(subPercent <= 1)
    {
        return (<CheckCircleIcon sx={style} />)
    }
    else
    {
        style.color = `rgb(${redRGB.r},${redRGB.g},${redRGB.b})`
        return (<ErrorOutlineIcon sx={style} />)
    }
}

function ResltIcon(props) {

    const renderIcon = (type)=>{
        if(type =="minims")
        {
            return (addTagMinims(props.acumulat, props.minSetmana))
        }else if(type =="maxims")
        {
            return(addTagMaxims(props.acumulat, props.maxSetmana))
        }
    }

	return (
		<>
			{renderIcon(props.type)}
		</>
	)
}

export default ResltIcon