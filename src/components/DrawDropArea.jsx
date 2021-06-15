import {
  useState, useRef, useMemo, useCallback,
} from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import DrawGallery from './DrawGallery';
import styles from './DrawDropArea.module.css';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '30%',
    minWidth: '50px',
    margin: '0.5%',
    fontSize: '1vw',
  },
}));

function DrawDropArea() {
  const classes = useStyles();

  const [isClassHighlightDraw, setClassHighlightDraw] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState(0);

  const [conversionData, setConversionData] = useState([]);

  const inputRef = useRef();
  let filesDone = 0;
  let filesToDo = 0;

  const handleDragEnter = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setClassHighlightDraw(true);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setClassHighlightDraw(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setClassHighlightDraw(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setClassHighlightDraw(false);
    const { files } = event.dataTransfer;
    handleInputFiles(files);
  }, []);

  const handleLabelChooseClick = useCallback((event) => {
    event.preventDefault();
    inputRef.current.click();
  }, []);

  const handleDeleteFiles = useCallback((event) => {
    event.preventDefault();
    conversionData.forEach((data) => URL.revokeObjectURL(data.url));
    setConversionData([]);
  }, [conversionData]);

  const deleteFile = useCallback((index, oldState) => {
    const newState = [...oldState];
    newState.splice(index, 1);
    return newState;
  }, []);

  const handleDeleteFile = useCallback(
    (index) => (event) => {
      event.preventDefault();
      URL.revokeObjectURL(conversionData[index].url);
      setConversionData((oldState) => deleteFile(index, oldState));
    }, [conversionData]
  );

  const handleInputFiles = (files) => {
    const conversionDataBuf = [];

    Array.from(files).forEach((file) => {
      if (file.type.indexOf('image/') === 0) {
        conversionDataBuf.push({
          file,
          url: URL.createObjectURL(file),
          newFormatImg: 'jpg',
          newNameImg: '',
        });
      }
    });
    
    setConversionData((oldState) => [...oldState, ...conversionDataBuf]);
  };

  const changeValueState = useCallback((index, key, event, oldState) => {
    const newState = [...oldState];
    newState[index][key] = event.target.value;
    return newState;
  }, []);

  const handleChangeDataImg = useCallback(
    (index, key) => (event) => {
      setConversionData((oldState) => changeValueState(index, key, event, oldState));
      console.log(conversionData);
    }, [conversionData],
  );

  const dropArea = useMemo(() => (clsx({ [styles.dropArea]: true, [styles.highlight]: isClassHighlightDraw })), [isClassHighlightDraw]);
  return (
    <div className={styles.viewDropArea}>
      <Button variant="contained" color="primary" onClick={handleLabelChooseClick} className={classes.button}>Выбрать изображения</Button>
      <Button variant="contained" color="secondary" onClick={handleDeleteFiles} className={classes.button}>Очистить</Button>
      <Button variant="contained" color="default" onClick={() => console.log('конвертируем')} className={classes.button}>Конвертировать</Button>
      <div className={dropArea} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        <input className={styles.fileElem} ref={inputRef} type="file" accept="image/*" onChange={(e) => handleInputFiles(e.target.files)} multiple value="" />
        <LinearProgress variant="determinate" value={progressBarValue} />
        <DrawGallery
          conversionData={conversionData}
          handleDeleteFile={handleDeleteFile}
          handleChangeDataImg={handleChangeDataImg}
        />
      </div>
    </div>

  );
}

export default DrawDropArea;
