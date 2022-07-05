import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002',
});

export const upload = async (file: File) => {
  const dataForm = new FormData();

  dataForm.append('file', file);

  await api.post('s3/upload', dataForm);
};

export const download = async (filename: string) => {
  const { data } = await api.get<Blob>(`s3/download/${filename}`, {
    headers: {
      'Content-Type': 'application/pdf',
    },
    responseType: 'blob',
  });
  return data;
};
