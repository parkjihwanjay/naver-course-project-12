/* eslint-disable no-param-reassign */
import useRedux from '@/hooks/redux';
import React, { useState, useRef, SyntheticEvent } from 'react';
import { setCardListAction } from '@/store/modules/CardList';
import { IColumn } from '@/interfaces/IColumn';
import { ICardList } from '@/interfaces/ICardList';

interface IProps {
  addColumn: (title: string) => void;
}

interface IDragParams {
  column: IColumn;
  cardIndex: number;
  columnIndex: number;
}

type ReactDragEvent = React.DragEvent<HTMLElement>;

const preventEvent = (e: SyntheticEvent) => {
  e.preventDefault();
};

const DragNDrop: React.FC<IProps> = ({ addColumn }) => {
  const { useAppSelector, dispatch } = useRedux();
  const list = useAppSelector((state) => state.cardList);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef<IDragParams>();
  const dragItemNode = useRef<EventTarget>();
  const dragColumn = useRef<IDragParams>();
  const dragColumnNode = useRef<EventTarget>();

  const handleDragStart = (e: ReactDragEvent, { column, cardIndex, columnIndex }: IDragParams): void => {
    e.stopPropagation();
    const target = e.target as Element;

    if (target.className === 'dnd-group') {
      dragColumn.current = { column, cardIndex, columnIndex };
      dragColumnNode.current = target;
      setTimeout(() => {
        setDragging(false);
      }, 0);
    } else {
      dragItemNode.current = target;
      dragItem.current = { column, cardIndex, columnIndex };
      setTimeout(() => {
        setDragging(true);
      }, 0);
    }
  };

  const handleDragEnter = (e: ReactDragEvent, { column, cardIndex, columnIndex }: IDragParams): void => {
    e.stopPropagation();
    if (dragItemNode.current === e.target) return;

    if (dragging) {
      const dragGrpI = dragItem.current.columnIndex;
      const dragCallBack = (newList: ICardList) => {
        newList[columnIndex].items.splice(cardIndex, 0, newList[dragGrpI].items.splice(dragItem.current.cardIndex, 1)[0]);
        dragItem.current = { column, cardIndex, columnIndex };
      };
      dispatch(setCardListAction({ dragCallBack }));
    } else {
      const dragCallBack = (newList: ICardList) => {
        const grpI = newList.findIndex((el) => el.title === column.title);
        const dragGrpI = newList.findIndex((el) => el.title === dragColumn.current.column.title);
        const temp = newList[grpI];
        newList[grpI] = newList[dragGrpI];
        newList[dragGrpI] = temp;
      };
      dispatch(setCardListAction({ dragCallBack }));
    }
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
          key={column.title}
          draggable
          onDragEnter={(e) => handleDragEnter(e, { column, cardIndex: 0, columnIndex })}
          className="dnd-group"
          onDragStart={(e) => handleDragStart(e, { column, cardIndex: 0, columnIndex })}
          onDragOver={preventEvent}
          onDragEnd={initialize}
          onDrop={initialize}
        >
          {column.items.map((card, cardIndex) => (
            <div
              draggable
              key={card}
              className={dragging ? getStyles({ column, columnIndex, cardIndex }) : 'dnd-item'}
              onDragStart={(e) => handleDragStart(e, { column, cardIndex, columnIndex })}
              onDragEnter={(e) => handleDragEnter(e, { column, cardIndex, columnIndex })}
              onDragOver={preventEvent}
              onDragEnd={initialize}
              onDrop={initialize}
            >
              {card}
            </div>
          ))}
        </div>
      ))}
      <input type="button" value="plus" onClick={() => addColumn('group-5')} />
    </div>
  );
};

export default DragNDrop;
