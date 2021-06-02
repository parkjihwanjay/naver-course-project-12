import React, { useEffect } from 'react';
import { DragNDrop } from '@/components';
import useRedux from '@/hooks/redux';
import {
  addColumnAction,
  deleteColumnAction,
  editColumnStartAction,
  editColumnSaveAction,
  dragCardAction,
  dragColumnAction,
  addColumnThunk,
  initializeThunk,
} from '@/store/modules/CardList';
import { IDragCardPayload, IDragColumnPayload } from '@/interfaces/ICardList';

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
  const handleDragCard = (payload: IDragCardPayload) => {
    dispatch(dragCardAction(payload));
  };
  const handleDragColumn = (payload: IDragColumnPayload) => {
    dispatch(dragColumnAction(payload));
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
          handleDragCard={handleDragCard}
          handleDragColumn={handleDragColumn}
        />
      </header>
    </div>
  );
};

export default Home;
