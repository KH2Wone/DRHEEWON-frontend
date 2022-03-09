import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import config from './../../config/config.json';
import { AuthValidation } from './../../config/AuthValidation';

import ContentHeader from './../../components/RegisterLogin/ContentHeader';
import Welcome from './../../components/RegisterLogin/Welcome';

import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    id: '',
    pw: '',
  });
  const isValidLogin =
    formInput.id && AuthValidation.validPw.test(formInput.pw);

  const handleLoginInput = e => {
    const { value, name } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const trySubmitLogin = () => {
    const { BASE_URL } = config;
    fetch(`${BASE_URL}users/signin`, {
      method: 'POST',
      body: JSON.stringify({
        userId: formInput.id,
        password: formInput.pw,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          localStorage.setItem('user', result.token);
          navigate('/');
        }
        if (result.status >= 400) {
          alert('존재하지 않는 회원입니다.');
        }
      });
  };

  return (
    <div className="registerContainer LoginContainer">
      <ContentHeader pageInfo="로그인" />
      <main className="RegisterMainWrap">
        <Welcome />
        <article className="registerWrap">
          <form action="POST">
            <h3 className="loginTitle">로그인</h3>
            <label className="inputWrap">
              <span>아이디</span>
              <input
                name="id"
                onChange={handleLoginInput}
                value={formInput.id}
                type="text"
              />
            </label>
            <label className="inputWrap">
              <span>비밀번호</span>
              <input
                name="pw"
                onChange={handleLoginInput}
                value={formInput.pw}
                type="password"
              />
            </label>
            <button
              disabled={!isValidLogin}
              className="submitRegister"
              onClick={trySubmitLogin}
              type="button"
            >
              로그인
            </button>
            <button className="goRegister" type="button">
              <Link to="/register">회원가입</Link>
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Login;
