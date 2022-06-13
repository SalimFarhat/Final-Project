import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {SignedInContext} from "./Context/SignedInContext";
import { NavLink } from "react-router-dom";
import bk from "./Images/OfficePic.jpeg"

const ModifySchedule = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)


    return(
        <Wrapper>
            <MenuWrapper>
            <InnerWrapper>
            <Head>This page is for adding/removing/modifying the schedule</Head>
            <Choice>What would you like to do?</Choice>
            <Link to="/adminpage/admincreate">Add a class</Link>
            <Link to="/adminpage/adminremove">remove a class</Link>
            <Link to="/adminpage/adminedit">modify a class</Link>
            <Link to="/adminpage/adminprev">view previous classes</Link>
            </InnerWrapper>
            </MenuWrapper>

        </Wrapper>
    )

}

export default ModifySchedule;

const Wrapper = styled.div`
height: 100vh;
width: 100vw;
background-image: url(${bk});
background-position: center;
background-size: cover;
`

const MenuWrapper = styled.div`

display: flex;
flex-wrap: wrap;
justify-content: center;
`

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: baseline;
    align-content: flex-start;
    border: 1px solid black;
    background: rgb(255, 255, 255, 0.75);
`


const Link = styled(NavLink)`
text-decoration: none;
margin-left: 20px;
margin-bottom: 20px;
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background-color:#ededed;
	border-radius:6px;
	border:1px solid #dcdcdc;
	display:inline-block;
	cursor:pointer;
	color:#777777;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;
    &:hover{
        background-color:#dfdfdf;
    }
    &:active{
	position:relative;
	top:1px;
    }

`

const Head = styled.div`
margin-top: 20px;
margin-left: 20px;
margin-bottom: 20px;

`


const Choice = styled.div`
margin-left: 20px;
margin-top: 20px;
margin-left: 20px;
margin-bottom: 20px;

`