import useRedux from '@/hooks/redux';
import React, { useState, useRef } from 'react';
import { setCardListAction } from '@/store/modules/CardList';

interface IProps {
  addColumn: (title: string) => void;
}

interface IIndexParams {
  grpI: number;
  itemI: number;
}

type ReactDragEvent = React.DragEvent<HTMLElement>;

const DragNDrop: React.FC<IProps> = ({ addColumn }) => {
  const { useAppSelector, dispatch } = useRedux();
  const cardList = useAppSelector((state) => state.cardList);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef<IIndexParams>();
  const dragNode = useRef<EventTarget>();

  const handleDragStart = (e: ReactDragEvent, params: IIndexParams): void => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e: ReactDragEvent, params: IIndexParams): void => {
    if (e.target === dragNode.current) return;
    const currentItem = dragItem.current;
    dispatch(setCardListAction({ currentItem, params }));
    dragItem.current = params;
  };

  const handleDragEnd = (): void => {
    setDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (params: IIndexParams): string => {
    const currentItem = dragItem.current;
    if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI)
      return 'current dnd-item';

    return 'dnd-item';
  };

  return (
    <div className="drag-n-drop">
      {cardList.map((card, grpI) => (
        <div
          key={card.title}
          className="dnd-group"
          onDragEnter={
            dragging && !card.items.length
              ? (e) => {
                  handleDragEnter(e, { grpI, itemI: 0 });
                }
              : null
          }
        >
          <div className="group-title">{card.title}</div>
          {card.items.map((item, itemI) => (
            <div
              draggable
              onDragStart={(e) => {
                handleDragStart(e, { grpI, itemI });
              }}
              onDragEnter={
                dragging
                  ? (e) => {
                      handleDragEnter(e, { grpI, itemI });
                    }
                  : null
              }
              key={item}
              className={dragging ? getStyles({ grpI, itemI }) : 'dnd-item'}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
      <input type="button" value="plus" onClick={() => addColumn('group-5')} />
    </div>
  );
};

export default DragNDrop;
