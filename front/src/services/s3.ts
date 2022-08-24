import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002',
});

export const upload = async (file: File): Promise<void> => {
  const dataForm = new FormData();

  dataForm.append('file', file);

  await api.post('s3/upload', dataForm);
};

export const download = async (filename: string): Promise<Blob> => {
  const { data } = await api.get<Blob>(`s3/download/${filename}`, {
    headers: {
      'Content-Type': 'application/pdf',
    },
    responseType: 'blob',
  });
  return data;
};

export const uploadPSU = async (file: File): Promise<void> => {
  const signedUrl = await api.get(`s3/pre-signed-url/upload/${file.name}`);
  await api.put(`${signedUrl.data}`, file, {
    headers: { 'Content-Type': 'application/pdf' },
  });
};

export const downloadPSU = async (filename: string): Promise<Blob> => {
  const signedUrl = await api.get(`s3/pre-signed-url/download/${filename}`);
  const { data } = await api.get<Blob>(`${signedUrl.data}`, {
    headers: {
      'Content-Type': 'application/pdf',
    },
    responseType: 'blob',
  });

  return data;
};
