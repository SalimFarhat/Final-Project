import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import YogaPic from "./Images/yoga.jpg"
import HIITpic from "./Images/HIITphoto.jpg"
import WeightPhoto from "./Images/weightphoto.jpg"
import CrossfitPic from "./Images/Crossfit.jpg"
import CyclingPic from "./Images/cycling.jpg"
import { NavLink } from "react-router-dom";
import {SignedInContext} from "./Context/SignedInContext"

const ClassInfo = () => {
    const {adminSignedIn, setAdminSignedIn, user, setUser, signedIn, setSignedIn} = useContext(SignedInContext);

    return(
        <MainWrapper>
            <HIITWrapper>
                <IntroHeader>High Intensity Interval Training</IntroHeader>
                <InfoWrapper>
                <InfoParagraph>High intensity interval training has been touted as one of the most effective 
                    and efficient ways of maintaining cardiovascular health, and is a very effective way of losing weight and increasing stamina for any
                    form of sport and general health. </InfoParagraph>
                    
                <InfoParagraph>We offer three levels of intensity in HIIT. Though all are challenging.</InfoParagraph>
                    
                </InfoWrapper>
                {!signedIn && !adminSignedIn && (<Button><Link to="/login">Sign in</Link></Button>)}
                {signedIn && (<Button><Link to="/schedule">Find classes</Link></Button>)}
                {adminSignedIn && (<Button><Link to="/modifyschedule">Schedule classes</Link></Button>)}
            </HIITWrapper>
            <YogaWrapper>
                <IntroHeader>Yoga</IntroHeader>
                <InfoWrapper>
                <InfoParagraph>Yoga is an ancient and proven form of exercise that is perfect for reducing muscle and psychological 
                    tension, as well as keeping the body and mind flexible and relaxed as we progress through life.
                </InfoParagraph>
                <InfoParagraph>We offer three levels of intensity in Yoga, adjusted to your comfort levels and needs</InfoParagraph>
                </InfoWrapper>
                {!signedIn && !adminSignedIn && (<Button><Link to="/login">Sign in</Link></Button>)}
                {signedIn && (<Button><Link to="/schedule">Find classes</Link></Button>)}
                {adminSignedIn && (<Button><Link to="/modifyschedule">Schedule classes</Link></Button>)}
            </YogaWrapper>
            <CyclingWrapper>
                <IntroHeader>Cycling</IntroHeader>
                <InfoWrapper>
                <InfoParagraph>A classic, effective, and low-impact activity for people who wish to get a great cardiovascular without having to strain their joints.
                    Our spin classes will allow you to burn the calories and sweat off the kilos in a sociable environment with other stationary cyclists
                </InfoParagraph>
                </InfoWrapper>
                {!signedIn && !adminSignedIn && (<Button><Link to="/login">Sign in</Link></Button>)}
                {signedIn && (<Button><Link to="/schedule">Find classes</Link></Button>)}
                {adminSignedIn && (<Button><Link to="/modifyschedule">Schedule classes</Link></Button>)}
            </CyclingWrapper>
            <CrossfitWrapper>
                <IntroHeader>Crossfit</IntroHeader>
                <InfoWrapper>
                <InfoParagraph>We offer Crossfit classes with certified instructors who will give you the workouts you need to be ready for any sport or any physical need that life throws you at. With the intensity levels to your fitness and comfort levels as well. 
                    With our Crossfit classes you will be fit and ready for any sport or activity you wish, and will get back in shape ASAP.
                </InfoParagraph>
                </InfoWrapper>
                {!signedIn && !adminSignedIn && (<Button><Link to="/login">Sign in</Link></Button>)}
                {signedIn && (<Button><Link to="/schedule">Find classes</Link></Button>)}
                {adminSignedIn && (<Button><Link to="/modifyschedule">Schedule classes</Link></Button>)}
            </CrossfitWrapper>
            <WeightWrapper>
                <IntroHeader>Weight Training</IntroHeader>
                <InfoWrapper>
                <InfoParagraph>From kettlebells to dumbbells and barbells, we offer classes on weight exercises that not only show the best technique, but also the best exercises for people to be able to achieve hyperthropy.
                    Our weight training classes are diverse and highly effective in training and growing muscles to minimize muscle loss while maximizing fat loss.</InfoParagraph>
                </InfoWrapper>
                {!signedIn && !adminSignedIn && (<Button><Link to="/login">Sign in</Link></Button>)}
                {signedIn && (<Button><Link to="/schedule">Find classes</Link></Button>)}
                {adminSignedIn && (<Button><Link to="/modifyschedule">Schedule classes</Link></Button>)}
            </WeightWrapper>

        </MainWrapper>
    )
}


export default ClassInfo;

const IntroHeader = styled.h3`
    margin-top: 30px;
    background: rgba(255, 255, 255, 0.80);
    color: black;
`

const InfoParagraph = styled.p`
color:white;
font-size: 2em;
margin-bottom: 40px;
background: rgba(255, 255, 255, 0.80);
color: black;

`
const InfoWrapper = styled.div`
display: flex;
flex-direction: column;
margin: 50px;
`

const MainWrapper = styled.div`
display: flex;
flex-direction: column;
    
`
const HIITWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;

height: 100vh;
width: 100vw;
background-image: url(${HIITpic});
background-position: center;
background-size: cover;

    
`
const YogaWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
width: 100vw;
background-image: url(${YogaPic});
background-position: center;
background-size: cover;
    
`

const CyclingWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
width: 100vw;
background-image: url(${CyclingPic});
background-position: center;
background-size: cover;
    
`
const CrossfitWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
width: 100vw;
background-image: url(${CrossfitPic});
background-position: center;
background-size: cover;
    
`
const WeightWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
width: 100vw;
background-image: url(${WeightPhoto});
background-position: center;
background-size: cover;
    
`

const Button = styled.button`
margin-top: 20px;
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