// import { IDocumentSection } from './document.interface';
import type { IFirestoreMetaData } from '.';

export interface IAboutPage extends IFirestoreMetaData {
  title: string;
  text: string;
  // sections: IDocumentSection[];
}
