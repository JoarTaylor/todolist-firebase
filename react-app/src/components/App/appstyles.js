import styled from "styled-components";

const AppContainer = styled.div`
    font-family: Arial, Helvetica, sans-serif;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;

    button {
  background-color: gray; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

    &:hover {
        background-color: black;
    }

    }
`

const InputDialog = styled.dialog`
    width: 20vw;
    border-radius: 10px;
    border: none;
    background-color: #cecdcd;

    &::backdrop {
        background-color: white;
        opacity: 0.6;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        form {
            input {
                border: none;
                border-radius: 5px;

                &:focus {
                    border: none;
                }

                div {
                    height: 100%;
                }
            }

            textarea {
                height: 30vh;
                width: 100%;
                margin: 10px 0;
                border: none;
                outline: none;
                resize: none;
                border-radius: 5px;
            }
        }

        div {
            margin-top: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-around;

            button {
                padding: 0.3rem;
                border-radius: 10px;
                border: none;
                background-color: white;

                &:hover {
                    background-color: rgb(243, 242, 242);
                }
            }
        }
    }
`

const PageTitle = styled.h1`
    text-align: center;
`

const TodosLeft = styled.h3`
    text-align: center;
`

const DialogContainer = styled.div`
    display: flex;
    justify-content: center;
`

export { 
    ButtonContainer, 
    InputDialog, 
    PageTitle, 
    TodosLeft, 
    DialogContainer, 
    AppContainer 
}