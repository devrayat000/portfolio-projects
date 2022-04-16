import { useAuth } from "$lib/context/auth";
import { login, signup, SignupInput, signupSchema } from "$lib/services/auth";
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
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useMutation } from "react-query";

const SignupPage = () => {
  const { getInputProps, errors, reset, onSubmit, clearErrors } = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAndCondition: false,
    },
    schema: yupResolver(signupSchema),
  });
  const { setAuth } = useAuth();
  const { mutateAsync, error } = useMutation("signup", signup, {
    onSuccess: setAuth,
  });
  const focusTrapRef = useFocusTrap();

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
          label="Name"
          placeholder="John Doe"
          required
          data-autofocus
          {...getInputProps("username", { withError: true })}
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="you@mantine.dev"
          required
          mt="md"
          {...getInputProps("email", { withError: true })}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...getInputProps("password", { withError: true })}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Your password"
          required
          mt="md"
          {...getInputProps("confirmPassword", { withError: true })}
        />
        <Group position="apart" mt="md">
          <Checkbox
            label="I accept the terms & conditions."
            {...getInputProps("termsAndCondition", {
              type: "checkbox",
              withError: true,
            })}
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
