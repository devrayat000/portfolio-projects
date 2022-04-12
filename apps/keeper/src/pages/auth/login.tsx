import { login } from "$lib/services/auth";
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
import { NextLink } from "@mantine/next";
import Link from "next/link";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const LoginPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const { mutateAsync, error } = useMutation("login", login);

  const loginHandler = useCallback<
    (props: { email: string; password: string }) => void
  >(({ email, password }) => mutateAsync({ email, password }), [mutateAsync]);

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
          {...register("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...register("password")}
        />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" {...register("rememberMe")} />
          <Anchor<"a">
            onClick={(event) => event.preventDefault()}
            href="#"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleSubmit(loginHandler)}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
