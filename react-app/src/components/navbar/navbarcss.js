import styled from "styled-components";
import { Link } from "react-router-dom";

const UserNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2vh;
    flex-direction: column;

   div {
    display: flex;
   }
`

const StyledLink = styled(Link)`
    margin: 0.4rem;
    font-size: larger;
    display: ${({signedIn}) => signedIn ? 'none' : 'block'};
`

const SignInSignOut = styled.div`
    display: flex;
    flex-direction: column;


    form {
        margin: 1rem;
        display: ${({signedIn}) => signedIn ? 'none' : 'flex'};
        flex-direction: column;
    
        input {
            margin: 0.5rem;
        }
    }

    button {
        display: ${({signedIn}) => signedIn ? 'none' : 'block'};
        background-color: gray; 
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin: 1rem;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

        &:hover {
        background-color: black;
    }
    }
`



export { UserNav, StyledLink, SignInSignOut};