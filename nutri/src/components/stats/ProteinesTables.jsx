import { useState, useEffect, useRef } from 'react'
import { Chip, Divider,Paper} from '@mui/material'
import UserData from '../../logic/data/UserData'
import ResultIcon from '../../components/helpers/ResultIcon'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const userData = UserData.getInstance()
let spanAmount = 5
let lightGreyColor = '#00000003'

function ProteinesTables(props) {
	const dataCartillas = props.dataCartillas
	//console.log(`[ProteinesTables]`)
    //console.log(dataCartillas)
    
	let carnVermellaAcc = 0
	let carnBlancaAcc = 0
	let peixBlancAcc = 0
	let peixBlauAcc = 0
	let llegumsAcc = 0
	let ousAcc = 0
	

	if(dataCartillas){
		carnVermellaAcc = userData.getSumatorioDeProteinas("carn_vermella", dataCartillas)
		carnBlancaAcc = userData.getSumatorioDeProteinas("carn_blanca", dataCartillas)
		peixBlancAcc = userData.getSumatorioDeProteinas("peix_blanc", dataCartillas)
		peixBlauAcc = userData.getSumatorioDeProteinas("peix_blau", dataCartillas)
		llegumsAcc = userData.getSumatorioDeProteinas("llegums", dataCartillas)
		ousAcc = userData.getSumatorioDeProteinas("ous", dataCartillas)
		
		//console.log(`xocolataAcc:${xocolataAcc} extresSalatsAcc:${extresSalatsAcc} dolcosAcc:${dolcosAcc} verduresAcc:${verduresAcc} fruitesAcc:${fruitesAcc} refrescosAcc:${refrescosAcc} alcoholAcc:${alcoholAcc}`)
	}
	
	const acumulados = {
		"carn_vermella": carnVermellaAcc,
		"carn_blanca": carnBlancaAcc,
		"peix_blanc": peixBlancAcc,
		"peix_blau": peixBlauAcc,
		"llegums": llegumsAcc,
		"ous": ousAcc,
	}

    const proteinesArray = [
        {
            id: "carn_vermella",
            label: "Carn vermella"
        },
        {
            id: "carn_blanca",
            label: "Carn blanca"
        },
        {
            id: "peix_blanc",
            label: "Peix blanc"
        },
        {
            id: "peix_blau",
            label: "Peix blau"
        },
        {
            id: "llegums",
            label: "Llegums"
        },
        {
            id: "ous",
            label: "Ous"
        },
    ]

	const noPaddingStyle = {
		padding:1,
		textAlign:"center"
	}

	const centeringStyle = {
		padding:1,
		textAlign:"center"
	}

	const firstElementStyle = {
		width:200,
		...noPaddingStyle
	}

    const getProteinaLabel = (proteina_id) =>{
        const proteinaObjFound = proteinesArray.find(proteinaObj =>{
            if(proteinaObj.id == proteina_id) return true
            return false
        })
        return proteinaObjFound.label
    }

	const estadistiquesRender = () => (
		<>
            <Divider maxwidth="md" sx={{m:1}}>
                <Chip label="Proteines"/>
            </Divider>
            <TableContainer sx={{mt:3, mb:3}} component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{backgroundColor:lightGreyColor,
                            '& .MuiTableCell-root':{fontWeight:700} }}>
                            <TableCell sx={firstElementStyle} >Tipus</TableCell>
                            <TableCell sx={noPaddingStyle} >Total setmana</TableCell>
                            <TableCell sx={noPaddingStyle} >Max. setmana</TableCell>
                            <TableCell sx={noPaddingStyle} >Resultat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proteinesArray.map(proteina =>{

                            return (
                                <TableRow
                                    key={proteina.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell sx={centeringStyle} component="th" scope="row">{getProteinaLabel(proteina.id)}</TableCell>
                                    <TableCell sx={centeringStyle}>{acumulados[proteina.id]}</TableCell>
                                    <TableCell sx={centeringStyle}>{userData.getGoalsData(`${proteina.id}_vegades`)}</TableCell>
                                    <TableCell sx={centeringStyle}>
                                        <ResultIcon type="maxims" acumulat={acumulados[proteina.id]} maxSetmana={UserData.maxProteinasPerWeekTable[proteina.id]} />                                            
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>						
		</>
	)


	return (
		<>
			{estadistiquesRender()}
		</>
	)
}

export default ProteinesTables