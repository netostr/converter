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
    const result = await response.json();
    console.log('Успех:', JSON.stringify(result));
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

export default uploadFile;
