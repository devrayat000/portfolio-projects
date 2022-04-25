import {
  UnstyledButton,
  Container,
  Paper,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container size={768} my={36}>
      <Title order={1}>Welcome to iDocs</Title>
      <Title order={3}>Welcome to iDocs</Title>
      <SimpleGrid
        cols={4}
        spacing="md"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        <Paper
          radius="md"
          shadow="md"
          withBorder
          sx={{
            display: "grid",
            placeItems: "stretch",
            aspectRatio: "1/1",
          }}
        >
          <UnstyledButton
            sx={{
              display: "grid",
              placeItems: "center",
            }}
            onClick={() => navigate("d/" + nanoid())}
          >
            Create
          </UnstyledButton>
        </Paper>
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
