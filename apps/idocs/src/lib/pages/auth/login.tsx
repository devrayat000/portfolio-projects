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
  Anchor,
  Container,
} from "@mantine/core";
import { GoogleButton } from "$lib/components/social/button";
import { Link } from "react-router-dom";

export default function LoginPage(props: PaperProps<"div">) {
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

  return (
    <Container size={460} my={80}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Mantine, login with
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
      </Paper>
    </Container>
  );
}
