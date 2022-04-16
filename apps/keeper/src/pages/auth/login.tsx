import { useAuth } from "$lib/context/auth";
import { login, LoginInput, loginSchema } from "$lib/services/auth";
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
import { useFocusTrap } from "@mantine/hooks";
import { useForm, yupResolver } from "@mantine/form";
import Link from "next/link";
import { useCallback } from "react";
import { useMutation } from "react-query";

const LoginPage = () => {
  const { getInputProps, onSubmit, reset, errors } = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    schema: yupResolver(loginSchema),
  });
  const { setAuth } = useAuth();
  const { mutateAsync, error, isLoading, isError } = useMutation(
    "login",
    login,
    {
      onSuccess: setAuth,
      onError(error, variables, context) {
        console.error(error);
      },
    }
  );
  const focusTrapRef = useFocusTrap();

  const loginHandler = useCallback<(props: LoginInput) => void>(
    ({ email, password }) => mutateAsync({ email, password }).then(reset),
    [mutateAsync, reset]
  );

  if (isError) {
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

      <Paper<"form">
        component="form"
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        ref={focusTrapRef}
      >
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          data-autofocus
          {...getInputProps("email", { withError: true })}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...getInputProps("password", { withError: true })}
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
        <Button
          loading={isLoading}
          fullWidth
          mt="xl"
          onClick={onSubmit(loginHandler)}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
