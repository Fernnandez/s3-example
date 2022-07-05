import { ActionIcon, Loader, TextInput, TextInputProps } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { Bug, FileDownload, Search } from 'tabler-icons-react';
import { download } from '../../services/upload';

export function InputDownload(props: TextInputProps) {
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    download(filename)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(() =>
        showNotification({
          icon: <Bug />,
          message: 'Erro ao realizar o download',
        })
      )
      .finally(() => {
        setLoading(false);
        setFilename('');
      });
  };

  return (
    <TextInput
      icon={<Search size={18} />}
      radius="xl"
      size="md"
      value={filename}
      onChange={(e) => setFilename(e.currentTarget.value)}
      rightSection={
        loading ? (
          <Loader />
        ) : (
          <ActionIcon
            size={32}
            radius="xl"
            color="blue"
            variant="filled"
            onClick={handleDownload}
          >
            <FileDownload size={18} />
          </ActionIcon>
        )
      }
      placeholder="Download file"
      rightSectionWidth={42}
      {...props}
    />
  );
}
