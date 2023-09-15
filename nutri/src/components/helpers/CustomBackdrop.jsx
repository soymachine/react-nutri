import { Alert, AlertTitle, Backdrop, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react'

function CustomBackdrop(props) {
    const [openBackdrop, setOpenBackdrop] = useState(props.openBackdrop);
    const [isLoading, setLoading] = useState(!props.responseFromServer);
    
    // console.log("[CustomBackdrop] isLoading " + isLoading + " openBackdrop " + openBackdrop)

    const hook = () => {
		setLoading(!props.responseFromServer)
		setOpenBackdrop(props.openBackdrop)
	}

	useEffect(hook, [props])
    
    const handleClose = () => {
		setOpenBackdrop(false);
	};
	
	const handleOpen = () => {
		setOpenBackdrop(true);
	};

    return (
        <>
        {openBackdrop && (<Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={handleClose}
          >
              {isLoading && (<CircularProgress color="inherit" />)}
              {!isLoading && (<Alert severity="success" onClose={handleClose}>
                          <AlertTitle sx={{
							textAlign: 'left',
					        }}>
                                <strong>Tot bé!</strong></AlertTitle>
                                Les dades s'han desat de forma correcta.
                          </Alert>)}
          </Backdrop>)}
        </>
      )
}

export default CustomBackdrop