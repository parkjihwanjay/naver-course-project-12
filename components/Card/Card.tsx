import React, { SyntheticEvent, useState } from 'react';
import { ICard } from '@/interfaces/ICard';
import TextInput from '@/components/TextInput';
import classNames from 'classnames/bind';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { dragThunk, editCardThunk, deleteListThunk, deleteCardThunk } from '@/store/modules/Board';
import { setCardEditingStateAction } from '@/store/modules/Editing';
import styles from './Card.module.css';
import { IList } from '../../interfaces/IList';
import useRedux from '../../hooks/redux';
import { onModalAction } from '../../store/modules/PopModal';

const cx = classNames.bind(styles);

interface IDragParams {
  list: IList;
  cardIndex: number;
  listIndex: number;
}
type ReactDragEvent = React.DragEvent<HTMLElement>;
type ReactClickEvent = React.MouseEvent<HTMLElement>;

interface IProps {
  list: IList;
  listIndex: number;
  card: ICard;
  cardIndex: number;
  dragging: boolean;
  getStyles: (params: IDragParams) => string;
  initialize: (e: SyntheticEvent) => void;
  handleDragStart: (e: ReactDragEvent, { list, cardIndex, listIndex }: IDragParams) => void;
  handleDragEnter: (e: ReactDragEvent, { list, cardIndex, listIndex }: IDragParams) => void;
}
const Card: React.FC<IProps> = ({ list, listIndex, card, cardIndex, dragging, getStyles, initialize, handleDragStart, handleDragEnter }) => {
  const { dispatch, useAppSelector } = useRedux();
  const editing = useAppSelector((state) => state.editing);
  return (
    <div className={cx('card')}>
      <div
        draggable
        data-id={card.id}
        className={cx(dragging ? getStyles({ list, listIndex, cardIndex }) : 'dndItem')}
        onDragStart={(e) => handleDragStart(e, { list, cardIndex, listIndex })}
        onDragEnter={(e) => handleDragEnter(e, { list, cardIndex, listIndex })}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={initialize}
        onDrop={(e) => dispatch(dragThunk())}
        onClick={() => dispatch(onModalAction(card))}
      >
        <div className={cx('labels')}>
          <div className={cx(`${card.labels}`)} />
        </div>
        <div className={cx('cardTitle')}>
          {editing.cardId === card.id ? (
            <TextInput
              defaultValue={card.content}
              handleItemSave={(newContent) =>
                dispatch(
                  editCardThunk(list.id, card.id, {
                    content: newContent,
                  }),
                )
              }
            />
          ) : (
            <div>{card.content}</div>
          )}
        </div>
        <div className={cx('icons')}>
          <IconButton aria-label="delete" size="small" onClick={() => dispatch(deleteCardThunk(list.id, card.id))}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" size="small" onClick={() => dispatch(setCardEditingStateAction(card.id))}>
            <EditIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Card;
