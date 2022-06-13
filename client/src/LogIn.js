import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {SignedInContext} from "./Context/SignedInContext"
import {CourseContext} from "./Context/CourseContext"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import bk from "./loginphoto.jpg"


const LogIn = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)

    const History = useNavigate();

    function handleCallbackResponse(response){
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
        console.log(userObject.given_name);
        if(userObject.email === "salimfarhat@gmail.com"){
            setAdminSignedIn(true);
            setSignedIn(false);
            setUser({email: userObject.email})
            History(`/`)
        }else{
        fetch(`client/${userObject.email}`)
        .then(res => res.json())
        .then(data => {
            if(data.data === null){
                fetch(`/add-client`,{
                    method: "POST",
                    headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                _id: userObject.email,
                email: userObject.email,
                name: userObject.given_name,
            })
            })
            console.log(userObject.given_name + " Has been added to the client base!")
        }else{
            setAdminSignedIn(false)
            setSignedIn(true)
            setUser({email: userObject.email})
            History(`/`)
        }
        }).catch(err => console.log(err))}
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "672969114635-vbcreqa34c4m92s6rok1o4dl83q0kodg.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )
    },[])

    return(
        <OuterWrapper>
        <Wrapper>
            <Para>Sign in with google. Safe, secure, and reliable</Para> 
            <SignInButton id="signInDiv"></SignInButton>

        </Wrapper>
        </OuterWrapper>
    )
}

export default LogIn;

const OuterWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
width: 100vw;
background-image: url(${bk});
background-position: center;
background-size: cover;

`
const Para = styled.p`

`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
flex-wrap: nowrap;
justify-content: space-around;
align-items: center;
background-color: aliceblue;
border: 1px solid black;
width: 350px;
height: 150px;

`

const SignInButton = styled.div`
`