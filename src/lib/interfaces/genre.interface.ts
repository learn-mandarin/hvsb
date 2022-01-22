export interface IGenre {
  key: string;
  title: string;
  color?: string;
  bgColor?: string;
  icon?: string;
  restrictTo?: ('document' | 'image' | 'video')[];
}
