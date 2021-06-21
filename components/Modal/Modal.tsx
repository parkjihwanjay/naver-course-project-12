import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { TextInput } from '@/components';
import { offModalAction } from '@/store/modules/PopModal';
import styles from './Modal.module.css';
import useRedux from '../../hooks/redux';

const cx = classNames.bind(styles);

const Modal: React.FC = () => {
  const { dispatch, useAppSelector } = useRedux();
  const card = useAppSelector((state) => state.pop.card);
  const { title, labels, content, date } = card;

  return (
    <div className={cx('openModal', 'modal')}>
      <section>
        <header>
          <button type="button" onClick={() => dispatch(offModalAction())}>
            X
          </button>
        </header>
        <main>
          <div className={cx('title')}>{title}</div>
          <div className={cx(`${labels}`)} />
          <div className={cx('content')}>{content}</div>
          <div className={cx('date')}>{date}</div>
        </main>
      </section>
    </div>
  );
};

export default Modal;
