import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import {CourseContext} from "../Context/CourseContext"
import {BiCycling} from "react-icons/bi";
import {TbYoga} from "react-icons/tb";
import {GiWeightLiftingUp} from "react-icons/gi";
import {MdFitnessCenter} from "react-icons/md";
import {GrTime} from "react-icons/gr";
import { Link } from "react-router-dom";
import {SignedInContext} from "../Context/SignedInContext";
import bk from "../Images/OfficePic.jpeg"
import giffy from "../Images/lifting.gif"

const todayDate = new Date()

const AdminPrev = () => {
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
        previousWorkouts.sort((a, b) => (a.month > b.month) ? 1: -1)
        previousWorkouts.sort((a, b) => (a.day > b.day) ? 1: -1)
    }




if(previousWorkouts.length > 0){
    setLoadedStatus("Loaded")
}

if(loadedStatus === "loading"){
    return (
        <Image src={giffy}/>
    );
}else{
    return (
        <>
        <Wrapper>
            <InnerWrapper>
            <HeaderWrapper>The following are the classes we currently offer: Yoga, HIIT, cycling, weight training, and crossfit</HeaderWrapper>
            <WorkoutWrapper>
                {previousWorkouts.map((e) => {
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
                        
                    attendees: {e.attending}

                    </NumberAttending>
                </SingleWorkoutWrapper>)
})}
            </WorkoutWrapper>
            </InnerWrapper>
        </Wrapper>
        </>
    )
}
}

export default AdminPrev;

const Image = styled.img`

`


const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: flex-start;
    border: 1px solid black;
    background: rgb(255, 255, 255, 0.75);
    padding-bottom: 50px;
    padding-right: 25px;
    padding-left: 25px;
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: space-evenly;
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
justify-content: center;

`

const HeaderWrapper = styled.div`
    margin-top: 50px;
    font-size: 20px;
    font-weight: bold;
`

const WorkoutDate = styled.div`
display: flex;
margin: 10px;
font-size: 1.25em;
`

const NumberAttending = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
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