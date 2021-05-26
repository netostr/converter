import styles from './drop-area.module.css';
import { useState } from 'react';
import { Subtitles } from '@material-ui/icons';

function InputImage() {

    const [isClassHighlightDraw, setClassHighlightDraw] = useState(false);
    const [progressBarValue, setProgressBarValue] = useState(0);
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
        let dt = e.dataTransfer;
        let files = dt.files;
        handleFiles(files);
    };   

    const handleFiles = (files) => {    
        files = [...files];
        initializeProgress(files.length);
        files.forEach(uploadFile)
        files.forEach(previewFile);
    }

    function initializeProgress(numfiles) {
        setProgressBarValue(0);
        filesDone = 0;
        filesToDo = numfiles;
    }

    function progressDone() {
        filesDone++;
        setProgressBarValue(filesDone / filesToDo * 100);
    }

    function previewFile(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
            let img = document.createElement('img');
            img.src = reader.result;
            document.getElementById('gallery').appendChild(img);
        }
    }

    function uploadFile(file) {
        let url = 'ВАШ URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ';
        let formData = new FormData();
        formData.append('file', file);
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(progressDone)
        .catch(() => { /* Ошибка. Информируем пользователя */ })
    }

    let cl = isClassHighlightDraw ? styles['highlight'] : '';
    return(        
        <div className={styles['drop-area'] + ' ' + cl} id="drop-area" onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <form className={styles.form}>
                <input className={styles.fileElem} type="file" id="fileElem" accept="image/*" onChange={(e) => handleFiles(e.target.files)}/>
                <label className={styles.button} for="fileElem">Выбрать изображения</label>
            </form>
            <progress id="progress-bar" max={100} value={progressBarValue}></progress>
            <div className={styles.gallery} id="gallery"></div>
        </div>
    )
}

export default InputImage;