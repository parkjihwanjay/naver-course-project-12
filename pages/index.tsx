import React, { useEffect } from 'react';
import { DragNDrop } from '@/components';
import useRedux from '@/hooks/redux';
import {
  deleteColumnAction,
  editColumnStartAction,
  editColumnSaveAction,
  addCardAction,
  deleteCardAction,
  editCardStartAction,
  editCardSaveAction,
  addColumnThunk,
  initializeThunk,
  dragColumnThunk,
  dragCardThunk,
  dragColumnAction,
  dragCardAction,
} from '@/store/modules/CardList';
import { dragCardDTO } from '@/interfaces/api/card';
import { ICardList, IDragColumnPayload } from '@/interfaces/ICardList';

const Home: React.FC = () => {
  const { dispatch } = useRedux();
  const addColumn = (title = '') => {
    dispatch(addColumnThunk(title, []));
  };
  const deleteColumn = (title) => {
    dispatch(deleteColumnAction({ title }));
  };
  const editColumnStart = (title, columnIndex) => {
    dispatch(editColumnStartAction({ title, columnIndex }));
  };
  const editColumnSave = (title, columnIndex, newTitle) => {
    dispatch(editColumnSaveAction({ title, columnIndex, newTitle }));
  };
  const addCard = (columnTitle, content, id) => {
    dispatch(addCardAction({ columnTitle, content, id, isEditing: true }));
  };
  const deleteCard = (title, id) => {
    dispatch(deleteCardAction({ title, id }));
  };
  const editCardStart = (columnTitle, content, cardIndex) => {
    dispatch(editCardStartAction({ columnTitle, content, cardIndex }));
  };
  const editCardSave = (columnTitle, content, cardIndex, newContent) => {
    dispatch(editCardSaveAction({ columnTitle, content, cardIndex, newContent }));
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
        />
      </header>
    </div>
  );
};

export default Home;
