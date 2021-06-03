/* eslint-disable no-param-reassign */
import useRedux from '@/hooks/redux';
import React, { useState, useRef, SyntheticEvent } from 'react';
import { IColumn } from '@/interfaces/IColumn';
import { ICard } from '@/interfaces/ICard';
import { ICardList, IDragCardPayload, IDragColumnPayload } from '@/interfaces/ICardList';
import { TextInput } from '@/components';

interface IProps {
  addColumn: (title: string) => void;
  addCard: (columnTitle: string, content: string, id: string) => void;
  deleteCard: (title: string, id: string) => void;
  editCardStart: (columnTitle: string, content: string, cardIndex: number) => void;
  editCardSave: (columnTitle: string, content: string, cardIndex: number, newContent: string) => void;
  editColumnStart: (id: string) => void;
  editColumnSave: (id: string, newTitle: string) => void;
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
  const editingColumnId = useAppSelector((state) => state.editing);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef<IDragParams>();
  const dragItemNode = useRef<EventTarget>();
  const dragColumn = useRef<IDragParams>();
  const dragColumnNode = useRef<EventTarget>();

  const handleDragStart = (e: ReactDragEvent, { column, cardIndex, columnIndex }: IDragParams): void => {
    e.stopPropagation();
    const target = e.currentTarget;

    if (target.className === 'dnd-group') {
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
      if (column.items.length && target.className === 'dnd-group') return;
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
  const handleEditCardStart = ({ column, card, cardIndex }: IEditCardParams): void => {
    editCardStart(column.title, card.content, cardIndex);
  };
  const handleEditCardSave = (newContent: string, { column, card, cardIndex }: IEditCardParams): void => {
    editCardSave(column.title, card.content, cardIndex, newContent);
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
    if (currentItem.columnIndex === params.columnIndex && currentItem.cardIndex === params.cardIndex) return 'current dnd-item';

    return 'dnd-item';
  };

  return (
    <div className="drag-n-drop">
      {list.map((column, columnIndex) => (
        <div
          key={column.id}
          draggable
          className="dnd-group"
          onDragEnter={(e) => handleDragEnter(e, { column, cardIndex: 0, columnIndex })}
          onDragStart={(e) => handleDragStart(e, { column, cardIndex: 0, columnIndex })}
          onDragOver={preventEvent}
          onDragEnd={initialize}
          onDrop={handleDrop}
        >
          <div>
            {editingColumnId === column.id ? (
              <TextInput defaultValue={column.title} handleItemSave={(newTitle) => handleEditColumnSave(column.id, newTitle)} />
            ) : (
              <div onClick={(e) => handleEditColumnStart(column.id)}>{column.title}</div>
            )}
            <input type="button" value="delete" onClick={() => deleteColumn(column.id)} />
          </div>
          {column.items.map((card, cardIndex) => (
            <div
              draggable
              data-id={card.id}
              key={card.id}
              className={dragging ? getStyles({ column, columnIndex, cardIndex }) : 'dnd-item'}
              onDragStart={(e) => handleDragStart(e, { column, cardIndex, columnIndex })}
              onDragEnter={(e) => handleDragEnter(e, { column, cardIndex, columnIndex })}
              onDragOver={preventEvent}
              onDragEnd={initialize}
              onDrop={(e) => handleCardDrop(e)}
            >
              <div>
                {card.isEditing ? (
                  <TextInput
                    defaultValue={card.content}
                    handleItemSave={(newContent) => handleEditCardSave(newContent, { column, card, cardIndex })}
                  />
                ) : (
                  <div onClick={(e) => handleEditCardStart({ column, card, cardIndex })}>{card.content}</div>
                )}

                <button type="button" value="carddel" onClick={() => deleteCard(column.title, card.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          <input type="button" value="cardadd" onClick={() => addCard(column.title, 'new', '6')} />
        </div>
      ))}
      <input type="button" value="plus" onClick={() => addColumn('group-5')} />
    </div>
  );
};

export default DragNDrop;
