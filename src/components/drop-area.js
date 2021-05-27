import styles from './drop-area.module.css';
import { useState, useRef, useMemo } from 'react';
import clsx from  'clsx';

function InputImage() {

    const [isClassHighlightDraw, setClassHighlightDraw] = useState(false);
    const [progressBarValue, setProgressBarValue] = useState(0);
    const [urlFiles, setUrlFiles] = useState([]);
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
        handleFiles(files);
    };   

    const handleLabelChooseClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    } 

    function handleDeleteFiles(e){
        e.preventDefault();
        urlFiles.forEach((file) => URL.revokeObjectURL(file));
        setUrlFiles([])
    }

    const handleFiles = (files) => { 

        const urlFilesBuf = [];
        Array.from(files).forEach((file) => {
            if (file.type.indexOf("image/") === 0) {
                urlFilesBuf.push(URL.createObjectURL(file));
            }           
        });
        setUrlFiles((oldState) => ([...oldState, ...urlFilesBuf]));

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

    let cl = useMemo(() => (clsx({[styles.dropArea] : true,  [styles.highlight] : isClassHighlightDraw})), [isClassHighlightDraw]);
    return(        
        <div className={cl} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <form className={styles.form}>
                <input className={styles.fileElem} ref={inputRef} type="file" accept="image/*" onChange={(e) => handleFiles(e.target.files)} multiple/>
                <label className={styles.button} onClick={handleLabelChooseClick}>Выбрать изображения</label>
                <label className={styles.button} onClick={handleDeleteFiles}>Отчистить</label>
            </form>
            <progress max={100} value={progressBarValue}></progress>
            <div className={styles.gallery} >
                {urlFiles.map((url) => 
                    <img className={styles.galleryImg} src={url} />
                )}                
            </div>
        </div>
    )
}

export default InputImage;