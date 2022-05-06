import {
  defaultErrorRecoveryTimeout,
  defaultSuccessRecoveryTimeout,
} from "./../constants/timeouts";
import React from "react";

type AsyncActionStatus = "idling" | "loading" | "success" | "error";

type ActParams = {
  asyncAction: () => Promise<unknown>;
  asyncSuccessAction?: () => Promise<void>;
  asyncSuccessTimeoutAction?: () => Promise<void>;
  asyncErrorAction?: (error: unknown) => Promise<void>;
  asyncErrorTimeoutAction?: () => Promise<void>;
  successRecoveryTimeout?: number;
  errorRecoveryTimeout?: number;
};

function useAsyncAction() {
  const [status, setStatus] = React.useState<AsyncActionStatus>("idling");

  async function actAsync({
    asyncAction,
    asyncSuccessAction = async () => {},
    asyncSuccessTimeoutAction = async () => {},
    asyncErrorAction = async () => {},
    asyncErrorTimeoutAction = async () => {},
    successRecoveryTimeout = defaultSuccessRecoveryTimeout,
    errorRecoveryTimeout = defaultErrorRecoveryTimeout,
  }: ActParams) {
    setStatus("loading");
    try {
      await asyncAction();
      setStatus("success");
      await asyncSuccessAction();
      setTimeout(async () => {
        setStatus("idling");
        await asyncSuccessTimeoutAction();
      }, successRecoveryTimeout);
    } catch (error) {
      setStatus("error");
      await asyncErrorAction(error);
      setTimeout(async () => {
        setStatus("idling");
        await asyncErrorTimeoutAction();
      }, errorRecoveryTimeout);
    }
  }

  return { actAsync, status };
}

export default useAsyncAction;
