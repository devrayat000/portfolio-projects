import { useForm } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Checkbox,
  Anchor,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useErrorHandler } from "react-error-boundary";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";

import { auth } from "$lib/modules/firebase";
import { useStepper } from "$lib/hooks/useStepper";

export const steps = ["demo1", "demo2", "demo3"];

export function RegisterForm() {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
    validationRules: {
      name: (val) => val.length >= 6,
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 8 && val.length <= 32,
      confirmPassword: (val, vals) => val.trim() === vals?.password?.trim(),
      terms: (val) => val,
    },
    errorMessages: {
      name: "Name should be atleast 6 characters!",
      email: "Invalid email!",
      password: "Password should be atleast 8 characters!",
      confirmPassword: "Password did not match!",
      terms: "You must agree to the terms & conditions!",
    },
  });

  const handleError = useErrorHandler();
  const { nextStep } = useStepper("tab");

  return (
    <form
      onSubmit={form.onSubmit(async ({ name, email, password }) => {
        try {
          const cred = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password
          );

          await updateProfile(cred.user, { displayName: name.trim() });
          await cred.user.reload();
          await updateCurrentUser(auth, cred.user);
          nextStep();
        } catch (error) {
          handleError(error);
        }
      })}
    >
      <Group direction="column" grow>
        <TextInput
          required
          label="Name"
          placeholder="Your name"
          {...form.getInputProps("name")}
        />

        <TextInput
          required
          label="Email"
          placeholder="hello@mantine.dev"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          required
          label="Confirm Password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />

        <Checkbox
          label="I accept terms and conditions"
          {...form.getInputProps("terms", { type: "checkbox" })}
        />
      </Group>

      <Group position="apart" mt="xl">
        <Anchor
          component={Link}
          to="/auth/login"
          type="button"
          color="gray"
          size="xs"
        >
          Already have an account? Login
        </Anchor>
        <Button type="submit">Create Account</Button>
      </Group>
    </form>
  );
}

export function LoginForm() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 8 && val.length <= 32,
    },
    errorMessages: {
      email: "Invalid email!",
      password: "Password should be atleast 8 characters!",
    },
  });
  const handleError = useErrorHandler();

  return (
    <form
      onSubmit={form.onSubmit(({ email, password }) => {
        return signInWithEmailAndPassword(auth, email.trim(), password).catch(
          handleError
        );
      })}
    >
      <Group direction="column" grow>
        <TextInput
          required
          label="Email"
          placeholder="hello@mantine.dev"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
        />
      </Group>

      <Group position="apart" mt="xl">
        <Anchor
          component={Link}
          to="/auth/register"
          type="button"
          color="gray"
          size="xs"
        >
          Don't have an account? Register
        </Anchor>
        <Button type="submit">Login</Button>
      </Group>
    </form>
  );
}
