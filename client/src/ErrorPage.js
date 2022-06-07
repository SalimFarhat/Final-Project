import styled from "styled-components";

const ErrorPage = () => {

    return(
        <Wrapper>
            <Divi1>Ooops Something Went Wrong!</Divi1>
            <Divi>The page you tried to accesss does not exist! Please click on the dumbbell icon on the top left to go back to the home page.</Divi>
        </Wrapper>
    )

}

export default ErrorPage;

const Wrapper = styled.div`
    
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	align-content: stretch;


`
const Divi = styled.div`
    display: flex;
    margin-top: 50px;
    font-size: 20px;
    font-weight: bold;
`

const Divi1 = styled.div`
    display: flex;
    margin-top: 50px;
    font-size: 3em;

`
const Head = styled.h1`
margin-top: 50px;

`