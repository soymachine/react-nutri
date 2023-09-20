import { useState, useEffect, useRef } from 'react'
import { Box, Chip, Container, Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import UserData from '../logic/data/UserData'
import Models from '../logic/data/Models'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const userData = UserData.getInstance()
const models = Models.getInstance()

const checkedStyle = {
    color:"green"
}

const pendingStyle = {
    color:"orange"
}

const alertStyle = {
    color:"red"
}

const createTag = (type)=>{
    switch(type){
        case "checked":
            return (<CheckCircleIcon sx={checkedStyle} />)
        case "pending":
            return (<PendingIcon sx={pendingStyle} />)
    }
}

function ResumSetmana(props) {
	let navigate = props.navigate
	let dataCartillas = props.dataCartillas
    let progressPercent = (dataCartillas.length / 7) * 100
    
    // De momento miramos si está o no está
    let styleForDays = Array(7).fill("pending")
    dataCartillas.map((cartilla) =>{
        let dayNum = new Date(cartilla.date).getDay()
        let day = new Date(cartilla.date).getDate()
        // console.log(`dayNum:${dayNum} day:${day}`)
        if(dayNum == 0) dayNum = 7
        styleForDays[dayNum-1] = "checked"
        return true

    })
    //console.log(styleForDays)


	return (
		<>
        <Container component="main" maxWidth="md" sx={{mb:3}}>
			<Divider sx={{mb:3}} maxwidth="md">
                <Chip label="Progres Setmanal"/>
            </Divider>
            <LinearProgress sx={{borderRadius:2, height:10}} variant="determinate" value={progressPercent} />
            <TableContainer sx={{mt:3, mb:3}} component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{}}>
                            <TableCell sx={{padding:0}} align="center">Dll</TableCell>
                            <TableCell sx={{padding:0}} align="center">Dm</TableCell>
                            <TableCell sx={{padding:0}} align="center">Dx</TableCell>
                            <TableCell sx={{padding:0}} align="center">Dj</TableCell>
                            <TableCell sx={{padding:0}} align="center">Dv</TableCell>
                            <TableCell sx={{padding:0}} align="center">Ds</TableCell>
                            <TableCell sx={{padding:0}} align="center">Dg</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow sx={{}}>
                            <TableCell sx={{padding:0.5}} align="center">{createTag(styleForDays[0])}</TableCell>
                            <TableCell sx={{padding:0.5}} align="center">{createTag(styleForDays[1])}</TableCell>
                            <TableCell sx={{padding:0.5}} align="center">{createTag(styleForDays[2])}</TableCell>
                            <TableCell sx={{padding:0.5}} align="center">{createTag(styleForDays[3])}</TableCell>
                            <TableCell sx={{padding:0.5}} align="center">{createTag(styleForDays[4])}</TableCell>
                            <TableCell sx={{padding:0.5}} align="center">{createTag(styleForDays[5])}</TableCell>
                            <TableCell sx={{padding:0.5}} align="center">{createTag(styleForDays[6])}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
		</>
	)
}

export default ResumSetmana