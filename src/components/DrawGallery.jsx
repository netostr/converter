import React from 'react';
import FieldImg from './FieldImg';
import styles from '../../styles/DrawGallery.module.css';

function DrawGallery({ conversionData, handleDeleteFile, handleChangeDataImg }) {
  return (
    <div className={styles.gallery}>
      {conversionData.map((dataImg, index) => (
        <FieldImg
          handleDeleteFile={handleDeleteFile}
          handleChangeDataImg={handleChangeDataImg}
          dataImg={dataImg}
          indexImg={index}
          key={dataImg.url}
        />
      ))}
    </div>
  );
}

export default DrawGallery;
