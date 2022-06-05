import { createContext, useEffect, useState } from "react";
import { useContext } from "react";


export const CourseContext = createContext(null);

export const CourseProvider = ({children}) => {
    
    const [mainWorkOuts, setMainWorkOuts] = useState();
    const [loadedStatus, setLoadedStatus] = useState("Idle")

    

    return(
        <SignedInContext.Provider value={{mainWorkOuts, setMainWorkOuts, loadedStatus, setLoadedStatus}}>
            {children}
        </SignedInContext.Provider>

    )

    
}