import styled from "styled-components"
import { SignedInContext } from "../Context/SignedInContext";
import { CourseContext } from "../Context/CourseContext";
import { useEffect, useState, useContext } from "react";


const AdminRemoveClient = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)
    const {loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts} = useContext(CourseContext);

    

    return(
        <Wrapper>The page to remove the client</Wrapper>
    )
}

export default AdminRemoveClient;

const Wrapper = styled.div`

`