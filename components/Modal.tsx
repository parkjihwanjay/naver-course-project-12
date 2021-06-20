import React from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.css';

const cx = classNames.bind(styles);

const Modal = (props) => {
  const { state, id, title, content, date, label, handlePopModal } = props;

  return state ? (
    <div className={cx('openModal', 'modal')}>
      <section>
        <header>
          <button type="button" onClick={handlePopModal}>
            X
          </button>
        </header>
        <main>
          <div>{id}</div>
          <div>{title}</div>
          <div>{content}</div>
          <div>{label}</div>
          <div>{date}</div>
          <div>asdlfkaj;sdflajs</div>
        </main>
      </section>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
