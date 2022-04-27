import { Path, UseFormRegister, FieldValues } from "react-hook-form";
import Input from '@mui/material/Input';

type FieldData<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  rules: {};
  register: UseFormRegister<T>;
  errors: FieldValues;
  type?: string;
  initialValue?: unknown;
};

export default function FormInputFile<T extends FieldValues>({
  label,
  name,
  rules,
  register,
  errors,
  type = "text",
  initialValue = "",
}: FieldData<T>) {
  return (
    <Input
      error={!!errors[name]}
      size="small"
      {...register(name, rules)}
      type={type}
      defaultValue={initialValue}
    />
  );
}
