import { useState } from "react";
import {
  Text,
  Paper,
  Group,
  PaperProps,
  Container,
  useMantineTheme,
  MantineTheme,
  Button,
} from "@mantine/core";
import { Upload, Photo, X, Icon as TablerIcon } from "tabler-icons-react";
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { updateProfile, getAuth } from "firebase/auth";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

import { useStepper } from "$lib/hooks/useStepper";
import { storage } from "$lib/modules/firebase";

export default function UploadPhotoPage(props: PaperProps<"div">) {
  const [files, setFiles] = useState<File[]>([]);
  const { nextStep } = useStepper("tab");

  const theme = useMantineTheme();

  return (
    <Container size="xs" my={36}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500} mb="lg">
          Upload Photo
        </Text>

        <form onSubmit={(e) => e.preventDefault()}>
          <Dropzone
            onDrop={setFiles}
            onReject={(files) => console.log("rejected files", files)}
            // maxSize={100 * 1024}
            accept={IMAGE_MIME_TYPE}
            // ref={dropzoneRef}
          >
            {(status) => dropzoneChildren(status, theme)}
          </Dropzone>
          <Group mt="xl" grow>
            <Button variant="outline" onClick={nextStep}>
              Skip
            </Button>
            <Button<"button">
              onClick={async (e) => {
                e.preventDefault();
                const user = getAuth().currentUser;

                if (files.length > 0 && user) {
                  const file = files[0];

                  const avatarRef = ref(
                    storage,
                    `idocs/${user.uid}/avatar/${file.name}`
                  );
                  await uploadBytes(avatarRef, file);
                  const photoURL = await getDownloadURL(avatarRef);

                  await updateProfile(user, { photoURL });
                }
              }}
            >
              Upload
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: "none" }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);
