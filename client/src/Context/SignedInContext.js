import { createContext, useEffect, useState } from "react";


//this handles the user when they are signed in

export const SignedInContext = createContext(null);

export const SignedInProvider = ({children}) => {

        
        // SIMULATING LOGGED IN ADMIN

        // const [signedIn, setSignedIn] = useState(false);
        // const [status, setStatus] = useState("Idle")
        // const [adminSignedIn, setAdminSignedIn] = useState(true)
        // const [user, setUser] = useState({email: "salimfarhat@gmail.com"})

        
        // SIMULATING LOGGED IN USER

        // const [signedIn, setSignedIn] = useState(true);
        // const [status, setStatus] = useState("Idle")
        // const [adminSignedIn, setAdminSignedIn] = useState(false)
        // const [user, setUser] = useState({email: "9@g.com"})
        



        // SIMULATING LOGGED OUT USER

        
        const [signedIn, setSignedIn] = useState(false);
        const [status, setStatus] = useState("Idle")
        const [adminSignedIn, setAdminSignedIn] = useState(false)
        const [user, setUser] = useState({email: null})


        const signedOutFunction = () => {
            setUser({email: null})
            setSignedIn(false)
            setAdminSignedIn(false);

        }

        // useEffect(() => {
        //     if(user === null){
        //         setUser(null)
        //         return
        //     }
        //     //update below as needed
        //     fetch("/login",{
        //         post
        //         body: email
        //     })
        // }, [user])

        // setUser(google.email)

        


        return(
            <SignedInContext.Provider value={{signedIn, setSignedIn, status, setStatus, adminSignedIn, setAdminSignedIn, signedOutFunction, user, setUser}}>
                {children}
            </SignedInContext.Provider>

        )

}