import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import useRedux from '@/hooks/redux';
import { setModalPopStateAction } from '@/store/modules/PopModal';
import { useRouter } from 'next/router';
import { setJwtTokenAction } from '@/store/modules/User';
import BoardComponent from '@/components/Board';
import Modal from '@/components/Modal';
import { initializeThunk } from '../../store/modules/Board';

const Board: React.FC = () => {
  const { dispatch, useAppSelector } = useRedux();
  const modalState = useAppSelector((state) => state.pop.modalState);
  const router = useRouter();
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) dispatch(setJwtTokenAction(localStorage.getItem('jwtToken')));
    if (router.asPath !== router.route) {
      const boardId = router.query.id;
      dispatch(initializeThunk(boardId));
    }
  }, [router, dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <BoardComponent />
        {modalState && <Modal />}
      </header>
    </div>
  );
};

export default Board;
