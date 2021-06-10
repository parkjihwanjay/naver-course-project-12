import React, { SyntheticEvent } from 'react';
import { IColumn } from '@/interfaces/IColumn';
import { Card, TextInput } from '@/components';
import styles from './Column.module.css';

interface IDragParams {
  column: IColumn;
  cardIndex: number;
  columnIndex: number;
}
type ReactDragEvent = React.DragEvent<HTMLElement>;

interface IProps {
  column: IColumn;
  columnIndex: number;
  dragging: boolean;
  editing: { columnId: string; cardId: string };
  getStyles: (params: IDragParams) => string;
  preventEvent: (e: SyntheticEvent) => void;
  initialize: (e: SyntheticEvent) => void;
  handleDragStart: (e: ReactDragEvent, { column, cardIndex, columnIndex }: IDragParams) => void;
  handleDragEnter: (e: ReactDragEvent, { column, cardIndex, columnIndex }: IDragParams) => void;
  handleDrop: (e: SyntheticEvent) => void;
  handleCardDrop: (e: SyntheticEvent) => void;
  handleEditColumnStart: (id: string) => void;
  handleEditColumnSave: (id: string, newTitle: string) => void;
  handleEditCardStart: (id: string) => void;
  handleEditCardSave: (columnId: string, cardId: string, content: string) => void;
  deleteColumn: (id: string) => void;
  addCard: (columnId: string, content: string) => void;
  deleteCard: (columnId: string, id: string) => void;
}

const Column: React.FC<IProps> = ({
  column,
  columnIndex,
  dragging,
  editing,
  getStyles,
  preventEvent,
  initialize,
  handleDragStart,
  handleDragEnter,
  handleDrop,
  handleCardDrop,
  handleEditColumnStart,
  handleEditColumnSave,
  handleEditCardStart,
  handleEditCardSave,
  deleteColumn,
  addCard,
  deleteCard,
}) => {
  return (
    <div
      draggable
      className={styles['dnd-group']}
      onDragEnter={(e) => handleDragEnter(e, { column, cardIndex: 0, columnIndex })}
      onDragStart={(e) => handleDragStart(e, { column, cardIndex: 0, columnIndex })}
      onDragOver={preventEvent}
      onDragEnd={initialize}
      onDrop={handleDrop}
    >
      <div>
        {editing.columnId === column.id ? (
          <TextInput defaultValue={column.title} handleItemSave={(newTitle) => handleEditColumnSave(column.id, newTitle)} />
        ) : (
          <div onClick={(e) => handleEditColumnStart(column.id)}>{column.title}</div>
        )}
        <input type="button" value="delete" onClick={() => deleteColumn(column.id)} />
      </div>
      {column.items.map((card, cardIndex) => (
        <Card
          key={card.id}
          column={column}
          columnIndex={columnIndex}
          card={card}
          cardIndex={cardIndex}
          dragging={dragging}
          editing={editing}
          getStyles={getStyles}
          preventEvent={preventEvent}
          initialize={initialize}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleCardDrop={handleCardDrop}
          handleEditCardStart={handleEditCardStart}
          handleEditCardSave={handleEditCardSave}
          deleteCard={deleteCard}
        />
      ))}
      <input type="button" value="cardadd" onClick={() => addCard(column.id, 'new')} />
    </div>
  );
};
export default Column;
