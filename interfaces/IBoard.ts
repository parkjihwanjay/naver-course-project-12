import { ILabel } from './Ilabel';
import { IList } from './IList';
import { IUser } from './IUser';

export interface IBoardModel extends IBoard {
  users: IUser[];
  boardUser: IBoardUser[];
}

export interface IBoard {
  id: string;
  imgUrl: string;
  lists: IList[];
  labels: ILabel[];
}

export interface IUpdateBoard {
  imgUrl?: string;
  lists?: IList[];
}
