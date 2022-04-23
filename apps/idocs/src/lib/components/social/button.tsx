import { Button, ButtonProps } from "@mantine/core";
import { signInWithPopup } from "firebase/auth";
import { useErrorHandler } from "react-error-boundary";

import { auth, provider } from "$lib/modules/firebase";
import GoogleIcon from "./icon/google";

export function GoogleButton(props: ButtonProps<"button">) {
  const handleError = useErrorHandler();
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      onClick={async () => {
        try {
          await signInWithPopup(auth, provider.google);
        } catch (error) {
          handleError(error);
        }
      }}
      {...props}
    />
  );
}
