import React, { useEffect } from 'react';
import useRedux from '@/hooks/redux';

const Home: React.FC = () => {
  const { dispatch } = useRedux();

  return (
    <div className="App">
      <header className="App-header" />
    </div>
  );
};

export default Home;
