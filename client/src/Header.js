import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import {FaDumbbell} from "react-icons/fa";

const Header = () => {

    return (
        <Wrapper>
            <LeftLinks>
            <Link to="/"><FaDumbbell/></Link>
            <Link to="/schedule">Schedule classes</Link>
            </LeftLinks>
            <RightLinks>
                <Link to="/login"> Sign in</Link>
            </RightLinks>

        </Wrapper>
    )

}

export default Header;


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: stretch;
    height: 40px;
    background-color: green;
    font-size: 24px;
`
const LeftLinks = styled.div`
    display: flex;
    margin-left: 15px;
`
const RightLinks = styled.div`
    display: flex;
    margin-right: 15px;
`

const Link = styled(NavLink)`
    margin-left: 20px;
    text-decoration: none;
    color: white;
`


// return (
//     <Wrapper>
//       <NavLink to="/">
//       <Logo>
//         <LinkedHeader>Sling Airlines</LinkedHeader>
//       </Logo>
//       </NavLink>
    
//         {resInfo || localStorage.getItem('resId') ?
//         <Nav>
//           <StyledNavLink to="/view-reservation">Reservation</StyledNavLink>
//         </Nav>
//         :
//         <></>
//     }
//     </Wrapper>
//   )};


// return (
//     <Wrapper>
//         <FaceSpaceHeader>
//             <NavigationLink to="/"><FaceSpace>Facespace</FaceSpace></NavigationLink>
//         </FaceSpaceHeader>
//         <SignIn>
//         {signedIn ? <Para>Howdy, {currentUser.name}! <SignOut onClick={SignOutButton}> Sign out </SignOut></Para> : <NavigationLink to="/LogIn">Sign In</NavigationLink>}
            
//         </SignIn>
//     </Wrapper>
// )