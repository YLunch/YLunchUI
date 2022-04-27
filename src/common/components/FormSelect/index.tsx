
import { Path, UseFormRegister, FieldValues } from "react-hook-form";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


type FieldData<T extends FieldValues> = {
  name: Path<T>;
  rules: {};
  register: UseFormRegister<T>;
  label: string;
  options:{
    value: string;
    label: string;
  }[];
  value:string;


};

export default function FormSelect<T extends FieldValues>({
  name,
  rules,
  register,
  label,
  value,
  options,


}: FieldData<T>) {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      {...register(name, rules)}
    >
      {options.map(p => (
        <MenuItem key={p.value} value={p.value}>
          {p.label}
        </MenuItem>
      ))}

    </Select>

  );

}
