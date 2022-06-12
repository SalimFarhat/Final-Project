import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import {FaDumbbell, FaStar} from "react-icons/fa";
import {SignedInContext} from "./Context/SignedInContext"
import {CourseContext} from "./Context/CourseContext"

const todayDate = new Date()

{/* <FaStar /> */}
const Header = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)
    const {loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts} = useContext(CourseContext);
    let currentWorkouts = []
    let previousWorkouts = []
    useEffect(() => {
        fetch(`/classes/`)
        .then((res) => res.json())
        .then(data => {
            setAllWorkOuts(data.data);
        })
        .catch(err => console.log(err))
    }, [])
    
    if(allWorkOuts){
        allWorkOuts.forEach(element => {
            let monthToNum
            if(element.month.toLowerCase() === "january"){
                monthToNum = 0
            }else if(element.month.toLowerCase() === "february"){
                monthToNum = 1
            }else if(element.month.toLowerCase() === "march"){
                monthToNum = 2
            }else if(element.month.toLowerCase() === "april"){
                monthToNum = 3
            }else if(element.month.toLowerCase() === "may"){
                monthToNum = 4
            }else if(element.month.toLowerCase() === "june"){
                monthToNum = 5
            }else if(element.month.toLowerCase() === "july"){
                monthToNum = 6
            }else if(element.month.toLowerCase() === "august"){
                monthToNum = 7
            }else if(element.month.toLowerCase() === "september"){
                monthToNum = 8
            }else if(element.month.toLowerCase() === "october"){
                monthToNum = 9
            }else if(element.month.toLowerCase() === "november"){
                monthToNum = 10
            }else if(element.month.toLowerCase() === "december"){
                monthToNum = 11
            }
            if(parseInt(element.year) > todayDate.getFullYear()){
                currentWorkouts.push(element)
            }else if(parseInt(element.year) === todayDate.getFullYear() && monthToNum === todayDate.getMonth() && parseInt(element.day) > todayDate.getDate()){
                currentWorkouts.push(element)
            }else if(parseInt(element.year) === todayDate.getFullYear() && monthToNum > todayDate.getMonth()){
                currentWorkouts.push(element)
            }else{
                previousWorkouts.push(element);
            }
            
        });
    }
    
    let numStars = 0;
    // console.log(signedIn)
    // console.log(adminSignedIn);
    // console.log(user.email)

    previousWorkouts.forEach((e) => {
        if(e.attending.includes(user.email)){
            numStars++
        }

    })
    // console.log(numStars)
    const SignOutButton = (ev) =>{
        if(signedIn || adminSignedIn){
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