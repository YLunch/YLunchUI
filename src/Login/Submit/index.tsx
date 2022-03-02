import {Button} from "@material-ui/core";
import React from 'react'

interface InputProps  {
  name: string
  email:string
  password:string
}

interface Token  {
  accessToken : string
  refreshToken: string
}

/*
{
  "email": "admin@restaurant.com",
  "password": "Password1234."
}.
 */

function Submit({ name,email,password }:InputProps) {
  return (
    <Button variant="contained" color="primary"
            onClick={async () => {

              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "email": email,
                  "password": password
                })
              };

              try {

                let response:Token  = await fetch('https://ylunch-api.rael-calitro.ovh/authentication/login', requestOptions)
                  .then(data => data.json());

                localStorage.setItem('token', response.accessToken);

              }catch (error)
              {
                alert(error)
              }


             }}>
      {name}</Button>
  )
}



export default Submit
