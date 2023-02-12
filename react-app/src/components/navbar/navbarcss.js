import styled from "styled-components";
import { Link } from "react-router-dom";

const UserNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        text-decoration: underline;
    }
`

const StyledLink = styled(Link)`
    margin-right: 1vw;
`

export { UserNav, StyledLink};