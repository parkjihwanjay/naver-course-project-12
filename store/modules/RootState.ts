import { IEditingState } from './Editing';
import { IUserState } from './User';
import { IBoard } from '../../interfaces/IBoard';

export interface IRootState {
  board: IBoard;
  user: IUserState;
  editing: {
    columnId: string;
    cardId: string;
  };
  pop: {
    modalState: boolean;
    columnId: string;
    cardId: string;
    cardTitle: string;
    cardContent: string;
    cardDate: Date;
    cardLabel: string;
  };
}
