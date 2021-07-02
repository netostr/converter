import express, { Request, Response } from 'express';
import next from 'next';
import fs from 'fs';
import https from 'https';
import multer from 'multer';
import gm from 'gm';

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const upload = multer();

const httpsOptions = {
  key: fs.readFileSync("./server/ssl/localhost.key"),
  cert: fs.readFileSync("./server/ssl/localhost.pem"),
  requestCert: false,
  rejectUnauthorized: false,
};

const convertImg = async (fileBuff: Buffer, newFormat: string) => {
  return new Promise( (resolve, reject) => {
    gm(fileBuff)
      .toBuffer(newFormat, function (err, buffer) {
        if (err) throw err;
        resolve(buffer);
      })
  })  
}

(async () => {
  try {
    await app.prepare();
    const appExpress = express();
    const server = https.createServer(httpsOptions, appExpress);

    appExpress.post('/converter/upload', upload.single('file'), async (req: Request, res: Response) => {

      const file = req.file;
      const newFormat = req.body.newFormatImg;
      if (file && file.mimetype.split('/')[1] != newFormat) {
        const oldNameImg = file.originalname;
        const oldNameImgWithoutFormat = oldNameImg?.slice(0, oldNameImg.lastIndexOf('.'));
        const newNameImg = (req.body.newNameImg || oldNameImgWithoutFormat || 'convertedImg') + '.' + req.body.newFormatImg;

        const convertedImg = await convertImg(file.buffer, req.body.newFormatImg);

        res.set('Content-Disposition',  'attachment; filename=' + newNameImg);
        res.send(convertedImg);
      }
    });

    appExpress.all('*', (req: Request, res: Response) => handle(req, res));   

    appExpress.use((req: Request, res: Response) => res.status(404).send('Sorry cant find that!'));

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port}/ - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
