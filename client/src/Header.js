import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import {FaDumbbell} from "react-icons/fa";

const Header = () => {

    return (
        <Wrapper>
            <Link to="/"><FaDumbbell /></Link>
            <Link to="/schedule">Schedule</Link>

        </Wrapper>
    )

}

export default Header;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;

`

const Link = styled(NavLink)`

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