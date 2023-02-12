import styled from "styled-components";
import { Link } from "react-router-dom";

const UserNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2vh;

    div {
        text-decoration: underline;
    }

    h4 {
        margin-left: auto;
    }
`



const StyledLink = styled(Link)`
    margin-right: 1vw;
    display: ${({signedIn}) => signedIn ? 'none' : 'block'};
    
`

const SignInSignOut = styled.div`
    display: flex;

    form {
        display: ${({signedIn}) => signedIn ? 'none' : 'block'};
    }

    button {
        display: ${({signedIn}) => signedIn ? 'none' : 'block'};
    }
`

export { UserNav, StyledLink, SignInSignOut};