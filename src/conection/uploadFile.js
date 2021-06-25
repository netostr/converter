/* const initializeProgress = (numfiles) => {
    setProgressBarValue(0);
    filesDone = 0;
    filesToDo = numfiles;
  };

  const progressDone = () => {
    filesDone++;
    setProgressBarValue(filesDone / filesToDo * 100);
  }; */

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('https://localhost:3000/uploadFile', {
      method: 'PUT',
      body: formData,
    });
    const result = await response.json();
    console.log('Успех:', JSON.stringify(result));
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

export default uploadFile;
