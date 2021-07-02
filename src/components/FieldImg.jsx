import React from 'react';
import Button from '@material-ui/core/Button';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import styles from '../../styles/DrawGallery.module.css';

export const FORMAT_IMG = ['jpeg', 'png', 'bmp'];
const stateKeys = ['newNameImg', 'newFormatImg'];

const useStyles = makeStyles(() => ({
  buttonCloseImg: {
    width: '5%',
    right: '0%',
    minWidth: '30px',
    margin: 'auto',
    position: 'absolute',
  },
  iconButtonCloseImg: {
    width: '100%',
  },
  selectFormatImg: {
    position: 'absolute',
    right: '20%',
  },
  menuFormatImg: {
    width: '100%',
  },
  textFieldNameImg: {
    width: '30%',
    height: '50%',
    position: 'absolute',
    right: '50%',
  },
}));

const FieldImg = React.memo(
  ({
    handleDeleteFile,
    handleChangeDataImg,
    dataImg,
    indexImg,
  }) => {
    const classes = useStyles();

    return (
      <div className={styles.propsImg} key={dataImg.url}>
        <div className={styles.blockImg}>
          <img className={styles.galleryImg} src={dataImg.url} />
          <div className={styles.nameGalleryImg}>
            {' '}
            {dataImg.file.name}
            {' '}
          </div>
        </div>
        <TextField
          label="Название файла"
          variant="outlined"
          className={classes.textFieldNameImg}
          value={dataImg.newNameImg}
          onChange={(event) => handleChangeDataImg(event.target.value, indexImg, stateKeys[0])}
        />
        <Select
          className={classes.selectFormatImg}
          value={dataImg.newFormatImg}
          onChange={(event) => handleChangeDataImg(event.target.value, indexImg, stateKeys[1])}
        >
          {FORMAT_IMG.map((format) => (
            <MenuItem
              className={classes.menuFormatImg}
              value={format}
              key={format}
            >
              {format}
            </MenuItem>
          ))}
        </Select>
        <Button
          color="secondary"
          className={classes.buttonCloseImg}
          size="small"
          onClick={handleDeleteFile}
          data-index={indexImg}
          variant="outlined"
        >
          <CloseRoundedIcon className={classes.iconButtonCloseImg} fontSize="small" />
        </Button>
      </div>
    );
  },
);

export default FieldImg;
