import React from 'react';
import { DragNDrop } from '@/components';
import useRedux from '@/hooks/redux';
import {
  addColumnAction,
  deleteColumnAction,
  editColumnStartAction,
  editColumnSaveAction,
  dragCardAction,
  dragColumnAction,
} from '@/store/modules/CardList';
import { IDragCardPayload, IDragColumnPayload } from '@/interfaces/ICardList';

const Home: React.FC = () => {
  const { dispatch } = useRedux();
  const addColumn = (title = '') => {
    dispatch(addColumnAction({ items: [], title, isEditing: true }));
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
  const handleDragCard = (payload: IDragCardPayload) => {
    dispatch(dragCardAction(payload));
  };
  const handleDragColumn = (payload: IDragColumnPayload) => {
    dispatch(dragColumnAction(payload));
  };

  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop
          addColumn={addColumn}
          deleteColumn={deleteColumn}
          editColumnStart={editColumnStart}
          editColumnSave={editColumnSave}
          handleDragCard={handleDragCard}
          handleDragColumn={handleDragColumn}
        />
      </header>
    </div>
  );
};

export default Home;
