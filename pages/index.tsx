import React, { useEffect } from 'react';
import { DragNDrop } from '@/components';
import useRedux from '@/hooks/redux';
import {
  deleteCardAction,
  editColumnSaveThunk,
  addColumnThunk,
  initializeThunk,
  dragColumnThunk,
  dragCardThunk,
  dragColumnAction,
  dragCardAction,
  deleteColumnThunk,
  editCardSaveThunk,
  addCardThunk,
} from '@/store/modules/CardList';
import { dragCardDTO } from '@/interfaces/api/card';
import { ICardList, IDragColumnPayload } from '@/interfaces/ICardList';
import { setCardEditingStateAction, setColumnEditingStateAction } from '@/store/modules/Editing';
import { setModalPopStateAction } from '@/store/modules/PopModal';

const Home: React.FC = () => {
  const { dispatch } = useRedux();
  const addColumn = (title = '') => {
    dispatch(addColumnThunk(title, []));
  };
  const deleteColumn = (id: string) => {
    dispatch(deleteColumnThunk(id));
  };
  const editColumnStart = (id: string) => {
    dispatch(setColumnEditingStateAction(id));
  };
  const editColumnSave = (id: string, newTitle: string) => {
    dispatch(editColumnSaveThunk(id, newTitle));
  };
  const popModal = (
    modalState: boolean,
    columnId: string,
    cardId: string,
    cardTitle: string,
    cardContent: string,
    cardDate: Date,
    cardLabel: string,
  ) => {
    dispatch(setModalPopStateAction({ modalState, columnId, cardId, cardTitle, cardContent, cardDate, cardLabel }));
  };
  const addCard = (columnId: string, content: string) => {
    dispatch(addCardThunk({ columnId, content }));
  };
  const deleteCard = (columnId, id) => {
    dispatch(deleteCardAction({ columnId, id }));
  };
  const editCardStart = (id: string) => {
    dispatch(setCardEditingStateAction(id));
  };
  const editCardSave = (columnId: string, cardId: string, content: string) => {
    dispatch(editCardSaveThunk({ columnId, cardId, content }));
  };
  const handleDragCard = (payload: dragCardDTO) => {
    dispatch(dragCardAction(payload));
  };
  const handleDropCard = (list: ICardList) => {
    dispatch(dragCardThunk(list));
  };
  const handleDragColumn = (payload: IDragColumnPayload) => {
    dispatch(dragColumnAction(payload));
  };
  const handleDropColumn = (list: ICardList) => {
    dispatch(dragColumnThunk(list));
  };

  useEffect(() => {
    dispatch(initializeThunk());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop
          addColumn={addColumn}
          deleteColumn={deleteColumn}
          editColumnStart={editColumnStart}
          editColumnSave={editColumnSave}
          addCard={addCard}
          deleteCard={deleteCard}
          editCardSave={editCardSave}
          editCardStart={editCardStart}
          handleDragCard={handleDragCard}
          handleDragColumn={handleDragColumn}
          handleDropColumn={handleDropColumn}
          handleDropCard={handleDropCard}
          popModal={popModal}
        />
      </header>
    </div>
  );
};

export default Home;
