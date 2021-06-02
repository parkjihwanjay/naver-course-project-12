import React, { useEffect } from 'react';
import { DragNDrop } from '@/components';
import useRedux from '@/hooks/redux';
import {
  deleteColumnAction,
  editColumnStartAction,
  editColumnSaveAction,
  addColumnThunk,
  initializeThunk,
  dragColumnThunk,
  dragCardThunk,
} from '@/store/modules/CardList';
import { dragCardDTO } from '@/interfaces/api/card';
import { dragColumnDTO } from '@/interfaces/api/column';

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
  const handleDragCard = (payload: dragCardDTO) => {
    dispatch(dragCardThunk(payload));
  };
  const handleDragColumn = (payload: dragColumnDTO) => {
    dispatch(dragColumnThunk(payload));
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
