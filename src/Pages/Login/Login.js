import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import { wallstreetApi } from '../../Config';

const { Kakao } = window;

const Login = () => {
  const [loginInputValue, setloginInputValue] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginInputValue;

  const history = useHistory();

  const changeInputValue = (e) => {
    setloginInputValue({
      ...loginInputValue,
      [e.currentTarget.dataset.name]: e.target.value,
    });
  };

  const sendLoginInput = async () => {
    const res = await fetch(`${wallstreetApi}/accounts/signin`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const { Authorization } = await res.json();
    checkLoginValidation(Authorization);
  };

  const receivetKakaoToken = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        postSocialTokenToServer(authObj.access_token);
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  const postSocialTokenToServer = async (token) => {
    const res = await fetch(`${wallstreetApi}/accounts/socialsignin`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
    });
    const { Authorization } = await res.json();
    checkLoginValidation(Authorization);
  };

  const checkLoginValidation = async (Authorization) => {
    if (Authorization) {
      await localStorage.setItem('token', Authorization);
      alert('로그인 성공');
      history.push('/main');
      return;
    } else {
      alert('아이디, 비밀번호를 확인해주세요');
    }
  };

  const visiblePassword = (e) => {
    console.log(e.target.type);
    e.target.type = 'text';
  };

  return (
    <>
      <Nav />
      <LoginWrap>
        <LoginContainer>
          <LoginBox>
            <LoginTexts>
              <span>로그인</span>
              <span>소중한 정보를 위해 주소창을 체크해주세요</span>
            </LoginTexts>
            <Url>
              <span>https://coinone.co.kr</span>
            </Url>
            <LoginInput
              onKeyUp={changeInputValue}
              data-name="email"
              type="text"
              placeholder="E-Mail"
            />
            <LoginInput
              onClick={visiblePassword}
              onKeyUp={changeInputValue}
              data-name="password"
              type="password"
              placeholder="Password"
            ></LoginInput>
            <LoginBtn onClick={sendLoginInput}>로그인</LoginBtn>
            <LoginEtc>
              <span>비밀번호 찾기</span>
              <span>회원가입</span>
            </LoginEtc>
          </LoginBox>
          <SocialLoginBox>
            <CoinonePass>
              <span>코인원PASS</span>
              <span>안전하고 간편하게 본인인증을 진행하세요</span>
            </CoinonePass>
            <SocialLoginTypeBox>
              <SocialLoginType onClick={receivetKakaoToken}>
                <span>Kakao Talk</span>
              </SocialLoginType>
              <SocialLoginType>
                <span>Google</span>
              </SocialLoginType>
            </SocialLoginTypeBox>
          </SocialLoginBox>
        </LoginContainer>
      </LoginWrap>
      <Footer />
    </>
  );
};

export default Login;

const LoginWrap = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flex('center', 'center')};
`;

const LoginContainer = styled.div`
  width: 480px;
  height: 100%;
  margin: 100px 0;
`;

const LoginBox = styled.div`
  width: 100%;
  height: 485px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #79818f;
  border-radius: 10px;
`;

const SocialLoginBox = styled.div`
  width: 100%;
  height: 185px;
  border: 1px solid #79818f;
  border-radius: 10px;
`;

const LoginTexts = styled.div`
  text-align: center;
  span {
    display: block;
    margin: 30px 0;
    color: rgb(100, 100, 100);
    :first-child {
      color: black;
      font-size: 30px;
      font-weight: 700;
    }
  }
`;

const Url = styled.div`
  text-align: center;
  margin-bottom: 30px;
  span {
    margin: 0 auto;
    padding: 0 30px;
    color: #79818f;
    border: 1px solid #79818f;
    border-radius: 20px;
  }
`;

const LoginInput = styled.input.attrs((props) => ({
  type: `${props.type}`,
  placeholder: `${props.placeholder}`,
}))`
  width: 100%;
  height: 50px;
  margin: 10px 0;
  background-color: #f7f8f9;
  border: 1px solid #79818f;
  border-radius: 5px;
  padding: 10px;
`;

const LoginBtn = styled.button`
  cursor: pointer;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  background-color: #1772f8;
`;

const LoginEtc = styled.div`
  margin-top: 10px;
  text-align: right;
  span {
    margin: 0 10px;
    :first-child {
      color: #79818f;
    }
    :last-child {
      color: #1772f8;
    }
  }
`;

const SocialLoginTypeBox = styled.div`
  ${({ theme }) => theme.flex('center', 'center')};
`;

const SocialLoginType = styled.div`
  cursor: pointer;
  width: 207px;
  height: 48px;
  margin: 10px;
  border: 1px solid #79818f;
  border-radius: 5px;
  ${({ theme }) => theme.flex('center', 'center')};
`;

const CoinonePass = styled.div`
  width: 100%;
  margin: 20px;
  span {
    display: block;
    :first-child {
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 600;
    }
    :last-child {
      color: #79818f;
    }
  }
`;
