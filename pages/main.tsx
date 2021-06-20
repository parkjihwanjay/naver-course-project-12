import BoardApi from '@/api/board';
import React from 'react';

interface IProps {}
const Main: React.FC<IProps> = (props) => {
  const addBoard = async () => {
    await BoardApi.createBoard('허허허');
  };
  return (
    <>
      <input type="button" value="board 추가" onClick={addBoard} />
    </>
  );
};
export default Main;
