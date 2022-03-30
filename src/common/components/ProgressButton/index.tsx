import { Button, CircularProgress } from "@mui/material";
import classes from "./styles.module.scss";

export type ProgressButtonStatus = "idling" | "loading" | "success" | "error";
type Props = {
  label: string;
  onClick?: () => void;
  status: ProgressButtonStatus;
  type?: "submit" | "button";
};

export default function ProgressButton({
  label,
  onClick,
  status,
  type = "button",
}: Props) {
  return (
    <div className={classes.wrapper}>
      <Button type={type} onClick={onClick} disabled={status === "loading"}>
        {status === "loading" ? "" : label}
      </Button>
      {status === "loading" && (
        <CircularProgress
          size={20}
          style={{
            position: "absolute",
          }}
        />
      )}
    </div>
  );
}
