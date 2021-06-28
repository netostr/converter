import download from 'downloadjs';

const fnGetFileNameFromContentDispostionHeader = async (contentDisposition) => {
  const standardPattern = /filename=(["']?)(.+)\1/i;
  const wrongPattern = /filename=([^"'][^;"'\n]+)/i;

  if (standardPattern.test(contentDisposition)) {
    return contentDisposition.match(standardPattern)[2];
  }

  if (wrongPattern.test(contentDisposition)) {
    return contentDisposition.match(wrongPattern)[1];
  }

  return Date.now();
};

const uploadFile = async (data) => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('newFormatImg', data.newFormatImg);
  formData.append('newNameImg', data.newNameImg);

  try {
    const response = await fetch('/converter/upload', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Ответ сети был не ok.');
    }

    const fileName = await fnGetFileNameFromContentDispostionHeader(response.headers.get('content-disposition'));
    const result = await response.blob();

    download(result, fileName);

    console.log('Успех:', result);
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

export default uploadFile;
