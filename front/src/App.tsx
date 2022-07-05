import { Box, MantineProvider, Title } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { DropzoneButton } from './components/DropzoneButton';
import { InputDownload } from './components/InputDownload';

function App() {
  return (
    <div className="App">
      <MantineProvider>
        <NotificationsProvider>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              gap: '2rem  ',
            }}
          >
            <Title>Upload Files S3</Title>
            <DropzoneButton />
            <InputDownload />
          </Box>
        </NotificationsProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
