import styled from "styled-components";
import { Link } from "react-router-dom";

const UserNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2vh;

    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
`

const DeleteAccEl = styled.button`
    display: ${({signedIn}) => signedIn ? 'block': 'none'};
`

const StyledLink = styled(Link)`
    margin: 0.4rem;
    font-size: larger;
    display: ${({signedIn}) => signedIn ? 'none' : 'block'};
`

const SignInSignOut = styled.div`
    display: flex;

    @media screen and (max-width: 900px) {
        flex-direction: column;
        }

    form {
        margin: 1rem;
        display: ${({signedIn}) => signedIn ? 'none' : 'flex'};

        @media screen and (max-width: 900px) {
        flex-direction: column;
        }

        input {
            margin: 0.5rem;
        }
    }

    button {
        display: ${({signedIn}) => signedIn ? 'none' : 'block'};
    }
`



export { UserNav, StyledLink, SignInSignOut, DeleteAccEl};