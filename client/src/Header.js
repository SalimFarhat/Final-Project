import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import {FaDumbbell, FaStar} from "react-icons/fa";
import {SignedInContext} from "./Context/SignedInContext"

{/* <FaStar /> */}
const Header = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)
    let numStars;
    console.log(signedIn)
    console.log(adminSignedIn);
    console.log(user.email)
    if(user.email === "9@g.com"){
        numStars = 5
    }else if (user.email === "29@g.com"){
        numStars = 3;
    }else{
        numStars = 0;
    }

    const SignOutButton = (ev) =>{
        if(signedIn){
            setSignedIn(false);
            setAdminSignedIn(false);
            setUser({email: null});
        }
    }
    return (
        
        <Wrapper>
            <LeftLinks>
            <Link to="/"><FaDumbbell/></Link>
            {!signedIn && (<Link to="/schedule">View classes</Link>)}
            {signedIn && (<Link to="/schedule">Schedule classes</Link>)}
            {adminSignedIn && (<Link to="/modifyschedule">Modify schedule</Link>)}
            {signedIn && !adminSignedIn && (<><Num><FaStar /></Num> <Num>{numStars}</Num> </>)}
            </LeftLinks>
            <RightLinks>
                {signedIn || adminSignedIn ? <SignOut onClick={SignOutButton}> Sign out</SignOut> : <Link to="/login/"> Sign in</Link>}
            </RightLinks>

        </Wrapper>
        
    )

}

export default Header;

const Num = styled.p`
    color: white;
    margin-left: 10px;
`


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
    color: white;
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

const SignOut = styled.span`
    cursor: pointer;
    margin-left: 20px;
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