import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Group, Text, Button } from "@mantine/core";

const ErrorBoundry = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Group>
          <Text color="red">{error.message}</Text>
          <Button
            variant="filled"
            color="red"
            onClick={() => resetErrorBoundary()}
          >
            Reset
          </Button>
        </Group>
      )}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundry;
