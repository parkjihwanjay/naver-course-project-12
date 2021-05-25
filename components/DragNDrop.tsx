import { IColumn } from '@/interfaces/IColumn';
import React, { useState, useRef } from 'react';

interface IProps {
  data: IColumn[];
}

interface IIndexParams {
  grpI: number;
  itemI: number;
}

type ReactDragEvent = React.DragEvent<HTMLElement>;

const DragNDrop: React.FC<IProps> = ({ data }) => {
  const [list, setList] = useState(data);
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
    setList((oldList: IColumn[]) => {
      const newList = [...oldList];
      const deletedCard = newList[currentItem.grpI].items.splice(
        currentItem.itemI,
        1,
      )[0];

      newList[params.grpI].items.splice(params.itemI, 0, deletedCard);

      dragItem.current = params;
      return newList;
    });
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
      {list.map((grp, grpI) => (
        <div
          key={grp.title}
          className="dnd-group"
          onDragEnter={
            dragging && !grp.items.length
              ? (e) => {
                  handleDragEnter(e, { grpI, itemI: 0 });
                }
              : null
          }
        >
          <div className="group-title">{grp.title}</div>
          {grp.items.map((item, itemI) => (
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
    </div>
  );
};

export default DragNDrop;
