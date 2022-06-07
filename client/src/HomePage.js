import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {CourseContext} from "./Context/CourseContext"


// if(allWorkOuts){
//     allWorkOuts.forEach(element => {
//         if(parseInt(element.year) < parseInt(todayDate.getFullYear())){
//             if(parseInt(element.month) < todayDate.getMonth()){
//                 if(parseInt(element.day) < todayDate.getDate()){
//                     if(parseInt(element.time) <= todayDate.getHours()){
//                         console.log(element);
//                     }
//                 }
//             }
//         }else{
//             console.log("notworking")
//         }
        
//     });
// }



// {mainWorkOuts.map(element => {
//     return <p>{element.classType}</p>  
//    })}

const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

let counter = 0;
let monthToNum = 0;



const todayDate = new Date()

const HomePage = () => {
    // const { user, isAuthenticated, isLoading } = useAuth0();
    // console.log(user);
    // console.log(isAuthenticated);
    const {mainWorkOuts, setMainWorkOuts, loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts} = useContext(CourseContext);
    let currentWorkouts = []
    let previousWorkouts = []

    useEffect(() => {
        fetch(`/classes/`)
        .then((res) => res.json())
        .then(data => {
            // console.log(data);
            // console.log(data.data)
            setAllWorkOuts(data.data);
        })
        .catch(err => console.log(err))
    }, [])
    // console.log(parseInt(allWorkOuts[0].time))


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
    console.log(currentWorkouts)
    console.log(previousWorkouts)



    return (
        <Wrapper>
            Hello Everyone! This is the homepage


        </Wrapper>
    )

}

export default HomePage;

const Wrapper = styled.div`
    
`