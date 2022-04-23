import { Button, ButtonProps } from "@mantine/core";
import GoogleIcon from "./icon/google";

export function GoogleButton(props: ButtonProps<"button">) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}
