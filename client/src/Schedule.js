import styled from "styled-components";
import { NavLink, renderMatches } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {CourseContext} from "./Context/CourseContext"
import {BiCycling} from "react-icons/bi";
import {TbYoga} from "react-icons/tb";
import {GiWeightLiftingUp} from "react-icons/gi";
import {MdArrowLeft, MdFitnessCenter} from "react-icons/md";
import {GrTime} from "react-icons/gr";
import { Link } from "react-router-dom";
import {SignedInContext} from "./Context/SignedInContext";
import moment from "moment";
import "./dateHighlight.css"
import "./Calendar.css"
import bk from "./Images/schedulephoto.jpg"

// import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar';

const todayDate = new Date()


let mapWorkouts = []
const Schedule = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)
    const {loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts} = useContext(CourseContext);

    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState([]);

    let currentWorkouts = []
    let previousWorkouts = []
    let mark = []

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
if(currentWorkouts.length > 0){
    setLoadedStatus("Loaded")
    // YYYY-MM-DD
    currentWorkouts.forEach((e) => {
        let resultDate = ""
        resultDate += e.year + "-";
        let monthToNum
        if(e.month.toLowerCase() === "january"){
            monthToNum = "01"
        }else if(e.month.toLowerCase() === "february"){
            monthToNum = "02"
        }else if(e.month.toLowerCase() === "march"){
            monthToNum = "03"
        }else if(e.month.toLowerCase() === "april"){
            monthToNum = "04"
        }else if(e.month.toLowerCase() === "may"){
            monthToNum = "05"
        }else if(e.month.toLowerCase() === "june"){
            monthToNum = "06"
        }else if(e.month.toLowerCase() === "july"){
            monthToNum = "07"
        }else if(e.month.toLowerCase() === "august"){
            monthToNum = "08"
        }else if(e.month.toLowerCase() === "september"){
            monthToNum = "09"
        }else if(e.month.toLowerCase() === "october"){
            monthToNum = "10"
        }else if(e.month.toLowerCase() === "november"){
            monthToNum = "11"
        }else if(e.month.toLowerCase() === "december"){
            monthToNum = "12"
        }
        
        resultDate += monthToNum + "-";
        if(e.day.length === 2){
            resultDate += e.day;
        }else{
            resultDate += "0" + e.day;
        }
        mark.push(resultDate);
    })
}
    const onChange = date => {
        const selectedWorkouts = []
        let counter = 0
        setDate(date)
        const dateStr = JSON.stringify(date[0])
        const tempYear = dateStr[1] + dateStr[2] + dateStr[3] + dateStr[4];
        const selectedYear = parseInt(tempYear);
        const tempMonth = dateStr[6] + dateStr[7];
        const selectedMonth = parseInt(tempMonth) - 1;
        const tempDay = dateStr[9] + dateStr[10];
        const selectedDay = parseInt(tempDay);
        currentWorkouts.forEach((e) => {        
            let monthToNum
            if(e.month.toLowerCase() === "january"){
                monthToNum = 0
            }else if(e.month.toLowerCase() === "february"){
                monthToNum = 1
            }else if(e.month.toLowerCase() === "march"){
                monthToNum = 2
            }else if(e.month.toLowerCase() === "april"){
                monthToNum = 3
            }else if(e.month.toLowerCase() === "may"){
                monthToNum = 4
            }else if(e.month.toLowerCase() === "june"){
                monthToNum = 5
            }else if(e.month.toLowerCase() === "july"){
                monthToNum = 6
            }else if(e.month.toLowerCase() === "august"){
                monthToNum = 7
            }else if(e.month.toLowerCase() === "september"){
                monthToNum = 8
            }else if(e.month.toLowerCase() === "october"){
                monthToNum = 9
            }else if(e.month.toLowerCase() === "november"){
                monthToNum = 10
            }else if(e.month.toLowerCase() === "december"){
                monthToNum = 11
            }
            if(parseInt(e.year) === selectedYear && monthToNum === selectedMonth && parseInt(e.day) === selectedDay){
                setSelectedWorkout(e)
                console.log(currentWorkouts[counter])
                selectedWorkouts.push(currentWorkouts[counter]);
            }
            counter++;
        })
        mapWorkouts = selectedWorkouts
    }


if(loadedStatus === "loading"){
    return "Loading";
}else{
    return (
        <>
        <Wrapper>
           <Calendar
           selectRange={true} onChange={onChange} value={date} minDate={new Date(todayDate)} maxDate={new Date(`2023-04-05`)}
           tileClassName={({date, view}) => {if(mark.find(x => x===moment(date).format("YYYY-MM-DD"))){
            return "highlight"
        }}}

           />
           <WorkoutWrapper>
           {mapWorkouts.length !== 0 && mapWorkouts.map((e) => {
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
                    {e.classType} class
                </WorkoutName>
                <WorkoutName>
                    Rated {e.difficulty} difficulty stars
                </WorkoutName>
                <WorkoutDate>
                        {e.year} -
                        {e.month.toUpperCase()}-
                        {e.day}- at {e.time}
                    </WorkoutDate>
                    <NumberAttending>
                    {e.attending.length} people scheduled
                    </NumberAttending>
                    <NumberAttending>
                    {e.attending.includes(user.email) && (<>You are attending</>)}
                    </NumberAttending>
                    <JoinOrLeave>
                        {!signedIn && !adminSignedIn && (<><Link to="/login">Sign in to sign up!</Link></>)}
                        {adminSignedIn && (<><Link to="/modifyschedule"> Modify or delete</Link></>)}
                        {signedIn && e.attending.includes(user.email) && (<><Link to={`/class/${e._id}`}>Leave the class</Link></>)}
                        {signedIn && !e.attending.includes(user.email) && (<><Link to={`/class/${e._id}`}>Join the class</Link></>)}
                    </JoinOrLeave>
            </SingleWorkoutWrapper>
)})}

</WorkoutWrapper>

        </Wrapper>
        </>
    )
}
}





export default Schedule;

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
    margin: 10px;
`

const Logo = styled.div`
    display: flex;
    margin: 10px;
    justify-content: center;
`
const Button = styled.button`
`