import React from 'react';
import { DragNDrop } from '@/components';
import useRedux from '@/hooks/redux';
import { addColumnAction, setCardListAction } from '@/store/modules/CardList';
import { ICardList } from '@/interfaces/ICardList';

const Home: React.FC = () => {
  const { dispatch } = useRedux();
  const addColumn = (title = '') => {
    dispatch(addColumnAction({ items: [], title }));
  };
  const setCardList = (dragCallBack: (newList: ICardList) => void) => {
    dispatch(setCardListAction({ dragCallBack }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop addColumn={addColumn} setCardList={setCardList} />
      </header>
    </div>
  );
};

export default Home;
