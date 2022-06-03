import { createContext, useEffect, useState } from "react";


//this handles the user when they are signed in

export const SignedInContext = createContext(null);

export const SignedInProvider = ({children}) => {

        const [signedIn, setSignedIn] = useState(null);
        const [status, setStatus] = useState("Idle")
        const [adminSignedIn, setAdminSignedIn] = useState(null)

        return(
            <SignedInContext.Provider value={{signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn}}>
                {children}
            </SignedInContext.Provider>

        )

}