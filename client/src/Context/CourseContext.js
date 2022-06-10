import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

const todayDate = new Date()
export const CourseContext = createContext(null);

export const CourseProvider = ({children}) => {
    
    const [allWorkOuts, setAllWorkOuts] = useState();
    const [mainWorkOuts, setMainWorkOuts] = useState();
    const [prevWorkOuts, setPrevWorkOuts] = useState();
    const [loadedStatus, setLoadedStatus] = useState("loading")

    

    return(
        <CourseContext.Provider value={{mainWorkOuts, setMainWorkOuts, loadedStatus, setLoadedStatus, allWorkOuts, setAllWorkOuts, prevWorkOuts, setPrevWorkOuts}}>
            {children}
        </CourseContext.Provider>

    )

    
}

