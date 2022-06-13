import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {SignedInContext} from "./Context/SignedInContext";
import {CourseContext} from "./Context/CourseContext";
import { createContext } from 'react';
import { useParams } from "react-router";
import {BiCycling} from "react-icons/bi";
import {TbYoga} from "react-icons/tb";
import {GiWeightLiftingUp} from "react-icons/gi";
import {MdFitnessCenter} from "react-icons/md";
import {GrTime} from "react-icons/gr";
import bk from "./Images/infopage.jpg";


const Workoutpage = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)
    const {loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts} = useContext(CourseContext);
    const [workoutClass, setWorkoutClass] = useState(null);
    const [load, setLoad] = useState("no");
    const [error, setError] = useState(null);
    console.log(user.email);
    
    const {classId} = useParams();
    const History = useNavigate();

    console.log(classId);
        useEffect(() => {
        fetch(`/class/${classId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setWorkoutClass(data.data);
            setLoad("yes")
        })
    }, [classId])


    const joinIt = (ev) => {
        fetch(`/join-class/${classId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.message === "You have joined the class!"){
                console.log("Success!")
                History(`/`)
            }else{
                console.log("Error detected")
                setError(data.data);
            }
        })

    }
    const leaveIt = (ev) => {
        fetch(`/leave-class/${classId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.message === "You have left the class!"){
                console.log("Success!")
                History(`/schedule`)
            }else{
                console.log("Error detected")
                setError(data.data);
            }
        })

    }


    if(load !== "yes"){
        return (<>loading page</>)
    }
    return (       
        <Wrapper> 
    <WorkoutWrapper>
        <SingleWorkoutWrapper>
            <Logo>
            {workoutClass.classType === "yoga" ? <TbYoga /> : ""}
            {workoutClass.classType === "weights" ? <GiWeightLiftingUp /> : ""}
            {workoutClass.classType === "cycling" ? <BiCycling /> : ""}
            {workoutClass.classType === "crossfit" ? <MdFitnessCenter /> : ""}
            {workoutClass.classType === "HIIT" ? <GrTime /> : ""}
            </Logo>
            <WorkoutName>
                {workoutClass.classType}
            </WorkoutName>
            <WorkoutDate>
                {workoutClass.year} -
                {workoutClass.month.toUpperCase()}-
                {workoutClass.day}- at - {workoutClass.time}
            </WorkoutDate>
            <WorkoutDate>
                This class is rated {workoutClass.difficulty} difficulty
            </WorkoutDate>
            <NumberAttending>
            {workoutClass.attending.length} people schedule.
            </NumberAttending>
            <JoinOrLeave>
            {workoutClass.attending.includes(user.email) && (<Button onClick={leaveIt}>Leave?</Button>)}
            {!workoutClass.attending.includes(user.email) && (<Button onClick={joinIt}>join?</Button>)}
            </JoinOrLeave>
        </SingleWorkoutWrapper>

    </WorkoutWrapper>
    </Wrapper>
    )

}
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	/* justify-content: space-evenly; */
	align-items: center;
	align-content: stretch; 
height: 100vh;
width: 100vw;
background-image: url(${bk});
background-position: center;
background-size: cover;
`

const WorkoutWrapper = styled.div`
    display: flex;
	flex-wrap: wrap;
    margin-top: 50px;

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
    background-color: aliceblue;
`

const WorkoutName = styled.div`
    display: flex;
    margin: 10px;
`

const JoinOrLeave = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`

const Logo = styled.div`
    display: flex;
    margin: 10px;
    justify-content: center;
`
const Button = styled.button`
box-shadow: 3px 4px 0px 0px #899599;
background:linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
background-color:#ededed;
border-radius:15px;
border:1px solid #d6bcd6;
display:inline-block;
cursor:pointer;
color:#3a8a9e;
font-family:Arial;
font-size:17px;
padding:7px 25px;
text-decoration:none;
text-shadow:0px 1px 0px #e1e2ed;
    &:hover{
	background:linear-gradient(to bottom, #bab1ba 5%, #ededed 100%);
	background-color:#bab1ba;

    }
    &:active{
	position:relative;
	top:1px;

    }
`

export default Workoutpage;