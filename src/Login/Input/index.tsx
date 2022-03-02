import { TextField } from '@material-ui/core'
import React, {ChangeEventHandler} from 'react'

interface InputProps  {
  name: string
  onChange : ChangeEventHandler<HTMLInputElement>

}

function Input({name , onChange} : InputProps) {
  return (
      <TextField id={name}  label={name} onChange={onChange} />
  )
}

export default Input
