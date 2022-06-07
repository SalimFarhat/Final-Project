import { createContext, useEffect, useState } from "react";
import { useContext } from "react";


export const CourseContext = createContext(null);

export const CourseProvider = ({children}) => {
    
    const [mainWorkOuts, setMainWorkOuts] = useState();
    const [loadedStatus, setLoadedStatus] = useState("loading")

    // useEffect(() => {
    //     fetch(`/api/users/`)
    //     .then((res) => {return res.json()})
    //     .then(data => {
    //         // console.log(data.data)
    //         setMainPageUsers(data.data)
    //         // setStatus("ready")
    //         setErrorMessage("");
    //     })
    //     .catch(err => console.log(err))
    // }, [])

    

    return(
        <CourseContext.Provider value={{mainWorkOuts, setMainWorkOuts, loadedStatus, setLoadedStatus}}>
            {children}
        </CourseContext.Provider>

    )

    
}