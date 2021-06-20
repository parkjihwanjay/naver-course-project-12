import React, { SyntheticEvent, useState } from 'react';
import { ICard } from '@/interfaces/ICard';
import { IColumn } from '@/interfaces/IColumn';
import { TextInput } from '@/components';
import classNames from 'classnames/bind';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './Card.module.css';
import Modal from './Modal';

const cx = classNames.bind(styles);

interface IDragParams {
  column: IColumn;
  cardIndex: number;
  columnIndex: number;
}
type ReactDragEvent = React.DragEvent<HTMLElement>;
type ReactClickEvent = React.MouseEvent<HTMLElement>;

interface IProps {
  column: IColumn;
  columnIndex: number;
  card: ICard;
  cardIndex: number;
  dragging: boolean;
  editing: { columnId: string; cardId: string };
  getStyles: (params: IDragParams) => string;
  preventEvent: (e: SyntheticEvent) => void;
  initialize: (e: SyntheticEvent) => void;
  handleDragStart: (e: ReactDragEvent, { column, cardIndex, columnIndex }: IDragParams) => void;
  handleDragEnter: (e: ReactDragEvent, { column, cardIndex, columnIndex }: IDragParams) => void;
  handleCardDrop: (e: SyntheticEvent) => void;
  handleEditCardStart: (id: string) => void;
  handleEditCardSave: (columnId: string, cardId: string, content: string) => void;
  deleteCard: (columnId: string, id: string) => void;
  openModal: (e: ReactClickEvent) => void;
  closeModal: (e: ReactClickEvent) => void;
  modalState: boolean;
}
const Card: React.FC<IProps> = ({
  column,
  columnIndex,
  card,
  cardIndex,
  dragging,
  editing,
  getStyles,
  preventEvent,
  initialize,
  handleDragStart,
  handleDragEnter,
  handleCardDrop,
  handleEditCardStart,
  handleEditCardSave,
  deleteCard,
  openModal,
  closeModal,
  modalState,
}) => {
  return (
    <div>
      <div
        draggable
        data-id={card.id}
        className={cx(dragging ? getStyles({ column, columnIndex, cardIndex }) : 'dndItem')}
        onDragStart={(e) => handleDragStart(e, { column, cardIndex, columnIndex })}
        onDragEnter={(e) => handleDragEnter(e, { column, cardIndex, columnIndex })}
        onDragOver={preventEvent}
        onDragEnd={initialize}
        onDrop={(e) => handleCardDrop(e)}
        onClick={openModal}
      >
        <div className={cx('labels')}>
          <div className={cx('label-red')} />
          <div className={cx('label-blue')} />
          <div className={cx('label-yellow')} />
        </div>
        <div className={cx('cardTitle')}>
          {editing.cardId === card.id ? (
            <TextInput defaultValue={card.content} handleItemSave={(newContent) => handleEditCardSave(column.id, card.id, newContent)} />
          ) : (
            <div onClick={(e) => handleEditCardStart(card.id)}>{card.content}</div>
          )}
        </div>
        <div className={cx('icons')}>
          <IconButton aria-label="delete" size="small" onClick={() => deleteCard(column.id, card.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" size="small" onClick={(e) => handleEditCardStart(card.id)}>
            <EditIcon />
          </IconButton>
        </div>
      </div>
      <Modal data={card.content} state={modalState} closeModal={closeModal} />
    </div>
  );
};

export default Card;
