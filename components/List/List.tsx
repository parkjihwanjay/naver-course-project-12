import React, { SyntheticEvent, useRef } from 'react';
import Card from '@/components/Card';
import TextInput from '@/components/TextInput';
import { IconButton, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames/bind';
import { setListEditingStateAction } from '@/store/modules/Editing';
import styles from './List.module.css';
import { IList } from '../../interfaces/IList';
import useRedux from '../../hooks/redux';
import { dragThunk, editListThunk, deleteListThunk, addCardThunk } from '../../store/modules/Board';

const cx = classNames.bind(styles);

interface IDragParams {
  list: IList;
  listIndex: number;
  cardIndex: string;
}

type ReactDragEvent = React.DragEvent<HTMLElement>;

interface IProps {
  list: IList;
  listIndex: number;
  dragging: boolean;
  getStyles: (params: IDragParams) => string;
  handleDragStart: (e: ReactDragEvent, { list, cardId, listIndex }: IDragParams) => void;
  handleDragEnter: (e: ReactDragEvent, { list, cardId, listIndex }: IDragParams) => void;
  initialize: (e: SyntheticEvent) => void;
}

const List: React.FC<IProps> = ({ list, listIndex, dragging, getStyles, handleDragEnter, handleDragStart, initialize }) => {
  const { dispatch, useAppSelector } = useRedux();
  const editing = useAppSelector((state) => state.editing);
  const handleDrop = (e: SyntheticEvent) => {
    dispatch(dragThunk(list));
  };
  return (
    <div
      draggable
      className={cx('dndGroup')}
      onDragEnter={(e) => handleDragEnter(e, { list, cardIndex: 0, listIndex })}
      onDragStart={(e) => handleDragStart(e, { list, cardIndex: 0, listIndex })}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={initialize}
      onDrop={handleDrop}
    >
      <div className={cx('header')}>
        <div className={cx('columnTitle')}>
          {editing.columnId === list.id ? (
            <TextInput defaultValue={list.title} handleItemSave={(newTitle) => dispatch(editListThunk(list.id, { title: newTitle }))} />
          ) : (
            <div onClick={() => dispatch(setListEditingStateAction(list.id))}>{list.title}</div>
          )}
        </div>
        <div className={cx('icons')}>
          <IconButton aria-label="delete" size="small" onClick={() => dispatch(deleteListThunk(list.id))}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      {list.cards.map((card, cardIndex) => (
        <Card
          key={card.id}
          list={list}
          listIndex={listIndex}
          card={card}
          cardIndex={cardIndex}
          dragging={dragging}
          initialize={initialize}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          getStyles={getStyles}
        />
      ))}
      <div className={cx('cardAddButton')}>
        <Button
          variant="contained"
          size="small"
          onClick={() =>
            dispatch(
              addCardThunk(list.id, {
                title: '',
                content: '',
                date: new Date(),
              }),
            )
          }
        >
          Add a card
        </Button>
      </div>
    </div>
  );
};
export default List;
