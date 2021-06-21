import React, { useEffect, useState } from 'react';
import useRedux from '@/hooks/redux';
import { useRouter } from 'next/router';
import BoardApi from '@/api/board';
import { setJwtTokenAction } from '../store/modules/User';

const Home: React.FC = () => {
  const { dispatch } = useRedux();
  const router = useRouter();
  const [boards, setBoards] = useState([]);
  const init = async () => {
    const [boards, error] = await BoardApi.getBoardList();
    setBoards(boards);
  };
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) router.push('/login');
    dispatch(setJwtTokenAction(jwtToken));
    init();
  }, []);
  const addBoard = async () => {
    const newBoard = await BoardApi.createBoard('asdf');
    setBoards([...boards, newBoard]);
  };
  return (
    <div className="App">
      <header className="App-header" />
      {boards.map((board) => (
        <div key={board.id} onClick={() => router.push(`/board/${board.id}`)}>
          보드보드보드
        </div>
      ))}
      <div onClick={addBoard}>보드 추가하기</div>
    </div>
  );
};

export default Home;
