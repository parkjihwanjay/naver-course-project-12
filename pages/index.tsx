import React, { useEffect } from 'react';
import Head from 'next/head';
import { DragNDrop } from '@/components';
import useRedux from '@/hooks/redux';
import {
  deleteCardAction,
  initializeThunk,
  addCardThunk,
  addListThunk,
  deleteListThunk,
  editListThunk,
  editCardThunk,
  dragThunk,
} from '@/store/modules/Board';
import { dragCardDTO } from '@/interfaces/api/card';
import { setModalPopStateAction } from '@/store/modules/PopModal';
import { setJwtTokenAction } from '../store/modules/User';
import { dragListAction, dragCardAction } from '../store/modules/Board';

const Home: React.FC = () => {
  const { dispatch } = useRedux();
  const addColumn = (title = '') => {
    dispatch(addListThunk(title, []));
  };
  const deleteColumn = (id: string) => {
    dispatch(deleteListThunk(id));
  };
  const editColumnStart = (id: string) => {
    dispatch(setColumnEditingStateAction(id));
  };
  const editColumnSave = (id: string, newTitle: string) => {
    dispatch(editListThunk(id, newTitle));
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
    dispatch(addCardThunk(columnId, content));
  };
  const deleteCard = (columnId, id) => {
    dispatch(deleteCardAction({ columnId, id }));
  };
  const editCardStart = (id: string) => {
    dispatch(setCardEditingStateAction(id));
  };
  const editCardSave = (columnId: string, cardId: string, content: string) => {
    dispatch(editCardThunk({ columnId, cardId, content }));
  };
  const handleDragCard = (payload: dragCardDTO) => {
    dispatch(dragCardAction(payload));
  };
  const handleDragColumn = (payload: IDragColumnPayload) => {
    dispatch(dragListAction(payload));
  };
  const handleDropCard = (list: ICardList) => {
    dispatch(dragThunk(list));
  };
  const handleDropColumn = (list: ICardList) => {
    dispatch(dragThunk(list));
  };

  useEffect(() => {
    dispatch(setJwtTokenAction(localStorage.getItem('jwtToken')));
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
