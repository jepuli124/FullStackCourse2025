import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link as RouterLink } from 'react-router';
import '../css/colors.css'




const Header: React.FC = () => { // from some week tasks, seemed nice
    // the header is main way to navigate through the website.
    const [admin, setAdmin] = useState<boolean | null | undefined>(undefined)

    const validateAdminStatus = async () => { // unlocks admin view if token holds admin value
        const incomingData = await fetch('/api/validateTokenAdmin', { 
            method: 'get',
            headers: {
                "authorization": `Bearer ${localStorage.getItem("sessionToken")}`
            },
        })
        if(!incomingData.ok){
             setAdmin(false) 
             return
        }
        setAdmin(true)
    }

    let logOutTemp = false
    if(localStorage.getItem("sessionToken")){ // if session token exist (even if invalid), this shows the route buttons. No action can still be made as server checks is token is valid but log out button is necessary to remove sessionToken.  
        logOutTemp = true
        if(admin == undefined){ // prevents fetch loop
            validateAdminStatus()
        }
    }
    const [logOut, setLogOut] = useState<boolean>(logOutTemp) //logOutTemp provides a constant way to have logOut button, since header is rarely reRendered
    

    return (

        <AppBar className='fill-width top-middle-screen primary-color'>
            <Toolbar> {/* not sure what this all does, but it was used in weekly task and end result is good looking and somewhat responsible*/}
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Detailed Dungeons
            </Typography>
            <Button color="inherit" component={RouterLink} to="/">Home</Button>
            <Button color="inherit" component={RouterLink} to="/addMap">Add map</Button>
            <Button color="inherit" component={RouterLink} to="/login">Admin Login</Button>
            {logOut ? 
            <>

            {admin ? <Button color="inherit" component={RouterLink} to="/adminView">Admin view</Button> : <></>}
            <Button color="inherit" onClick={() => { // if session token is found, give user the option to remove it. Important that this is here even when authentication fails as it is a way to remove invalid sessionToken easily  
                localStorage.removeItem("sessionToken")
                setLogOut(false)
                }} component={RouterLink} to="/">Log Out</Button>
            </>
             : <></>}
            </Toolbar>
        </AppBar>

    )
}


export default Header
