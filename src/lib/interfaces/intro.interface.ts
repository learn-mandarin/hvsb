import type { IFirestoreMetaData } from '.';

export interface IIntro extends IFirestoreMetaData {
  text: string;
  // sections: IIntroSection[];
}

// export interface IIntroSection {
//     contentType: 'text' | 'image';
//     text?: string;
//     imageId?: string;
// }
