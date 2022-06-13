import React from "react";
import { useState, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import "./CSS/SnackBar.css"


const SnackBar = forwardRef((props, ref) => {
    const [showSnackBar, setShowSnackBar] = useState(false);
    useImperativeHandle(ref, () => ({
        show(){
            console.log("show me!")
            setShowSnackBar(true);
            setTimeout(() => {
                setShowSnackBar(false)
            }, 3000);
        }
    }));

    return(
        <Wrapper id={showSnackBar ? "show" : "hide"}>
            {props.type === "leave" ? <Message>{props.Message}</Message> : <Message>{props.Message}</Message>
            }
        </Wrapper>
    )
})
export default SnackBar;

const Wrapper = styled.div`
border: 2px solid yellow;
background-color: wheat;
padding: 20px 20px 20px 20px;
margin-top: 15px;
margin-left: 20px;

`
const Message = styled.div`
color: black;
font-size: 1.25em;


`

