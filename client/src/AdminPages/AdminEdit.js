import styled from "styled-components"
import { SignedInContext } from "../Context/SignedInContext";
import { CourseContext } from "../Context/CourseContext";
import { useEffect, useState, useContext } from "react";
import bk from "../Images/OfficePic.jpeg"


const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

const todayDate = new Date()

const AdminEdit = () => {

    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)
    const {loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts} = useContext(CourseContext);

    const [workout, setWorkout] = useState(null);

    const [classType, setClassType] = useState("")
    const [month, setMonth] = useState("")
    const [difficulty, setDifficulty] = useState(null)
    const [day, setDay] = useState(null)
    const [year, setYear] = useState(null)
    const [time, setTime] = useState(null)
    const [error, setError] = useState("");


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
        if(parseInt(element.year) >= todayDate.getFullYear() && monthToNum >= todayDate.getMonth() && parseInt(element.day) >= todayDate.getDate()){
           
            currentWorkouts.push(element)
        }else{
            previousWorkouts.push(element);
        }
        
    });
}

    const handleClick = (ev) => {
        ev.preventDefault();
        let counter = 0;
        let monthToNum = 0;
        let validClass = false
        let validDate = false
        months.forEach((e) =>{
            if(e.toLowerCase() === month.toString()){
                monthToNum = counter;
            }
            counter++
        })

        if(classType !== "" && difficulty !== null && time !== null){
            validClass = true;
        }

        if(month === "april" || month === "june" || month === "september" || month === "november"){
            if(parseInt(day) > 30){
                setError("These months don't have 31 days!")
            }
        }
        if(month === "february" && parseInt(day) > 28){
            setError("Feb does not have more than 28 days!")
        }
        if(error === ""){
        if(todayDate.getFullYear() < parseInt(year)){
            validDate = true
        }else if (todayDate.getFullYear() === parseInt(year) && monthToNum > todayDate.getMonth()){
            validDate = true
        } else if (todayDate.getFullYear() === parseInt(year) && monthToNum === todayDate.getMonth() && parseInt(day) > parseInt(todayDate.getDate())){
            validDate = true
        }
    }
    if(validClass && validDate){
        fetch(`/mod-class/${workout._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                classType: classType,
                difficulty: difficulty,
                year: year,
                month: month,
                day: day,
                time: time + ":00",
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === "We found your class!"){
                setWorkout(null)
                History(`/modifyschedule`)
            }else{
                console.log("Error detected")
                setError(data.data);
            }
        })
    }
    console.log("Something is wrong with the date or the class")

    }

if(currentWorkouts.length > 0){
    setLoadedStatus("Loaded")
}

    return (
        <Wrapper>
            <MenuWrapper>
            <InnerWrapper>
                
        <Label>Select class ID</Label>
        <Label>Class Number: </Label>
        <List onChange = {(e) => {
            setWorkout(JSON.parse(e.currentTarget.value))
            }}>
            <option value="Select a class">Select a class</option>
            {currentWorkouts.map((wrkout) => {
                    return <option 
                    key={wrkout._id}
                    value={JSON.stringify(wrkout)}
                        > 
                {wrkout._id}
                </option>

            })}
        </List>

        {workout && (
            <WorkoutWrapper>
                <SingleWorkoutWrapper>
                    <WorkoutName>
                        {workout.classType}
                    </WorkoutName>
                    <WorkoutDate>
                        {workout.year} -
                        {workout.month}-
                        {workout.day}- at
                    </WorkoutDate>
                    <WorkoutDate>
                        {workout.time} hours
                    </WorkoutDate>

                </SingleWorkoutWrapper>
            </WorkoutWrapper>
            )}
        
        <FormGroup>
                <Input>
                    <label htmlFor={"classType"}></label>
                    {/* <input required type="text" name="name" value={classType} placeholder="Class Type"/> */}
                    <select required name="classType" onChange={(e) => {setClassType(e.currentTarget.value)}}>
                        <option value=""> --Please choose an option--</option>
                        <option value="HIIT">HIIT</option>
                        <option value="yoga">yoga</option>
                        <option value="crossfit">crossfit</option>
                        <option value="cycling"> cycling</option>
                        <option value="weights"> weights</option>
                    </select>

                </Input>
                <Input>
                    <label htmlFor={"difficulty"}></label>
                    <input required type="number" name="difficulty" value={difficulty} min="1" max="3" placeholder="Difficulty" onChange={(e) => {setDifficulty(e.currentTarget.value)}}/>
                </Input>
                <Input>
                    <label htmlFor={"year"}></label>
                    <input required type="number" name="year" value={year} min="2022" max="2023" placeholder="Year" onChange={(e) => {setYear(e.currentTarget.value)}}/>
                </Input>
                <Input>
                    <label htmlFor={"month"}></label>
                    {/* <input required type="text" name="month" value={month} placeholder="enter month"/> */}
                    <select required name="month" onChange={(e) => {setMonth(e.currentTarget.value)}}>
                        <option value=""> --Please choose a month--</option>
                        <option value="january">january</option>
                        <option value="february">february</option>
                        <option value="march">march</option>
                        <option value="april"> april</option>
                        <option value="may"> may</option>
                        <option value="june">june</option>
                        <option value="july">july</option>
                        <option value="august"> august</option>
                        <option value="september"> september</option>
                        <option value="october">october</option>
                        <option value="november"> november</option>
                        <option value="december"> december</option>
                    </select>
                </Input>
                <Input>
                    <label htmlFor={"day"}></label>
                    <input required type="number" name="day" value={day} min="1" max="31" placeholder="Day" onChange={(e) => {setDay(e.currentTarget.value)}}/>
                </Input>
                <Input>
                    <label htmlFor={"time"}></label>
                    <input required type="number" name="time" value={time} min="8" max="17" placeholder="Time" onChange={(e) => {setTime(e.currentTarget.value)}}/>
                </Input>
                
        <Button onClick={handleClick}>
            MODIFY
        </Button>

            </FormGroup>
            </InnerWrapper>
            </MenuWrapper>
        
        </Wrapper>
    )
}

export default AdminEdit;

const InnerWrapper = styled.div`
margin-top: 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: flex-start;
    border: 1px solid black;
    background: rgb(255, 255, 255, 0.75);
`

const MenuWrapper = styled.div`

display: flex;
flex-wrap: wrap;
justify-content: center;
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
width: 100vw;
background-image: url(${bk});
background-position: center;
background-size: cover;

`
const Button = styled.button`
margin-top:40px;
margin-bottom: 40px;
box-shadow:inset 0px 1px 0px 0px #97c4fe;
background:linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%);
background-color:#3d94f6;
border-radius:6px;
border:1px solid #337fed;
display:inline-block;
cursor:pointer;
color:#ffffff;
font-family:Arial;
font-size:15px;
font-weight:bold;
padding:6px 24px;
text-decoration:none;
text-shadow:0px 1px 0px #1570cd;
&:hover{
background:linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
background-color:#1e62d0;
}
&:active{
position:relative;
top:1px;
}
`

const Label = styled.label`
    color: black;
`

const List = styled.select`
    padding: 10px;
    margin-left: 20px;
    margin-right: 20px;
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
    margin: 10px;
`

const SingleWorkoutWrapper = styled.div`
display: flex;
flex-direction: column;
width: auto;
border: 3px solid yellow;
background-color: wheat;
margin-top: 20px;
padding-bottom: 10px;
`

const WorkoutName = styled.div`
display: flex;
margin: 10px;
font-size: 1.5em;
`

const JoinOrLeave = styled.div`
    display: flex;
    margin: 10px;
`

const Logo = styled.div`
display: flex;
margin: 10px;
justify-content: center;
font-size: 2.75em;
`

const Input = styled.div`
    margin-top: 10px;
`
const FormGroup = styled.div`

`
