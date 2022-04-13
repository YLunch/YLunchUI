import Checkbox from '@mui/material/Checkbox';
import { Path, UseFormRegister, FieldValues } from "react-hook-form";
import {FormControlLabel} from "@mui/material";

type FieldData<T extends FieldValues> = {
  name: Path<T>;
  rules: {};
  register: UseFormRegister<T>;
  label: string;
  initialValue?: boolean;

};

export default function FormCheckBox<T extends FieldValues>({
  name,
  rules,
  register,
  label,
  initialValue = false,
}: FieldData<T>) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          size="small"
          {...register(name, rules)}
          name={name}
          checked={initialValue}
        />
      }
      label={label}
    />
  );
}
