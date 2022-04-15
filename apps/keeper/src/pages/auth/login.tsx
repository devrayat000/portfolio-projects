import { useAuth } from "$lib/context/auth";
import { login, LoginInput } from "$lib/services/auth";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import Link from "next/link";
import { useCallback } from "react";
import { useMutation } from "react-query";

const LoginPage = () => {
  const { getInputProps, onSubmit, reset } = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const { setAuth } = useAuth();
  const { mutateAsync, error } = useMutation("login", login, {
    onSuccess: setAuth,
  });

  const loginHandler = useCallback<(props: LoginInput) => void>(
    ({ email, password }) => mutateAsync({ email, password }).then(reset),
    [mutateAsync, reset]
  );

  if (error) {
    return <h2>{(error as Error).message}</h2>;
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link href="/auth/signup" passHref>
          <Anchor<"a">
            size="sm"
            // onClick={(event) => event.preventDefault()}
          >
            Create account
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          data-autoFocus
          {...getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...getInputProps("password")}
        />
        <Group position="apart" mt="md">
          <Checkbox
            label="Remember me"
            {...getInputProps("rememberMe", { type: "checkbox" })}
          />
          <Anchor<"a">
            onClick={(event) => event.preventDefault()}
            href="#"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={onSubmit(loginHandler)}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
