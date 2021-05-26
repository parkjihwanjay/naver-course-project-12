import React from 'react';
import { DragNDrop } from '@/components';
import useRedux from '@/hooks/redux';
import { addColumnAction } from '@/store/modules/CardList';

const Home: React.FC = () => {
  const { dispatch } = useRedux();
  const addColumn = (title = '') => {
    dispatch(addColumnAction({ items: [], title }));
  };
  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop addColumn={addColumn} />
      </header>
    </div>
  );
};

export default Home;
