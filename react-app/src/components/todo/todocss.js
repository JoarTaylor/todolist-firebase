import styled from "styled-components"

const TodoContainer = styled.div`
    width: 40vw;
    min-height: 20vh;
    display: flex;
    flex-direction: column;
    background-color: #cecdcd;
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

const ContentWrapper = styled.div`
    display: flex;
    background-color: #eeecec;
    height: 100%;
`

const TodoBtns = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;

`

export {TodoContainer, TodoHeader, ContentWrapper, TodoBtns}