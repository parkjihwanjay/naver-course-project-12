import React from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.css';

const cx = classNames.bind(styles);

const Modal = (props) => {
  const { data, state, closeModal } = props;

  return state ? (
    <div className={cx('openModal', 'modal')}>
      <section>
        <header>
          <button type="button" onClick={(event) => closeModal(event)}>
            X
          </button>
        </header>
        <main>
          <div>{data}</div>
          <div>asdlfkaj;sdflajs</div>
        </main>
      </section>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
