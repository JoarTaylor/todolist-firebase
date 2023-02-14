import styled from "styled-components"

const TodoContainer = styled.div`
    width: 36vw;
    display: flex;
    flex-direction: column;
    background-color: #C5E1E5;
    margin: 2vh;
    padding: 1rem;
    border-radius: 10px;

    @media screen and (max-width: 900px) {
        width: 80vw;
    }
`

const TodoHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LeftTodoNav = styled.div`
    display: flex;
    div {
        font-weight: bold;
    }
`

const ContentWrapper = styled.div`
    display: flex;
    padding: 0.5rem;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
`

const TodoBtns = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;

`

export {TodoContainer, TodoHeader, ContentWrapper, TodoBtns, LeftTodoNav}