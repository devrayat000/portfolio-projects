import {
  Text,
  Paper,
  Group,
  PaperProps,
  Divider,
  Container,
} from "@mantine/core";

import { GoogleButton } from "$lib/components/social/button";
import ErrorBoundry from "$lib/components/common/error";
import { LoginForm } from "./components/form";

export default function LoginPage(props: PaperProps<"div">) {
  return (
    <Container size={460} my={80}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Mantine, login with
        </Text>

        <ErrorBoundry>
          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
          </Group>
        </ErrorBoundry>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <ErrorBoundry>
          <LoginForm />
        </ErrorBoundry>
      </Paper>
    </Container>
  );
}
