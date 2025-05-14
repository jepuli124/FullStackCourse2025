import React, { useState } from 'react'

const MyLogin: React.FC = () => {
    // handles login and registering

    //these are used to show different components
    const [register, setRegister] = useState<boolean>(false)
    const [passWordsMatch, setPassWordsMatch] = useState<boolean>(false)

    const doPasswordsMatch = () => { // checks if passwords match 
        const form = new FormData(document.getElementById("loginForm") as HTMLFormElement)

        if(form.get("password") !== form.get("passwordAgain")){ // if the passwords don't match, re-enter the passwords.
            setPassWordsMatch(false)
        } else {
            setPassWordsMatch(true)
        }
    }

    const doItAlmostAllFunction = async (e: React.SyntheticEvent) => { // was originally name doItAllFunction but then it didn't do it all but I wanted to respect it's legacy so it is now named as doItAlmostAllFunction
        // handles login/register requests to the server
        e.preventDefault()

        console.log("submit has been clicked")
        const form = new FormData(document.getElementById("loginForm") as HTMLFormElement)

        if(form.get("password") !== form.get("passwordAgain") && register){ // if the passwords don't match, re-enter the passwords.
            form.set("password", "")
            form.set("passwordAgain", "")
            return
        }

        const jsonString = JSON.stringify({ // had some problem with getting data out of from inside the fetch function, this fixed it, then I copypasted it here, there and everywhere.
            name: form.get("username"),
            password: form.get("password"),
            isAdmin: form.get("admin")
        })

        let incomingData: Response //declared here to expand the scope outside of the if/else tree.
        if(register){
            incomingData = await fetch( '/api/register',{ 
                method: 'post',
                body: jsonString,
                headers: {
                    "Content-Type": "application/json",
                },
            })
        } else {
            incomingData = await fetch( '/api/login',{ 
                method: 'post',
                body: jsonString,
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }
        if(!incomingData.ok){
            console.log("login/register failed")
            return
        }
        const processedData = await incomingData.json()
        
        if(processedData.token){ // if login/register was succesful, save the token to local storage
            localStorage.setItem("sessionToken", processedData.token)
            window.location.href = '/cards'
        }
    }

    const autoValidateToken = async() => { 
        // when entering into this component, it checks the session token. If it is valid direct user to kanban board
        const token = localStorage.getItem("sessionToken")
        if(!token){
            return;
        }

        const incomingData = await fetch( '/api/validateToken',{ 
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        })
        if(incomingData.ok){
            window.location.href = '/cards'
        }
        console.log("no valid session token found")
    }

    autoValidateToken()

    return (
        <div>
            {register ? 
                <>
                    <h1> Register </h1> 
                    <button onClick={() => setRegister(false)}> To Login </button>
                </>
                : 
                <>
                    <h1> Login </h1>
                    <button onClick={() => setRegister(true)}> To Register </button>
                </>
            }
            <form id="loginForm" onSubmit={(e: React.SyntheticEvent) => doItAlmostAllFunction(e)}>
                <label>Username: </label><input type='text' name='username'></input>
                <br />
                <label>Password: </label><input type='text' name='password'></input>
                <br />
                {register ? 
                <>
                    <label>password again: </label><input type='text' name='passwordAgain' onChange={doPasswordsMatch}></input>
                    <br /> 
                    <p> {passWordsMatch ? "PASSWORD MATCH, GREAT JOB, YOU DID IT, NOW REGISTER" :  "PASSWORD DONT MATCH"} </p>
                    <label>Admin: </label><input type='checkbox' name='admin'></input>
                    <br /> 
                </>
                : <></> } {/* same from, slighly different when registering than login */}
                
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default MyLogin