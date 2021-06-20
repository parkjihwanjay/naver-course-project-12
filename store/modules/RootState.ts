import { IEditingState } from './Editing';
import { IUserState } from './User';
import { IBoard } from '../../interfaces/IBoard';

export interface IRootState {
  board: IBoard;
  editing: IEditingState;
  user: IUserState;
}
