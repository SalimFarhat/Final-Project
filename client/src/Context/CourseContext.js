import { createContext, useEffect, useState } from "react";
import { useContext } from "react";


export const CourseContext = createContext(null);

export const CourseProvider = ({children}) => {
    
    const [allWorkOuts, setAllWorkOuts] = useState();
    const [mainWorkOuts, setMainWorkOuts] = useState();
    const [prevWorkOuts, setPrevWorkOuts] = useState();
    const [loadedStatus, setLoadedStatus] = useState("loading")

    // useEffect(() => {
    //     fetch(`/classes/`)
    //     .then((res) => res.json())
    //     .then(data => {
    //         console.log(data);
    //         console.log(data.data)
    //         setMainWorkOuts(data.data);
    //     })
    //     .catch(err => console.log(err))
    // }, [])

    

    return(
        <CourseContext.Provider value={{mainWorkOuts, setMainWorkOuts, loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts, prevWorkOuts, setPrevWorkOuts}}>
            {children}
        </CourseContext.Provider>

    )

    
}