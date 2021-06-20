import store from '@/store';

const getJwtTokenHeader = (): { Authorization: string } => {
  const state = store.getState();
  return {
    Authorization: state.user.jwtToken,
  };
};

export default getJwtTokenHeader;
