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
let greenColor = '#96C291'
let lightGreenColor = "#96c2912e"
let yellowColor = '#FFDBAA'
let lightYellowColor = '#FFDBAA'
let redColor = '#A73121'
let lightRedColor = '#a7312142'
let blueColor = '#0E21A0'
let lightBlueColor = '#0E21A0'
let pinkColor = '#9400FF'
let lightPinkColor = '#9400FF'
let whiteColor = '#FFFFFF'

function ObjectivesTables(props) {
	const dataCartillas = props.dataCartillas
	console.log(`[ObjectiveTables]`)
    console.log(dataCartillas)
    
	let verduresAcc = 0
	let fruitesAcc = 0
	let dolcosAcc = 0
	let xocolataAcc = 0
	let extresSalatsAcc = 0
	let alcoholAcc = 0
	let refrescosAcc = 0

	if(dataCartillas){
		verduresAcc = userData.getSumatorioDe("verdura", dataCartillas)
		fruitesAcc = userData.getSumatorioDe("fruita", dataCartillas)
		dolcosAcc = userData.getSumatorioDe("dolcos", dataCartillas)
		xocolataAcc = userData.getSumatorioDe("xocolata", dataCartillas)
		extresSalatsAcc = userData.getSumatorioDe("extresSalats", dataCartillas)
		alcoholAcc = userData.getSumatorioDe("alcohol", dataCartillas)
		refrescosAcc = userData.getSumatorioDe("refrescos", dataCartillas)
		//console.log(`xocolataAcc:${xocolataAcc} extresSalatsAcc:${extresSalatsAcc} dolcosAcc:${dolcosAcc} verduresAcc:${verduresAcc} fruitesAcc:${fruitesAcc} refrescosAcc:${refrescosAcc} alcoholAcc:${alcoholAcc}`)
	}
	
	const acumulados = {
		"fruita": fruitesAcc,
		"verdura": verduresAcc,
		"alcohol": alcoholAcc,
		"xocolata": xocolataAcc,
		"dolcos": dolcosAcc,
		"refrescos": refrescosAcc,
		"extresSalats": extresSalatsAcc
	}

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

	const estadistiquesRender = () => (
		<>
            <Divider maxwidth="md" sx={{m:1}}>
                <Chip label="Objectius mínims"/>
            </Divider>
            <TableContainer maxwidth="md" sx={{mt:3, mb:3}} component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{backgroundColor:lightGreyColor,
                            '& .MuiTableCell-root':{fontWeight:700} }}>
                            <TableCell sx={firstElementStyle} >Tipus</TableCell>
                            <TableCell sx={noPaddingStyle} >Total setmana</TableCell>
                            <TableCell sx={noPaddingStyle} >Min. setmana</TableCell>
                            <TableCell sx={noPaddingStyle} >Resultat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* ROWS aqui, condicionales según usuario */}
                        {userData.hasCamp("verdura") &&
                            <TableRow
                                key="verdura"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell sx={centeringStyle} component="th" scope="row">Verdura</TableCell>
                                <TableCell sx={centeringStyle}>{acumulados["verdura"]}</TableCell>
                                <TableCell sx={centeringStyle}>{userData.user.maxims["verdura"].setmana}</TableCell>
                                <TableCell sx={centeringStyle}>
                                    <ResultIcon type="minims" acumulat={acumulados["verdura"]} minSetmana={userData.user.maxims["verdura"].setmana} />
                                </TableCell>   
                            </TableRow>
                        }
                        {userData.hasCamp("fruita") &&
                            <TableRow
                                key="fruita"
                                sx={{ '&:last-child td, &:last-child th': { border: 0} }}
                                >
                                <TableCell sx={centeringStyle} component="th" scope="row">Fruita</TableCell>
                                <TableCell sx={centeringStyle}>{acumulados["fruita"]}</TableCell>
                                <TableCell sx={centeringStyle}>{userData.user.maxims["fruita"].setmana}</TableCell>
                                <TableCell sx={centeringStyle}>
                                    <ResultIcon type="minims" acumulat={acumulados["fruita"]} minSetmana={userData.user.maxims["fruita"].setmana} />
                                </TableCell>

                            </TableRow>
                        }							
                    </TableBody>
                </Table>
            </TableContainer>	
            <Divider maxwidth="md" sx={{m:1}}>
                <Chip label="Objectius máxims"/>
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
                        {/* ROWS aqui, condicionales según usuario */}
                        {userData.hasCamp("xocolata") &&
                            <TableRow
                                key="xocolata"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell sx={centeringStyle} component="th" scope="row">Xocolata</TableCell>
                                <TableCell sx={centeringStyle}>{xocolataAcc}</TableCell>
                                <TableCell sx={centeringStyle}>{userData.user.maxims["xocolata"].setmana}</TableCell>
                                <TableCell sx={centeringStyle}>
                                    <ResultIcon type="maxims" acumulat={acumulados["xocolata"]} maxSetmana={userData.user.maxims["xocolata"].setmana} />
                                </TableCell>
                            </TableRow>
                        }
                        {userData.hasCamp("dolcos") &&
                            <TableRow
                                key="dolcos"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell sx={centeringStyle} component="th" scope="row">Dolços</TableCell>
                                <TableCell sx={centeringStyle}>{dolcosAcc}</TableCell>
                                <TableCell sx={centeringStyle}>{userData.user.maxims["dolcos"].setmana}</TableCell>
                                <TableCell sx={centeringStyle}>
                                    <ResultIcon type="maxims" acumulat={acumulados["dolcos"]} maxSetmana={userData.user.maxims["dolcos"].setmana} />
                                </TableCell>
                            </TableRow>
                        }
                        {userData.hasCamp("extresSalats") &&
                            <TableRow
                                key="extresSalats"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                >
                                <TableCell sx={centeringStyle} component="th" scope="row">Extres Salats</TableCell>
                                <TableCell sx={centeringStyle}>{extresSalatsAcc}</TableCell>
                                <TableCell sx={centeringStyle}>{userData.user.maxims["extresSalats"].setmana}</TableCell>
                                <TableCell sx={centeringStyle} >
                                    <ResultIcon type="maxims" acumulat={acumulados["extresSalats"]} maxSetmana={userData.user.maxims["extresSalats"].setmana} />    
                                </TableCell>
                            </TableRow>
                        }
                        {userData.hasCamp("alcohol") &&
                            <TableRow
                                key="alcohol"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                >
                                <TableCell sx={centeringStyle} component="th" scope="row">Alcohol</TableCell>
                                <TableCell sx={centeringStyle}>{alcoholAcc}</TableCell>
                                <TableCell sx={centeringStyle}>{userData.user.maxims["alcohol"].setmana}</TableCell>
                                <TableCell sx={centeringStyle}>
                                    <ResultIcon type="maxims" acumulat={acumulados["alcohol"]} maxSetmana={userData.user.maxims["alcohol"].setmana} />    
                                </TableCell>
                            </TableRow>
                        }
                        {userData.hasCamp("refrescos") &&
                            <TableRow
                                key="refrescos"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                >
                                <TableCell sx={centeringStyle} component="th" scope="row">Refrescos</TableCell>
                                <TableCell sx={centeringStyle}>{refrescosAcc}</TableCell>
                                <TableCell sx={centeringStyle}>{userData.user.maxims["refrescos"].setmana}</TableCell>
                                <TableCell sx={centeringStyle}>
                                    <ResultIcon type="maxims" acumulat={acumulados["refrescos"]} maxSetmana={userData.user.maxims["refrescos"].setmana} />    
                                </TableCell>
                            </TableRow>
                        }
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

export default ObjectivesTables