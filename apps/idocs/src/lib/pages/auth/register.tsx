import {
  Text,
  Paper,
  Group,
  PaperProps,
  Divider,
  Container,
  Stepper,
} from "@mantine/core";

import { GoogleButton } from "$lib/components/social/button";
import ErrorBoundry from "$lib/components/common/error";
import { RegisterForm } from "./components/form";
import { useStepper } from "$lib/hooks/useStepper";
import UploadPhotoPage from "./components/photo";

export const steps = ["demo1", "demo2", "demo3"];

export function DemoStepper() {
  const { activeStep } = useStepper("tab");

  return (
    <Container size={768} my={36}>
      <Stepper active={activeStep} breakpoint="sm">
        <Stepper.Step
          label="First step"
          description="Create an account"
          allowStepSelect={false}
        >
          <RegisterPage />
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Upload Photo"
          allowStepSelect={false}
        >
          <UploadPhotoPage />
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Get full access"
          allowStepSelect={false}
        >
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </Container>
  );
}

export default function RegisterPage(props: PaperProps<"div">) {
  return (
    <Container size="xs" my={36}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Mantine, register with
        </Text>

        <ErrorBoundry>
          <Group grow my="md">
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
