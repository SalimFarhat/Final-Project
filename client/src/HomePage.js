import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {CourseContext} from "./Context/CourseContext";
import jwt_decode from "jwt-decode";
import {SignedInContext} from "./Context/SignedInContext"







const HomePage = () => {
    // const { user, isAuthenticated, isLoading } = useAuth0();
    // console.log(user);
    // console.log(isAuthenticated);
    const {adminSignedIn, setAdminSignedIn, user, setUser, signedIn, setSignedIn} = useContext(SignedInContext);


    function handleCallbackResponse(response){
        // console.log("Encoded JWT ID token: " + response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
        console.log(userObject.given_name);
        if(userObject.email === "salimfarhat@gmail.com"){
          setAdminSignedIn(true);
          setSignedIn(false);
          setUser({email: userObject.email})
        }else{
        fetch(`client/${userObject.email}`)
        .then(res => res.json())
        .then(data => {
          if(data.data === null){
            fetch(`/add-client`,{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify({
                _id: userObject.email,
                email: userObject.email,
                name: userObject.given_name,
              })
            })
            console.log(userObject.given_name + " Has been added to the client base!")
          }else{
            
          setAdminSignedIn(false)
          setSignedIn(true)
          setUser({email: userObject.email})
          }
        }).catch(err => console.log(err))}
        // setUser({email: userObject.email})
        // if(userObject.email === 'salimfarhat@gmail.com'){
        //     setAdminSignedIn(true);
        // }else{
        //     setSignedIn(true);
        // }
    
      }
      // console.log(user);
    
      useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id: "672969114635-vbcreqa34c4m92s6rok1o4dl83q0kodg.apps.googleusercontent.com",
          callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          {theme: "outline", size: "large"}
        )
      },[])




    return (
        <Wrapper>
            Hello Everyone! This is the homepage
            <div id="signInDiv"></div>


        </Wrapper>
    )

}

export default HomePage;

const Wrapper = styled.div`
    
`