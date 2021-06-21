/* eslint-disable no-param-reassign */
import useRedux from '@/hooks/redux';
import React, { useState, useRef, SyntheticEvent } from 'react';
import { IColumn } from '@/interfaces/IColumn';
import { ICard } from '@/interfaces/ICard';
import { ICardList, IDragCardPayload, IDragColumnPayload } from '@/interfaces/ICardList';
import { Column } from '@/components';
import styles from './DragNDrop.module.css';
import Modal from './Modal';

interface IProps {
  addColumn: (title: string) => void;
  addCard: (columnId: string, content: string) => void;
  deleteCard: (columnId: string, id: string) => void;
  editCardStart: (id: string) => void;
  editCardSave: (columnId: string, cardId: string, content: string) => void;
  editColumnStart: (id: string) => void;
  editColumnSave: (id: string, newTitle: string) => void;
  popModal: (
    modalState: boolean,
    columnId: string,
    cardId: string,
    cardTitle: string,
    cardContent: string,
    cardDate: Date,
    cardLabel: string,
  ) => void;
  deleteColumn: (id: string) => void;
  handleDragCard: (payload: IDragCardPayload) => void;
  handleDragColumn: (payload: IDragColumnPayload) => void;
  handleDropColumn: (list: ICardList) => void;
  handleDropCard: (list: ICardList) => void;
}

interface IDragParams {
  column: IColumn;
  cardIndex: number;
  columnIndex: number;
}

interface IEditColumnParams {
  column: IColumn;
  columnIndex: number;
}

interface IEditCardParams {
  column: IColumn;
  card: ICard;
  cardIndex: number;
}

type ReactDragEvent = React.DragEvent<HTMLElement>;

const preventEvent = (e: SyntheticEvent) => {
  e.preventDefault();
};

const DragNDrop: React.FC<IProps> = ({
  addColumn,
  deleteColumn,
  editColumnStart,
  editColumnSave,
  popModal,
  addCard,
  deleteCard,
  editCardStart,
  editCardSave,
  handleDragCard,
  handleDragColumn,
  handleDropColumn,
  handleDropCard,
}) => {
  const { useAppSelector } = useRedux();
  const list = useAppSelector((state) => state.cardList);
  const editing = useAppSelector((state) => state.editing);
  const pop = useAppSelector((state) => state.pop);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef<IDragParams>();
  const dragItemNode = useRef<EventTarget>();
  const dragColumn = useRef<IDragParams>();
  const dragColumnNode = useRef<EventTarget>();

  const handleDragStart = (e: ReactDragEvent, { column, cardIndex, columnIndex }: IDragParams): void => {
    e.stopPropagation();
    const target = e.currentTarget;

    if (target.className.includes('dndGroup')) {
      dragColumn.current = { column, cardIndex, columnIndex };
      dragColumnNode.current = target;
      setDragging(false);
    } else {
      dragItemNode.current = target;
      dragItem.current = { column, cardIndex, columnIndex };
      setDragging(true);
    }
  };

  const handleDragEnter = (e: ReactDragEvent, { column, cardIndex, columnIndex }: IDragParams): void => {
    e.stopPropagation();
    if (dragging) {
      const target = e.currentTarget;
      if (dragItemNode.current === target) return;
      if (column.items.length && target.className.includes('dndGroup')) return;
      if (dragItemNode.current.dataset.id === target.dataset.id) return;
      const dragColumnIndex = dragItem.current.columnIndex;
      const dragItemCardIndex = dragItem.current.cardIndex;
      handleDragCard({ columnIndex, cardIndex, dragColumnIndex, dragItemCardIndex });
      dragItem.current = { column, cardIndex, columnIndex };
    } else {
      if (column.id === dragColumn.current.column.id) return;
      handleDragColumn({ targetColumnId: column.id, dragColumnId: dragColumn.current.column.id });
    }
  };

  const handleDrop = (e: SyntheticEvent) => {
    handleDropColumn(list);
    initialize(e);
  };

  const handleCardDrop = (e: SyntheticEvent) => {
    handleDropCard(list);
    initialize(e);
  };

  const handleEditColumnStart = (id: string): void => {
    editColumnStart(id);
  };
  const handleEditColumnSave = (id: string, newTitle: string): void => {
    editColumnSave(id, newTitle);
  };
  const handlePopModal = (
    modalState: boolean,
    columnId: string,
    cardId: string,
    cardTitle: string,
    cardContent: string,
    cardDate: Date,
    cardLabel: string,
  ): void => {
    popModal(modalState, columnId, cardId, cardTitle, cardContent, cardDate, cardLabel);
  };
  const handleEditCardStart = (id: string): void => {
    editCardStart(id);
  };
  const handleEditCardSave = (columnId: string, cardId: string, content: string): void => {
    editCardSave(columnId, cardId, content);
  };
  const initialize = (e: SyntheticEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current = null;
    dragColumn.current = null;
    dragColumnNode.current = null;
  };

  const getStyles = (params: IDragParams): string => {
    const currentItem = dragItem.current;
    if (currentItem.columnIndex === params.columnIndex && currentItem.cardIndex === params.cardIndex) return 'current dndItem';

    return 'dndItem';
  };

  const [editState, setEditState] = useState(false);

  const editModal = () => {
    setEditState(true);
  };

  const adminModal = () => {
    setEditState(false);
  };

  return (
    <div className={styles['drag-n-drop']}>
      {list.map((column, columnIndex) => (
        <Column
          key={column.id}
          column={column}
          columnIndex={columnIndex}
          dragging={dragging}
          editing={editing}
          pop={pop}
          getStyles={getStyles}
          preventEvent={preventEvent}
          initialize={initialize}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDrop={handleDrop}
          handleCardDrop={handleCardDrop}
          handleEditColumnStart={handleEditColumnStart}
          handleEditColumnSave={handleEditColumnSave}
          handlePopModal={handlePopModal}
          handleEditCardStart={handleEditCardStart}
          handleEditCardSave={handleEditCardSave}
          deleteColumn={deleteColumn}
          addCard={addCard}
          deleteCard={deleteCard}
        />
      ))}
      <input type="button" value="plus" onClick={() => addColumn('group-5')} />
      <Modal
        state={pop.modalState}
        columnId={pop.columnId}
        id={pop.cardId}
        title={pop.cardTitle}
        content={pop.cardContent}
        date={pop.cardDate}
        label={pop.cardLabel}
        handlePopModal={handlePopModal}
        editModal={editModal}
        adminModal={adminModal}
        editState={editState}
        handleEditCardSave={handleEditCardSave}
      />
    </div>
  );
};

export default DragNDrop;
