import {Readable} from 'stream';

export interface uploadInterface {
  file: {
    filename: string;
    mimetype: string;
    file: Readable;
  };
  path: string;
}
