import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {CourseContext} from "./Context/CourseContext";
import jwt_decode from "jwt-decode";
import {SignedInContext} from "./Context/SignedInContext"
import bk from "./Images/homepagephoto.jpg"







const HomePage = () => {
    const {adminSignedIn, setAdminSignedIn, user, setUser, signedIn, setSignedIn} = useContext(SignedInContext);

    return (
        <OuterWrapper>
          <Wrapper>
            <FirstHeader>Welcome to the Boot Camp Gym! Where exercise is rewarded!</FirstHeader>
          </Wrapper>
          <IntroText>
            <IntroHeader>We are a newly established, growing fitness center that aims to provide a wide variety of classes in order to facilitate fitness in
              our increasely busy and competitive world. Our Star Athlete program allows you to earn stars for every successfully completed class.</IntroHeader>
              <IntroHeader>Our current line up is High Intensity Interval Training, Yoga, Cycling, Crossfit, and weight training.
              Please click the button below for more information.
              </IntroHeader>
          </IntroText>
          <Button><Link to="/classinfo">Class Info </Link></Button>
          
        </OuterWrapper>
    )

}

export default HomePage;

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url(${bk});
  background-position: center;
  background-size: cover;
    
`

const Wrapper = styled.div`
display: flex;
margin-top: 30px;
margin-bottom: 50px;
background: rgba(255, 255, 255, 0.50);

`

const IntroText = styled.div`
  margin-top: 20px;
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.50);

`

const IntroHeader = styled.h3`
  color: black;
  font: "Trebuchet MS","Trebuchet",sans-serif;
`

const FirstHeader = styled.h1`
  color: black;
`
const Button = styled.button`
margin-top: 75px;
box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
	background-color:#ffffff;
	border-radius:6px;
	border:1px solid #dcdcdc;
	display:inline-block;
	cursor:pointer;
	color:#666666;
	font-family:Arial;
	font-size:17px;
	font-weight:bold;
	padding:15px 20px;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;

  &:hover{	
  background:linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
	background-color:#f6f6f6;
  
}
&:active{
	position:relative;
	top:1px;

}

`

const Link = styled(NavLink)`
text-decoration: none;
	

`