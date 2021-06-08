import styles from './gallery.module.css';
import Button from '@material-ui/core/Button';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
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
        width: "100%",
    },
    textFieldNameImg: {
        width: '30%',
        height: '50%',
        position: 'absolute',
        right: '50%',      
    },
  }));

const FORMAT_IMG = ['jpg', 'png', 'ico'];

function DrawGallery({urlFiles, nameFiles, newNameFiles, formatImg, handleChangeFormatImg, handleDeleteFile, handleChangeNewNameFile}) {
    
    const classes = useStyles();

    return(
        <div className={styles.gallery} >
            {urlFiles.map((url, index) => 
                <div className={styles.propsImg} key={index}>
                    <div className={styles.blockImg}>
                        <img className={styles.galleryImg} src={url} />                            
                        <div className={styles.nameGalleryImg}> {nameFiles[index]} </div>
                    </div>
                    <TextField label="Название файла" variant="outlined" className={classes.textFieldNameImg} value={newNameFiles[index]} onChange={handleChangeNewNameFile(index)}/>
                    <Select className={classes.selectFormatImg}
                        value={formatImg[index]}
                        onChange={handleChangeFormatImg(index)}
                    >
                        {FORMAT_IMG.map((format) =>
                            <MenuItem className={classes.menuFormatImg} value={format} key={format}>{format}</MenuItem>
                        )}
                    </Select>
                    <Button color="secondary" className={classes.buttonCloseImg} size="small" onClick={handleDeleteFile(index)} variant="outlined">
                        <CloseRoundedIcon className={classes.iconButtonCloseImg} fontSize="small"/>
                    </Button>
                </div>
            )}                
        </div>
    )
}

export default DrawGallery;