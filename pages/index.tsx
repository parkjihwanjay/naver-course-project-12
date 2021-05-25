import React from 'react';
import { DragNDrop } from '@/components';
import { IColumn } from '@/interfaces';

const data: IColumn[] = [
  { title: 'group 1', items: ['1', '2', '3'] },
  { title: 'group 2', items: ['4', '5'] },
  { title: 'group 3', items: [] },
];

const Home: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop data={data} />
      </header>
    </div>
  );
};

export default Home;
