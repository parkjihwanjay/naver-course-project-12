import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import UserApi from '@/api/user';

const getLoginWithNaverId = () => {
  return new window.naver.LoginWithNaverId({
    clientId: 'BcmS2m0jhTnXRfQzxYWk',
    callbackUrl: 'http://127.0.0.1:3000/login',
    isPopup: false,
    loginButton: { color: 'green', type: 1, height: 25 },
    callbackHandle: true,
  });
};

const Login: React.FC = () => {
  const router = useRouter();
  const [isWindow, setIsWindow] = useState(false);
  const [naverLogin, setNaverLogin] = useState(null);

  const getNaverLogin = async () => {
    let newNaverLogin;
    if (!naverLogin) {
      newNaverLogin = getLoginWithNaverId();
      setNaverLogin(newNaverLogin);
    } else {
      newNaverLogin = naverLogin;
    }
    newNaverLogin.init();
  };

  const getUser = async (token: string) => {
    const [result, error] = await UserApi.getNaverProfile(token);
    if (result === null || error) {
      if (!error) return alert('알 수 없는 에러가 발생했습니다.');
      console.log(error.response.data.message, error.response.data.statusCode);
      // router.back();
      return alert('에러 발생');
    }

    const { jwtToken } = result;
    localStorage.setItem('jwtToken', jwtToken);
    return router.push('/');
  };

  useEffect(() => {
    if (!router.asPath.includes('access_token')) {
      return getNaverLogin();
    }
    // if (isWindow) {
    //   window.close();
    // }
    const location = window.location.href.split('=')[1];
    const token = location.split('&')[0];
    getUser(token);
  }, [router.asPath, isWindow, naverLogin]);

  return (
    <div className="App">
      <Head>
        <script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charSet="utf-8" />
      </Head>
      <div id="naverIdLogin" />
    </div>
  );
};

export default Login;
