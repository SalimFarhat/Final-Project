import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const LogIn = () => {
    // const { loginWithRedirect } = useAuth0();
    // const { logout } = useAuth0();
    // const { user, isAuthenticated, isLoading } = useAuth0();
    // const params = useSearchParams()
    // console.log(params);

    return(
        <Wrapper>This is the main Log In Screen
        </Wrapper>
    )
}

export default LogIn;

const Wrapper = styled.div`

`