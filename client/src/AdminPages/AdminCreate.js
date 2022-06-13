import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4} from 'uuid';
import bk from "../Images/OfficePic.jpeg"


const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]


const todayDate = new Date()

const AdminCreate = () => {


    const History = useNavigate();

    const [classType, setClassType] = useState("")
    const [month, setMonth] = useState("")
    const [difficulty, setDifficulty] = useState(null)
    const [day, setDay] = useState(null)
    const [year, setYear] = useState(null)
    const [time, setTime] = useState(null)
    const [error, setError] = useState("");

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
    console.log(validClass)
    console.log(validDate)
    if(validClass && validDate){
        fetch(`/add-class`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                _id: uuidv4(),
                classType: classType,
                difficulty: difficulty,
                year: year,
                month: month,
                day: day,
                time: time + ":00",
                attending: [],
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.message === "class successfully added"){
                console.log(data.data)
                History(`/modifyschedule`)
            }else{
                console.log("Error detected")
                setError(data.data);
            }
        })
    }

}

    return (
        <Wrapper>
            <MenuWrapper>
                <InnerWrapper>
            <HeadWrapper>
                The main Page to create classes
            </HeadWrapper>
            {/* <Para>Date must be in the future. No same day stuff! We can have multiple classes in the same timeslot</Para> */}
            
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
            <Button onClick={handleClick}>
                Submit
            </Button>
            
            {error === "" ? "" : <ErrorMessage>{error}</ErrorMessage>}
            </InnerWrapper>
            </MenuWrapper>
        </Wrapper>
    )
}

export default AdminCreate;

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


const Wrapper = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
width: 100vw;
background-image: url(${bk});
background-position: center;
background-size: cover;
`

const MenuWrapper = styled.div`

display: flex;
flex-wrap: wrap;
justify-content: center;
`
const ErrorMessage = styled.div`

` 

const Input = styled.div`
/* width: 100%; */
margin-top: 20px;

`


const HeadWrapper = styled.div`
margin-top: 20px;
margin-left: 20px;
margin-right: 20px;


`

const Para = styled.p`

`

const FormGroup = styled.div`

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