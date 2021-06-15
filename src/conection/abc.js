const initializeProgress = (numfiles) => {
    setProgressBarValue(0);
    filesDone = 0;
    filesToDo = numfiles;
  };

  const progressDone = () => {
    filesDone++;
    setProgressBarValue(filesDone / filesToDo * 100);
  };

 

const uploadFile = (file) => {
    const url = 'ВАШ URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ';
    const formData = new FormData();
    formData.append('file', file);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(progressDone)
      .catch(() => { /* Ошибка. Информируем пользователя */ });
  };