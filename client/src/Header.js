import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import {FaDumbbell, FaStar} from "react-icons/fa";
import {SignedInContext} from "./Context/SignedInContext"
import {CourseContext} from "./Context/CourseContext"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const todayDate = new Date()



{/* <FaStar /> */}
const Header = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)
    const {loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts} = useContext(CourseContext);
    let currentWorkouts = []
    let previousWorkouts = []
    const clientExercises = []
    const History = useNavigate();
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

    previousWorkouts.forEach((e) => {
        if(e.attending.includes(user.email)){
            numStars += parseInt(e.difficulty)
            clientExercises.push(e)
        }

    })
    const SignOutButton = (ev) =>{
        if(signedIn || adminSignedIn){
            setSignedIn(false);
            setAdminSignedIn(false);
            setUser({email: null});
            History(`/`);
        }
    }




    return (
        
        <Wrapper>
            <LeftLinks>
            <Link to="/"><FaDumbbell/></Link>
            {!signedIn && (<Link to="/schedule">View classes</Link>)}
            {signedIn && (<Link to="/schedule">Schedule classes</Link>)}
            {adminSignedIn && (<Link to="/modifyschedule">| Modify schedule</Link>)}
            </LeftLinks>
            <RightLinks>
            {signedIn && !adminSignedIn && (<><Link to="/yourpreviousclasses"><FaStar /></Link> <Num>{numStars}</Num> </>)}
            {signedIn && !adminSignedIn && (<><Link to="/yourclasses">Your Classes</Link></>)}
                {signedIn || adminSignedIn ? <SignOut onClick={SignOutButton}> Sign out</SignOut> : <Link to="/login/"> Sign in</Link>}
            </RightLinks>

        </Wrapper>
        
    )

}

export default Header;

const Num = styled.p`
    color: black;
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
    background: rgb(198, 197, 193, 0.75);
    font-size: 24px;
    color: black;
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
    color: black;
`

const SignOut = styled.span`
    cursor: pointer;
    margin-left: 20px;
    color: black;
`

