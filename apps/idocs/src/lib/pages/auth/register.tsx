import { useForm } from "@mantine/hooks";
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
import { RegisterForm } from "./components/form";

export default function RegisterPage(props: PaperProps<"div">) {
  return (
    <Container size={460} my={36}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Mantine, register with
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
          <RegisterForm />
        </ErrorBoundry>
      </Paper>
    </Container>
  );
}
