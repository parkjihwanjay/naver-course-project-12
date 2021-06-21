/* eslint-disable no-param-reassign */
import useRedux from '@/hooks/redux';
import React, { useState, useRef, SyntheticEvent } from 'react';
import { IList } from '@/interfaces/IList';
import { addListThunk, dragCardAction, dragListAction } from '@/store/modules/Board';
import styles from './Board.module.css';
import List from '../List';
import { IBoard } from '../../interfaces/IBoard';

interface IProps {
  popModal: (
    modalState: boolean,
    columnId: string,
    cardId: string,
    cardTitle: string,
    cardContent: string,
    cardDate: Date,
    cardLabel: string,
  ) => void;
}

interface IDragParams {
  list: IList;
  listIndex: number;
  cardIndex: string;
}

type ReactDragEvent = React.DragEvent<HTMLElement>;

const preventEvent = (e: SyntheticEvent) => {
  e.preventDefault();
};

const Board: React.FC<IProps> = ({ popModal }) => {
  const { dispatch, useAppSelector } = useRedux();
  const board = useAppSelector((state) => state.board);

  const [dragging, setDragging] = useState(false);
  const dragCard = useRef<IDragParams>();
  const dragCardNode = useRef<EventTarget>();
  const dragList = useRef<IDragParams>();
  const dragListNode = useRef<EventTarget>();

  const initialize = (e: SyntheticEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    dragCard.current = null;
    dragCardNode.current = null;
    dragList.current = null;
    dragListNode.current = null;
  };

  const getStyles = (params: IDragParams): string => {
    const currentItem = dragCard.current;
    if (currentItem.list.id === params.list.id && currentItem.cardIndex === params.cardIndex) return 'current dndItem';
    return 'dndItem';
  };

  const handleDragStart = (e: ReactDragEvent, { list, cardIndex, listIndex }: IDragParams): void => {
    e.stopPropagation();
    const target = e.currentTarget;

    if (target.className === 'dndGroup') {
      dragList.current = { list, cardIndex, listIndex };
      dragListNode.current = target;
      setDragging(false);
    } else {
      dragCardNode.current = target;
      dragCard.current = { list, cardIndex, listIndex };
      setDragging(true);
    }
  };

  const handleDragEnter = (e: ReactDragEvent, { list, cardIndex, listIndex }: IDragParams): void => {
    e.stopPropagation();
    if (dragging) {
      const target = e.currentTarget;
      if (dragCardNode.current === target) return;
      if (list.cards.length && target.className === 'dndGroup') return;
      if (dragCardNode.current.dataset.id === target.dataset.id) return;
      const dragListIndex = dragCard.current.listIndex;
      const dragCardIndex = dragCard.current.cardIndex;
      dispatch(dragCardAction({ listIndex, cardIndex, dragListIndex, dragCardIndex }));
      dragCard.current = { list, cardIndex, listIndex };
    } else {
      if (list.id === dragList.current.list.id) return;
      dispatch(dragListAction({ targetListId: list.id, dragListId: dragList.current.list.id }));
    }
  };
  return (
    <div className={styles['drag-n-drop']}>
      {board.lists.map((list, listIndex) => (
        <List
          key={list.id}
          list={list}
          listIndex={listIndex}
          dragging={dragging}
          getStyles={getStyles}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          initialize={initialize}
        />
      ))}
      <input type="button" value="plus" onClick={() => dispatch(addListThunk('새 리스트'))} />
    </div>
  );
};

export default Board;
