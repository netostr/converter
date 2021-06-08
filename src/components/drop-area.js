import styles from './drop-area.module.css';
import { useState, useRef, useMemo } from 'react';
import clsx from  'clsx';
import DrawGallery from './gallery';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        width: '30%',
        minWidth: '50px',
        margin: '0.5%',
        fontSize: '1vw',
    },
  }));

function InputImage() {
    const classes = useStyles();
    
    const [isClassHighlightDraw, setClassHighlightDraw] = useState(false);
    const [progressBarValue, setProgressBarValue] = useState(0);
    const [urlFiles, setUrlFiles] = useState([]);
    const [nameFiles, setNameFiles] = useState([]);
    const [formatImg, setFormatImg] = useState([]);
    const [newNameFiles, setNewNameFiles] = useState([]);
    
    const inputRef = useRef();
    let filesDone = 0;
    let filesToDo = 0;    
    
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setClassHighlightDraw(true);    
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setClassHighlightDraw(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setClassHighlightDraw(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setClassHighlightDraw(false);
        const files = e.dataTransfer.files;
        handleInputFiles(files);
    };   

    const handleLabelChooseClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };

    const handleDeleteFiles = (e) => {
        e.preventDefault();
        urlFiles.forEach((url) => URL.revokeObjectURL(url));
        setUrlFiles([]);
        setNameFiles([]);
        setNewNameFiles([]);
        setFormatImg([]);
    };

    const deleteFile = (index, oldState) => {
        const newState = [...oldState];
        newState.splice(index, 1);
        return newState;
    };

    const handleDeleteFile = (index) => (e) => {
        e.preventDefault();
        URL.revokeObjectURL(urlFiles[index]);
        setUrlFiles((oldState) => deleteFile(index, oldState));
        setNameFiles((oldState) => deleteFile(index, oldState));
        setNewNameFiles((oldState) => deleteFile(index, oldState));
        setFormatImg((oldState) => deleteFile(index, oldState));
    };

    const handleInputFiles = (files) => {        
        const urlFilesBuf = [];
        const nameFilesBuf = [];
        Array.from(files).forEach((file) => {
            if (file.type.indexOf("image/") === 0) {
                urlFilesBuf.push(URL.createObjectURL(file));
                nameFilesBuf.push(file.name);
            }           
        });
        setUrlFiles((oldState) => ([...oldState, ...urlFilesBuf]));
        setNameFiles((oldState) => ([...oldState, ...nameFilesBuf]));
        setFormatImg((oldState) => ([...oldState, ...Array(urlFilesBuf.length).fill('jpg')]));
        setNewNameFiles((oldState) => ([...oldState, ...Array(urlFilesBuf.length).fill('')]));
    };

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
        let url = 'ВАШ URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ';
        let formData = new FormData();
        formData.append('file', file);
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(progressDone)
        .catch(() => { /* Ошибка. Информируем пользователя */ })
    };   

    const handleChangeFormatImg = (index) => (event) => {
        setFormatImg((oldState) => {
            const newState = [...oldState];
            newState[index] = event.target.value;
            return newState;
        })            
    };

    const handleChangeNewNameFile = (index) => (e) => {
        setNewNameFiles((oldState) => {
            const newState = [...oldState];
            newState[index] = e.target.value;
            return newState;
        });
    };

    let dropArea = useMemo(() => (clsx({[styles.dropArea] : true,  [styles.highlight] : isClassHighlightDraw})), [isClassHighlightDraw]);
    return(        
        <div className={styles.viewDropArea}>
            <Button variant="contained" color="primary" onClick={handleLabelChooseClick} className={classes.button}>Выбрать изображения</Button>
            <Button variant="contained" color="secondary" onClick={handleDeleteFiles} className={classes.button}>Очистить</Button>
            <Button variant="contained" color="default" className={classes.button}>Конвертировать</Button>
            <div className={dropArea} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>            
                <input className={styles.fileElem} ref={inputRef} type="file" accept="image/*" onChange={(e) => handleInputFiles(e.target.files)} multiple value=""/>                    
                <progress max={100} value={progressBarValue}></progress>
                <DrawGallery urlFiles={urlFiles} nameFiles={nameFiles} newNameFiles={newNameFiles} formatImg={formatImg} 
                    handleChangeFormatImg={handleChangeFormatImg} handleDeleteFile={handleDeleteFile} handleChangeNewNameFile={handleChangeNewNameFile}/>
            </div>
        </div>
        
    )
}

export default InputImage;