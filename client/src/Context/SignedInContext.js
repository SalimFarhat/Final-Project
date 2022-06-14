import { createContext, useEffect, useState } from "react";
import usePersistedState from "../PersistedState";


//this handles the user when they are signed in

export const SignedInContext = createContext(null);

export const SignedInProvider = ({children}) => {

        
        const [signedIn, setSignedIn] = usePersistedState("user",false);
        const [status, setStatus] = useState("Idle")
        const [adminSignedIn, setAdminSignedIn] = usePersistedState("admin",false)
        const [user, setUser] = usePersistedState("userEmail", {email: null})

        
        // const [signedIn, setSignedIn] = useState(false);
        // const [status, setStatus] = useState("Idle")
        // const [adminSignedIn, setAdminSignedIn] = useState(false)
        // const [user, setUser] = useState({email: null})


        const signedOutFunction = () => {
            setUser({email: null})
            setSignedIn(false)
            setAdminSignedIn(false);

        }

        return(
            <SignedInContext.Provider value={{signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser}}>
                {children}
            </SignedInContext.Provider>

        )

}