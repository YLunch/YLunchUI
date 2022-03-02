import {Container, styled, TextField} from '@material-ui/core'
import React from 'react'
import Input from './Input'
import Submit from './Submit'

const ComponentForm = styled('form')({
  textAlign:"center",
  border: "solid"
});

function Login({ }) {



  const [emailInput, setEmailInput] = React.useState('')

  const [passwordInput, setPasswordInput] = React.useState('')

  function handleEmailInput(e:React.ChangeEvent<HTMLInputElement>) {
    setEmailInput(e.target.value)
  }

  function handlePasswordInput(e:React.ChangeEvent<HTMLInputElement>) {
    setPasswordInput(e.target.value)
  }


    return (
      <Container maxWidth="sm" >
        <ComponentForm>
          <Input name={"email"} onChange={handleEmailInput}  />
          <br />
          <Input name={"password"} onChange={handlePasswordInput} />
          <br />
          <Submit name={"Submit"} email={emailInput} password={passwordInput} />
        </ComponentForm>
      </Container>

    )
}

export default Login
