import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { TextInput } from '@/components';
import styles from './Modal.module.css';

const cx = classNames.bind(styles);

const Modal = (props) => {
  const { state, columnId, id, title, content, date, label, handlePopModal, editModal, adminModal, editState, handleEditCardSave } = props;

  return state ? (
    <div className={cx('openModal', 'modal')}>
      <section>
        <header>
          <button type="button" onClick={handlePopModal}>
            X
          </button>
        </header>
        <main>
          <div className={cx('title')}>{title}</div>
          <div className={cx(`${label}`)} />
          <div className={cx('content')} onClick={editModal}>
            {editState ? (
              <TextInput defaultValue={content} handleItemSave={(newContent) => handleEditCardSave(columnId, id, newContent)} />
            ) : (
              <div>{content}</div>
            )}
          </div>
          <div className={cx('date')}>{date}</div>
        </main>
      </section>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
