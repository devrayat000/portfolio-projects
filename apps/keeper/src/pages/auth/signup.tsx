import { useAuth } from "$lib/context/auth";
import { login, signup, SignupInput } from "$lib/services/auth";
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
import { useForm as useMForm } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useMutation } from "react-query";

const SignupPage = () => {
  const router = useRouter();

  const { getInputProps, errors, reset, onSubmit, resetErrors } = useMForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      termsAndCondition: false,
    },
  });
  const { setAuth } = useAuth();
  const { mutateAsync, error } = useMutation("signup", signup, {
    onSuccess: setAuth,
  });

  const loginHandler = useCallback<(props: SignupInput) => void>(
    ({ email, password, username }) =>
      mutateAsync({ email, password, username }).then(reset),
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
        Hi there!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Link href="/auth/login" passHref>
          <Anchor<"a">
            size="sm"
            // onClick={(event) => event.preventDefault()}
          >
            Login
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Name"
          placeholder="John Doe"
          required
          data-autoFocus
          {...getInputProps("username")}
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="you@mantine.dev"
          required
          mt="md"
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
            label="I accept the terms & conditions."
            {...getInputProps("termsAndCondition", { type: "checkbox" })}
          />
        </Group>
        <Button fullWidth mt="xl" onClick={onSubmit(loginHandler)}>
          Sign up
        </Button>
      </Paper>
    </Container>
  );
};

export default SignupPage;
