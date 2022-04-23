import { useForm } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Container,
} from "@mantine/core";
import { GoogleButton } from "$lib/components/social/button";
import { Link } from "react-router-dom";

export default function RegisterPage(props: PaperProps<"div">) {
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
      confirmPassword: (val, vals) => val === vals?.password,
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

  return (
    <Container size={460} my={36}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Mantine, register with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => {})}>
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
      </Paper>
    </Container>
  );
}
