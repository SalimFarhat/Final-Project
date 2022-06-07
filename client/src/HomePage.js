import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";



const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(user);
    console.log(isAuthenticated);

    return (
        <Wrapper>
            Hello Everyone! This is the homepage

        </Wrapper>
    )

}

export default Header;

const Wrapper = styled.div`
    
`