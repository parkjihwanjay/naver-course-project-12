import { IEditingState } from './Editing';
import { IUserState } from './User';
import { IBoard } from '../../interfaces/IBoard';
import { IPopState } from './PopModal';

export interface IRootState {
  board: IBoard;
  user: IUserState;
  editing: {
    columnId: string;
    cardId: string;
  };
  pop: IPopState;
}
