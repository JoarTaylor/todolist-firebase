import styled from "styled-components";

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
`

const FormContainer = styled.div`
    display: ${({isShowing}) => isShowing ? 'block' : 'none'};
`

const EditBtn = styled.div`
        align-self: flex-end;
        font-size: larger;

        &:hover {
            color: gray;
        }
    
`

export { UpdateForm, FormContainer, EditBtn }