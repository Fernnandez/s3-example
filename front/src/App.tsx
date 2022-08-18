import { Box, MantineProvider, Title } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Download } from './components/Download';
import { DownloadPSU } from './components/DownloadPSU';
import { Upload } from './components/Upload';
import { UploadPSU } from './components/UploadPSU';

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
            <Title>Upload and Download Files S3</Title>
            {/* <Upload /> */}
            {/* <Download /> */}
            <UploadPSU />
            <DownloadPSU />
          </Box>
        </NotificationsProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
