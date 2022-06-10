import styled from "styled-components"
import { SignedInContext } from "../Context/SignedInContext";
import { CourseContext } from "../Context/CourseContext";
import { useEffect, useState, useContext } from "react";


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
        // console.log(todayDate.getFullYear())
        if(parseInt(element.year) >= todayDate.getFullYear() && monthToNum >= todayDate.getMonth() && parseInt(element.day) >= todayDate.getDate()){
           
            currentWorkouts.push(element)
        }else{
            previousWorkouts.push(element);
        }
        
    });
}

    const handleClick = (ev) => {
        ev.preventDefault();
        console.log(classType)
        console.log(difficulty)
        console.log(time)
        console.log(month)
        console.log(year)

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
    console.log(validClass)
    console.log(validDate)
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
            console.log(data);
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
            <Label>Select class ID</Label>
        <Label>Class Number: </Label>
        <List onChange = {(e) => {
            console.log(e.currentTarget)
            setWorkout(JSON.parse(e.currentTarget.value))
            }}>
            <option value="Select a class">Select a class</option>
            {currentWorkouts.map((wrkout) => {
                // console.log(wrkout)
                // console.log(typeof wrkout)
                    return <option 
                    key={wrkout._id}
                    value={JSON.stringify(wrkout)}
                        // onChange={() => {
                        //     let newWorkout = wrkout;
                        //     setWorkout((workout) => ({...workout, ...newWorkout}));
                        // }}
                        > 
                {wrkout._id}
                </option>

            })}
        </List>
        <Button onClick={handleClick}>
            MODIFY
        </Button>

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

            </FormGroup>
        
        
        </Wrapper>
    )
}

export default AdminEdit;

const Wrapper = styled.div`
    display: flex;
    color: black;

`
const Button = styled.button`
    color: black;
`

const Label = styled.label`
    color: black;
`

const List = styled.select`
    padding: 10px;
    margin-left: 20px;
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

const Input = styled.div`

`
const FormGroup = styled.div`

`
