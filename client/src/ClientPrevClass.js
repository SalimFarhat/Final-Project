import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {SignedInContext} from "./Context/SignedInContext"
import {CourseContext} from "./Context/CourseContext"
import bk from "./Images/pastworkouts.jpg"
import {BiCycling} from "react-icons/bi";
import {TbYoga} from "react-icons/tb";
import {GiWeightLiftingUp} from "react-icons/gi";
import {MdArrowLeft, MdFitnessCenter} from "react-icons/md";
import {GrTime} from "react-icons/gr";


const todayDate = new Date()

const ClientPrevClass = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)
    const {loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts} = useContext(CourseContext);

    let clientExercises = []
    let finalExercises = []
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
        previousWorkouts.forEach((e) => {
            if(e.attending.includes(user.email)){
                clientExercises.push(e);
            }
        })
        clientExercises.sort((a, b) => (a.month > b.month) ? 1: -1)
        clientExercises.sort((a, b) => (a.day > b.day) ? 1: -1)
    }
    


    return(
        <Wrapper>
            <TitleWrapper>
                <Para>Welcome to your star athlete page!</Para>
            </TitleWrapper>
            
            <InfoWrapper>
                <Para2>For every class you attended, you will earn stars based on the difficulty rating of the workout. Below are the classes you have attended</Para2>
            </InfoWrapper>
            
            <WorkoutWrapper>
           {clientExercises.length !== 0 && clientExercises.map((e) => {
            return( 
            <SingleWorkoutWrapper>
                <Logo>
                    {e.classType === "yoga" ? <TbYoga /> : ""}
                    {e.classType === "weights" ? <GiWeightLiftingUp /> : ""}
                    {e.classType === "cycling" ? <BiCycling /> : ""}
                    {e.classType === "crossfit" ? <MdFitnessCenter /> : ""}
                    {e.classType === "HIIT" ? <GrTime /> : ""}
                </Logo>                
                <WorkoutDate>
                        On {e.year} - {e.month.toUpperCase()} - {e.day}- at {e.time}
                    </WorkoutDate>

                <WorkoutName>
                    You attended a {e.classType} class
                </WorkoutName>
                <WorkoutName>
                    and earned {e.difficulty} stars!
                </WorkoutName>

            </SingleWorkoutWrapper>
)})}

</WorkoutWrapper>


        </Wrapper>
    )
}

export default ClientPrevClass;

const Para = styled.p`
    font-size: 2em;
    margin-top: 50px;
    background: rgb(255, 255, 255, 0.9);
    padding: 20px 20px 20px 20px;

`
const Para2 = styled.p`
    font-size: 1.5em;
    margin-top: 50px;
    background: rgb(255, 255, 255, 0.9);
    padding: 20px 20px 20px 20px;

`

const Wrapper = styled.div`
height: 100vh;
width: 100vw;
background-image: url(${bk});
background-position: center;
background-size: cover;
`
const TitleWrapper = styled.div`
    display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: baseline;
	align-content: stretch;
`
const InfoWrapper = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: center;
align-items: baseline;
align-content: stretch;
`

const WorkoutWrapper = styled.div`
    display: flex;
	flex-wrap: wrap;
    justify-content: center;

`

const SingleWorkoutWrapper = styled.div`
display: flex;
flex-direction: column;
width: auto;
border: 3px solid yellow;
background-color: wheat;
margin-left: 20px;
margin-top: 40px;
padding-bottom: 25px;
`

const WorkoutName = styled.div`
display: flex;
margin: 10px;
font-size: 1.5em;
`

const Logo = styled.div`
    display: flex;
    margin: 10px;
    justify-content: center;
    font-size: 2.75em;
`

const WorkoutDate = styled.div`
display: flex;
margin: 10px;
font-size: 1.25em;

`