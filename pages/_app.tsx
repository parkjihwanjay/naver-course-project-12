import '../styles/globals.css';
import '../styles/index.css';
import { Provider } from 'react-redux';
import store from '@/store';
import type { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
