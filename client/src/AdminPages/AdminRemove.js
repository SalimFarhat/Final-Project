import styled from "styled-components"
import { SignedInContext } from "../Context/SignedInContext";
import { CourseContext } from "../Context/CourseContext";
import { useEffect, useState, useContext } from "react";

const todayDate = new Date()

const AdminRemove = () => {
    const {signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser} = useContext(SignedInContext)
    const {loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts} = useContext(CourseContext);

    const [workout, setWorkout] = useState(null);

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
if(currentWorkouts.length > 0){
    setLoadedStatus("Loaded")
}
// console.log(currentWorkouts);


    const handleClick = (ev) => {
        console.log(workout)
        
        fetch(`/class/${workout._id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data.messasge);
            setWorkout(null)
        })
        .catch(err => console.log(err))
    }

    if(loadedStatus === "loading"){
        return <div>Loading Page</div>
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
                DELETE
            </Button>
            {workout && (
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
            )}
        </Wrapper>
    )
}

export default AdminRemove;

const Wrapper = styled.div`
    display: flex;
    color: black;
`
const Label = styled.label`
    color: black;
`

const List = styled.select`
    padding: 10px;
    margin-left: 20px;
`

const Para = styled.p`
    color: black;
`


const SingleWorkoutWrapper = styled.div`
    display: flex;
	flex-direction: column;
    margin: 10px;
    border: 1px solid black;
`
const WorkoutDate = styled.div`
    display: flex;
    margin: 10px;

`

const WorkoutWrapper = styled.div`
    display: flex;
	flex-wrap: wrap;

`
const WorkoutName = styled.div`
    display: flex;
    margin: 10px;
`

const Button = styled.button`
    color: black;
`