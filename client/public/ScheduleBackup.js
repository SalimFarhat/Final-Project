import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import {CourseContext} from "./Context/CourseContext"
import {BiCycling} from "react-icons/bi";
import {TbYoga} from "react-icons/tb";
import {GiWeightLiftingUp} from "react-icons/gi";
import {MdFitnessCenter} from "react-icons/md";
import {GrTime} from "react-icons/gr";
import { Link } from "react-router-dom";
import {SignedInContext} from "./Context/SignedInContext";

const todayDate = new Date()


const Schedule = () => {
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
        console.log(todayDate.getMonth())
        console.log(monthToNum)
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
// console.log(currentWorkouts)
// console.log(previousWorkouts)
// console.log(user.email)

    
    console.log(user);

if(currentWorkouts.length > 0){
    setLoadedStatus("Loaded")
}

if(loadedStatus === "loading"){
    return "Loading";
}else{
    return (
        <>
        <Wrapper>
            <HeaderWrapper>The following are the classes we currently offer: Yoga, HIIT, cycling, weight training, and crossfit</HeaderWrapper>
            <WorkoutWrapper>
                {currentWorkouts.map((e) => {
                    return(
                    <SingleWorkoutWrapper>
                    <Logo>
                    {e.classType === "yoga" ? <TbYoga /> : ""}
                    {e.classType === "weights" ? <GiWeightLiftingUp /> : ""}
                    {e.classType === "cycling" ? <BiCycling /> : ""}
                    {e.classType === "crossfit" ? <MdFitnessCenter /> : ""}
                    {e.classType === "HIIT" ? <GrTime /> : ""}
                    </Logo>
                    <WorkoutName>
                        {e.classType}
                    </WorkoutName>
                    <WorkoutDate>
                        {e.year} -
                        {e.month.toUpperCase()}-
                        {e.day}- at 
                    </WorkoutDate>
                    <WorkoutDate>
                        {e.time} hours
                        </WorkoutDate>
                    <NumberAttending>
                    {e.attending.length} people schedule.
                    </NumberAttending>
                    <NumberAttending>
                    {e.attending.includes(user.email) && (<>You are attending</>)}
                    </NumberAttending>
                    <JoinOrLeave>
                        {!signedIn && !adminSignedIn && (<>Sign in to sign up!</>)}
                        {adminSignedIn && (<><Link to="/modifyschedule"> Modify or delete</Link></>)}
                        {signedIn && (<><Link to={`/class/${e._id}`}>Sign Up or leave</Link></>)}
                    </JoinOrLeave>
                </SingleWorkoutWrapper>)
})}
            </WorkoutWrapper>

        </Wrapper>
        </>
    )
}
}


// {currentWorkouts.map((e) => {
//     return (
//         <div>
//         <p>{e.classType}</p>
//         <p>{e.difficulty}</p>
//         <p>happening on {e.year} {e.month} {e.day} at {e.time}</p>
//         </div>
//     )
// })}


export default Schedule;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
	align-content: stretch; 
`

const WorkoutWrapper = styled.div`
    display: flex;
	flex-wrap: wrap;

`

const HeaderWrapper = styled.div`
    margin-top: 50px;
    font-size: 20px;
    font-weight: bold;
`

const WorkoutDate = styled.div`
    display: flex;
    margin: 10px;

`

const NumberAttending = styled.div`
    display: flex;
    margin: 10px;
`

const SingleWorkoutWrapper = styled.div`
    display: flex;
	flex-direction: column;
    margin: 10px;
    border: 1px solid black;
`

const WorkoutName = styled.div`
    display: flex;
    margin: 10px;
`

const JoinOrLeave = styled.div`
    display: flex;
    margin: 10px;
`

const Logo = styled.div`
    display: flex;
    margin: 10px;
`
const Button = styled.button`
`