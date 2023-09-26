import { useState, useEffect, useRef } from 'react'
import ObjectiveNumberForm from '../components/ObjectiveNumberForm'
import NumberForm from '../components/NumberForm'
import { Box, Chip, Divider, TextField, Alert, AlertTitle, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import UserData from '../logic/data/UserData'
import CustomBackdrop from '../components/helpers/CustomBackdrop'

let greenColor = '#96C291'
let yellowColor = '#FFBA86'
let redColor = '#FFB7B7'

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
let lightGreyColor = '#00000003'

const userData = UserData.getInstance()

function GoalsForm(props) {
	let navigate = props.navigate

	let submitLabel = userData.isGoalsSet? "Actualitzar": "Desar"

	let fruita_init_value = userData.getGoalsData("fruita")
	let alcohol_init_value = userData.getGoalsData("alcohol")
	let refrescos_init_value = userData.getGoalsData("refrescos")
	let verdura_init_value = userData.getGoalsData("verdura")
	let xocolata_init_value = userData.getGoalsData("xocolata")
	let dolcos_init_value = userData.getGoalsData("dolcos")
	let extresSalats_init_value = userData.getGoalsData("extresSalats")
	let forca_init_value = userData.getGoalsData("forca")
	let cardio_init_value = userData.getGoalsData("cardio")
	let pes_init_value = userData.getGoalsData("pes")

	/* Proteines */
	let carn_vermella_vegades_init_value = userData.getGoalsData("carn_vermella_vegades")
	let carn_vermella_grams_init_value = userData.getGoalsData("carn_vermella_grams")
	let carn_blanca_vegades_init_value = userData.getGoalsData("carn_blanca_vegades")
	let carn_blanca_grams_init_value = userData.getGoalsData("carn_blanca_grams")
	let peix_blau_vegades_init_value = userData.getGoalsData("peix_blau_vegades")
	let peix_blau_grams_init_value = userData.getGoalsData("peix_blau_grams")
	let peix_blanc_vegades_init_value = userData.getGoalsData("peix_blanc_vegades")
	let peix_blanc_grams_init_value = userData.getGoalsData("peix_blanc_grams")
	let ous_vegades_init_value = userData.getGoalsData("ous_vegades")
	let ous_grams_init_value = userData.getGoalsData("ous_grams")
	let llegums_vegades_init_value = userData.getGoalsData("llegums_vegades")
	let llegums_grams_init_value = userData.getGoalsData("llegums_grams")


	const fruitaNumberRef = useRef()	
	const verduraNumberRef = useRef()	
	const alcoholNumberRef = useRef()
	const xocolataNumberRef = useRef()
	const dolcosNumberRef = useRef()
	const refrescosNumberRef = useRef()
	const extresSalatsNumberRef = useRef()
	const pesNumberRef = useRef()
	const forcaNumberRef = useRef()
	const cardioNumberRef = useRef()

	/******** Proteines  *********/
	const carnVermellaNumberRef = useRef()
	const carnBlancaNumberRef = useRef()
	const peixBlauNumberRef = useRef()
	const peixBlancNumberRef = useRef()
	const ousNumberRef = useRef()
	const llegumsNumberRef = useRef()

	const carnVermellaGramsRef = useRef()
	const carnBlancaGramsRef = useRef()
	const peixBlauGramsRef = useRef()
	const peixBlancGramsRef = useRef()
	const ousGramsRef = useRef()
	const llegumsGramsRef = useRef()

	
	const [user, setUser] = useState(props.user)
	const [open, setOpen] = useState(true);
	const [openBackdrop, setOpenBackdrop] = useState(false)
	

	const hook = () => {
		// Si no hay usuario, entonces navegamos a otra página
		if(user === null){
			returnToHome()
		}
	}

	useEffect(hook, [])

	const handleCloseBackdrop = () => {
		setOpenBackdrop(false);
	};

	if(props.responseFromServer) setTimeout(handleCloseBackdrop, 3000);

	const OnGoalsSubmit = (event) => {
		event.preventDefault()
		setOpenBackdrop(true)	

		const pes = pesNumberRef.current.getQuantity()
		const sendObject = {}
		sendObject["pes"] = pes
		
		userData.hasCamp("fruita")? sendObject["fruita"] = fruitaNumberRef.current.getQuantity():null
		userData.hasCamp("dolcos")? sendObject["dolcos"] = dolcosNumberRef.current.getQuantity():null
		userData.hasCamp("alcohol")? sendObject["alcohol"] = alcoholNumberRef.current.getQuantity():null
		userData.hasCamp("forca")? sendObject["forca"] = forcaNumberRef.current.getQuantity():null
		userData.hasCamp("cardio")? sendObject["cardio"] = cardioNumberRef.current.getQuantity():null
		userData.hasCamp("xocolata")? sendObject["xocolata"] = xocolataNumberRef.current.getQuantity():null
		userData.hasCamp("verdura")? sendObject["verdura"] = verduraNumberRef.current.getQuantity():null
		userData.hasCamp("extresSalats")? sendObject["extresSalats"] = extresSalatsNumberRef.current.getQuantity():null
		userData.hasCamp("refrescos")? sendObject["refrescos"] = refrescosNumberRef.current.getQuantity():null

		sendObject["proteines"] = {
			carn_vermella: {
				vegades:carnVermellaNumberRef.current.getQuantity(),
				grams:carnVermellaGramsRef.current.getQuantity(),
			},
			carn_blanca: {
				vegades:carnBlancaNumberRef.current.getQuantity(),
				grams:carnBlancaGramsRef.current.getQuantity(),
			},
			peix_blau: {
				vegades:peixBlauNumberRef.current.getQuantity(),
				grams:peixBlauGramsRef.current.getQuantity(),
			},
			peix_blanc: {
				vegades:peixBlancNumberRef.current.getQuantity(),
				grams:peixBlancGramsRef.current.getQuantity(),
			},
			llegums: {
				vegades:llegumsNumberRef.current.getQuantity(),
				grams:llegumsGramsRef.current.getQuantity(),
			},
			ous: {
				vegades:ousNumberRef.current.getQuantity(),
				grams:ousGramsRef.current.getQuantity(),
			},
		}
		//console.log("OnGoalsSubmit")
		console.log(sendObject)
		props.OnGoalsSubmit(sendObject)
	}

	const returnToHome = () => {
		navigate('/')
	}

	const exerciciArray = [
        {
            id: "forca",
            label: "Força",
			ref: forcaNumberRef,
			initValue: forca_init_value
        },
        {
            id: "cardio",
            label: "Cardio",
			ref: cardioNumberRef,
			initValue: cardio_init_value
        }
    ]

	const minimsArray = [
        {
            id: "verdura",
            label: "Verdura",
			ref: verduraNumberRef,
			initValue:verdura_init_value
        },
        {
            id: "fruita",
            label: "Fruita",
			ref: fruitaNumberRef,
			initValue: fruita_init_value
        }
    ]

	const maximsArray = [
        {
            id: "xocolata",
            label: "Xocolata",
			ref: xocolataNumberRef,
			initValue:xocolata_init_value
        },
        {
            id: "dolcos",
            label: "Dolços",
			ref: dolcosNumberRef,
			initValue: dolcos_init_value
        }
		,
        {
            id: "extresSalats",
            label: "Extres Salats",
			ref: extresSalatsNumberRef,
			initValue: extresSalats_init_value
        }
		,
        {
            id: "alcohol",
            label: "Alcohol",
			ref: alcoholNumberRef,
			initValue: alcohol_init_value
        }
		,
        {
            id: "refrescos",
            label: "Refrescos",
			ref: refrescosNumberRef,
			initValue: refrescos_init_value
        }
    ]

	const proteinesArray = [
        {
            id: "carn_vermella",
            label: "Carn vermella",
			refVegades: carnVermellaNumberRef,
			refGrams: carnVermellaGramsRef,
			vegadesInitValue:carn_vermella_vegades_init_value,
			gramsInitValue:carn_vermella_grams_init_value
        },
        {
            id: "carn_blanca",
            label: "Carn blanca",
			refVegades: carnBlancaNumberRef,
			refGrams: carnBlancaGramsRef,
			vegadesInitValue: carn_blanca_vegades_init_value,
			gramsInitValue: carn_blanca_grams_init_value
        },
        {
            id: "peix_blau",
            label: "Peix blau",
			refVegades: peixBlauNumberRef,
			refGrams: peixBlauGramsRef,
			vegadesInitValue: peix_blau_vegades_init_value,
			gramsInitValue: peix_blau_grams_init_value
        },
        {
            id: "peix_blanc",
            label: "Peix blanc i marisc",
			refVegades: peixBlancNumberRef,
			refGrams: peixBlancGramsRef,
			vegadesInitValue: peix_blanc_vegades_init_value,
			gramsInitValue: peix_blanc_grams_init_value
        },
        {
            id: "ous",
            label: "Ous",
			refVegades: ousNumberRef,
			refGrams: ousGramsRef,
			vegadesInitValue: ous_vegades_init_value,
			gramsInitValue: ous_grams_init_value
        },
        {
            id: "llegums",
            label: "Llegums",
			refVegades: llegumsNumberRef,
			refGrams: llegumsGramsRef,
			vegadesInitValue: llegums_vegades_init_value,
			gramsInitValue: llegums_grams_init_value
        }
    ]

	const marginTop = 1
	

	const plantillaForm = () => (
		<>
			<CustomBackdrop openBackdrop={openBackdrop} responseFromServer={props.responseFromServer}></CustomBackdrop>
			<h1>Objectius</h1>
			<div>
				<form onSubmit={OnGoalsSubmit}>
				<Divider maxwidth="md" sx={{m:1}}>
					<Chip label="Menjar"/>
				</Divider>
			<Divider maxwidth="md" sx={{m:1}}>
                <Chip label="Objectius mínims"/>
            </Divider>
            <TableContainer maxwidth="md" sx={{mt:3, mb:3}} component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{backgroundColor:lightGreyColor,
                            '& .MuiTableCell-root':{fontWeight:700} }}>
                            <TableCell sx={firstElementStyle} >Tipus</TableCell>
                            <TableCell sx={noPaddingStyle} >Min. setmana</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
					{minimsArray.map(alimentMinim =>
						{
							if(userData.hasCamp(alimentMinim.id)){
								return (
								
									<TableRow
										key={alimentMinim.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
										<TableCell sx={centeringStyle} component="th" scope="row">{alimentMinim.label}</TableCell>
										<TableCell sx={centeringStyle}>
											<ObjectiveNumberForm marginTop={marginTop} ref={alimentMinim.ref} initValue={alimentMinim.initValue} color={greenColor} />
										</TableCell>
									</TableRow>								
								)
							}	
						})
					}
                    </TableBody>
                </Table>
            </TableContainer>	
			<Divider maxwidth="md" sx={{m:1}}>
                <Chip label="Proteines"/>
            </Divider>
            <TableContainer maxwidth="md" sx={{mt:3, mb:3}} component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{backgroundColor:lightGreyColor,
                            '& .MuiTableCell-root':{fontWeight:700} }}>
                            <TableCell sx={firstElementStyle} >Proteina</TableCell>
                            <TableCell sx={noPaddingStyle} >Max. vegades / setmana</TableCell>
                            <TableCell sx={noPaddingStyle} >Max. grams / setmana</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
					{proteinesArray.map(proteina =>
						{
							return (
								
								<TableRow
									key={proteina.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
									<TableCell sx={centeringStyle} component="th" scope="row">{proteina.label}</TableCell>
									<TableCell sx={centeringStyle}>
										<ObjectiveNumberForm marginTop={marginTop} ref={proteina.refVegades} initValue={proteina.vegadesInitValue} color={greenColor} />
									</TableCell>
									<TableCell sx={centeringStyle}>
										<ObjectiveNumberForm marginTop={marginTop} ref={proteina.refGrams} initValue={proteina.gramsInitValue} color={greenColor} />
									</TableCell>
								</TableRow>								
							)	
						})
					}
                    </TableBody>
                </Table>
            </TableContainer>
			<Divider maxwidth="md" sx={{m:1}}>
                <Chip label="Objectius máxims"/>
            </Divider>
            <TableContainer maxwidth="md" sx={{mt:3, mb:3}} component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{backgroundColor:lightGreyColor,
                            '& .MuiTableCell-root':{fontWeight:700} }}>
                            <TableCell sx={firstElementStyle} >Tipus</TableCell>
                            <TableCell sx={noPaddingStyle} >Max. setmana</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
					{maximsArray.map(alimentMaxim =>
						{
							if(userData.hasCamp(alimentMaxim.id)){
								return (
								
									<TableRow
										key={alimentMaxim.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
										<TableCell sx={centeringStyle} component="th" scope="row">{alimentMaxim.label}</TableCell>
										<TableCell sx={centeringStyle}>
											<ObjectiveNumberForm marginTop={marginTop} ref={alimentMaxim.ref} initValue={alimentMaxim.initValue} color={redColor} />
										</TableCell>
									</TableRow>								
								)
							}	
						})
					}
                    </TableBody>
                </Table>
            </TableContainer>	
			<Divider maxwidth="md" sx={{m:1}}>
                <Chip label="Exercici físic"/>
            </Divider>
            <TableContainer maxwidth="md" sx={{mt:3, mb:3}} component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{backgroundColor:lightGreyColor,
                            '& .MuiTableCell-root':{fontWeight:700} }}>
                            <TableCell sx={firstElementStyle} >Tipus</TableCell>
                            <TableCell sx={noPaddingStyle} >Min. setmana</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
					{exerciciArray.map(exerciciItem =>
						{
							if(userData.hasCamp(exerciciItem.id)){
								return (
								
									<TableRow
										key={exerciciItem.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
										<TableCell sx={centeringStyle} component="th" scope="row">{exerciciItem.label}</TableCell>
										<TableCell sx={centeringStyle}>
											<ObjectiveNumberForm ref={exerciciItem.ref} initValue={exerciciItem.initValue} />
										</TableCell>
									</TableRow>								
								)
							}	
						})
					}
                    </TableBody>
                </Table>
            </TableContainer>	
			
				
			
			<Divider maxwidth="md" sx={{mt:2}}>
				<Chip label="Pes"/>
			</Divider>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent:"center",
					marginTop:2,
					mb:2
					}}>
				<NumberForm ref={pesNumberRef} initValue={pes_init_value}/>
				
			</Box>
			<div>
				<button type="submit">{submitLabel}</button>
			</div>					
				</form>
			</div>
		</>
	)


	const checkRender = () => {

		if(user != null) {
			return plantillaForm()
		}else{
			return <></>
		}
	}

	return (
		<>
			{checkRender()}
		</>
	)
}

export default GoalsForm