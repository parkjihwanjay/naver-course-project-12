import BoardApi from '@/api/board';
import React, { useEffect } from 'react';
import CardApi from '@/api/card';
import ListApi from '../api/list';
import useRedux from '../hooks/redux';
import { setJwtTokenAction } from '../store/modules/User';

interface IProps {}
const Main: React.FC<IProps> = (props) => {
  const { dispatch } = useRedux();

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) dispatch(setJwtTokenAction(localStorage.getItem('jwtToken')));
  }, [dispatch]);

  const addBoard = async () => {
    await BoardApi.createBoard('허허허');
  };
  const addList = async () => {
    await ListApi.createList('1', '첫번째 리스트');
  };
  const addCard = async () => {
    await CardApi.addCard('1', {
      title: '첫번째 카드',
      content: '첫번째 카드 내용',
      date: new Date('2021-06-21'),
    });
  };
  return (
    <>
      <input type="button" value="board 추가" onClick={addBoard} />
      <input type="button" value="list 추가" onClick={addList} />
      <input type="button" value="card 추가" onClick={addCard} />
    </>
  );
};
export default Main;
