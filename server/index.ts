import express, { Request, Response } from 'express';
import next from 'next';
import Jimp from 'jimp';
import fs from 'fs';
import https from 'https';
const multer = require('multer');

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

const convertImg = (file: string, mime: string) => {
  Jimp.read(file, (err, img) => {
    if (err) throw err;
    img.getBufferAsync(mime);
  });
};

(async () => {
  try {
    await app.prepare();
    const appExpress = express();
    const server = https.createServer(httpsOptions, appExpress);

    appExpress.post('/converter/upload', upload.single('file'), (req: Request, res: Response, next) => {
      //let convertedImg = convertImg();
      console.log(req.file);
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
