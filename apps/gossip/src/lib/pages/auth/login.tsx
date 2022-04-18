import { Text, Paper, Group, PaperProps, Container } from "@mantine/core";
import { signInWithPopup } from "firebase/auth";

import GoogleButton from "$lib/components/button/google";
import { auth, googleProvider } from "$lib/modules/firebase";

export default function LoginPage(props: PaperProps<"div">) {
  return (
    <Container size={420} my={40}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Mantine, login with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton
            radius="xl"
            onClick={async () => {
              await signInWithPopup(auth, googleProvider);
            }}
          >
            Google
          </GoogleButton>
        </Group>
      </Paper>
    </Container>
  );
}
