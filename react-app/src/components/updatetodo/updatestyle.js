import styled from "styled-components";

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
`

const FormContainer = styled.div`
    display: ${({isShowing}) => isShowing ? 'block' : 'none'};
`

export { UpdateForm, FormContainer }