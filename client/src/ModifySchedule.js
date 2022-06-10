import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {SignedInContext} from "./Context/SignedInContext";
import { NavLink } from "react-router-dom";

const ModifySchedule = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)


    return(
        <Wrapper>
            <Head>This page is for adding/removing/modifying the schedule</Head>
            <Choice>What would you like to do?</Choice>
            <Link to="/adminpage/admincreate">Add a class</Link>
            <Link to="/adminpage/adminremove">remove a class</Link>
            <Link to="/adminpage/adminedit">modify a class</Link>
            <Link to="/adminpage/adminprev">view previous classes</Link>
            

        </Wrapper>
    )

}

export default ModifySchedule;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: stretch;


`

const Link = styled(NavLink)`

`

const Head = styled.div`
margin-top: 20px;
margin-left: 20px;
margin-bottom: 20px;

`


const Choice = styled.div`
margin-left: 20px;

`