import { Box, Button, Group, Text } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { Bug, Check, FileCheck, FileUpload } from 'tabler-icons-react';
import { uploadPSU } from '../../services/s3';

export function UploadPSU() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFile() {
    if (file) {
      setLoading(true);
      uploadPSU(file)
        .then(() => {
          showNotification({
            icon: <Check />,
            message: 'Upload realizado com sucesso',
          });
        })
        .catch(() => {
          showNotification({
            icon: <Bug />,
            message: 'Erro ao realizar o upload',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <Box
      style={{
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <Dropzone
        loading={loading}
        radius="xl"
        onDrop={(files) => setFile(files[0])}
        onReject={() =>
          showNotification({
            icon: <Bug />,
            message: 'Apenas arquivos PDF são permitidos',
          })
        }
        accept={[MIME_TYPES.pdf]}
      >
        {() => (
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, minWidth: 440, pointerEvents: 'none' }}
          >
            {file ? (
              <>
                <FileCheck size={80} />
                <div>
                  <Text size="xl" inline>
                    Selected File
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    {file.name}
                  </Text>
                </div>
              </>
            ) : (
              <>
                <FileUpload size={80} />
                <Text size="xl" inline>
                  Drag and drop the file here!
                </Text>
              </>
            )}
          </Group>
        )}
      </Dropzone>
      <Group>
        <Button
          disabled={!file}
          radius="xl"
          color="red"
          variant="outline"
          onClick={() => setFile(null)}
        >
          Remove file
        </Button>
        <Button
          disabled={!file}
          radius="xl"
          leftIcon={<FileUpload />}
          onClick={() => handleFile()}
        >
          Upload
        </Button>
      </Group>
    </Box>
  );
}
