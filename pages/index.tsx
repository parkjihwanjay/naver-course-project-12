import React from 'react';
import { DragNDrop } from '@/components';
import useRedux from '@/hooks/redux';
import { addColumnAction, dragCardAction, dragColumnAction } from '@/store/modules/CardList';
import { IDragCardPayload, IDragColumnPayload } from '@/interfaces/ICardList';

const Home: React.FC = () => {
  const { dispatch } = useRedux();
  const addColumn = (title = '') => {
    dispatch(addColumnAction({ items: [], title }));
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
        <DragNDrop addColumn={addColumn} handleDragCard={handleDragCard} handleDragColumn={handleDragColumn} />
      </header>
    </div>
  );
};

export default Home;
