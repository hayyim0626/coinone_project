import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import { wallstreetApi } from '../../Config';

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    checkPassword: '',
  });
  const { email, password, checkPassword } = userInfo;
  const [loadingStatus, setLoadingStatus] = useState(false);
  const history = useHistory();

  const inputSignup = (e) => {
    setUserInfo({
      ...userInfo,
      [e.currentTarget.dataset.name]: e.target.value,
    });
  };

  const emailCheck = (asValue) => {
    const emailTypeCheck = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailTypeCheck.test(asValue);
  };

  const passwordCheck = (asValue) => {
    let UpperLowerTextCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/;
    return UpperLowerTextCheck.test(asValue);
  };

  const loginRequest = async () => {
    const SendUserInfo = await fetch(`${wallstreetApi}/accounts/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const res = await SendUserInfo.json();
    return res;
  };

  const alertAndLoading = (message) => {
    alert(message);
    setLoadingStatus(false);
  };

  const certificationEmail = () => {
    setLoadingStatus(true);
    setTimeout(() => {
      emailCheck(email) && passwordCheck(password) && password === checkPassword
        ? loginRequest().then((result) => {
            if (result.message === 'SUCCESS') {
              alertAndLoading('인증메일이 발송되었습니다');
              history.push('/login');
            } else if (result.message === 'UNAUTHORIZED') {
              alertAndLoading('아이디, 비밀번호를 확인해주세요');
            }
          })
        : alertAndLoading('입력정보를 다시 확인해주세요');
    }, 1000);
  };

  return (
    <>
      <Nav />
      <SignupWrap>
        <LoadingImg loadingStatus={loadingStatus}>
          <img alt="logoImg" src="/images/img_issue_loading.gif" />
        </LoadingImg>
        <SignupContainer>
          <SignupTitle>
            <span>회원가입</span>
          </SignupTitle>
          <InputEmail>
            <span>이메일</span>
            <input
              onKeyUp={inputSignup}
              data-name="email"
              type="text"
              placeholder="이메일 입력"
            />
          </InputEmail>
          <InputPasswordContainer>
            <span>비밀번호</span>
            <InputPassword
              onKeyUp={inputSignup}
              data-name="password"
              placeholder="비밀번호 입력"
            />
            <PasswordValidContainer>
              <ul>
                <li>영문 대문자 포함</li>
                <li>영문 소문자 포함</li>
                <li>특수 문자 포함</li>
                <li>숫자 포함</li>
                <li>10자 이상</li>
              </ul>
            </PasswordValidContainer>
            <InputPassword
              onKeyUp={inputSignup}
              data-name="checkPassword"
              placeholder="비밀번호 확인"
            ></InputPassword>
          </InputPasswordContainer>
          <CompleteBtn onClick={certificationEmail}>완료</CompleteBtn>
        </SignupContainer>
      </SignupWrap>
      <Footer />
    </>
  );
};

export default Signup;

const SignupWrap = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flex('center', 'center')}
`;

const LoadingImg = styled.div`
  position: absolute;
  top: 50%;
  left: 45%;
  display: ${({ loadingStatus }) => !loadingStatus && 'none'};
`;

const SignupContainer = styled.div`
  width: 480px;
  height: 850px;
`;

const SignupTitle = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
  span {
    ${({ theme }) => theme.text('30px', 400)}
  }
`;

const InputEmail = styled.div`
  width: 100%;
  margin: 20px 0;
  input {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    padding: 10px;
    ${({ theme }) => theme.border('1px', 'solid', '#aeb3bb', null, '5px')}
    :focus {
      border-color: #1772f8;
    }
  }
`;

const InputPasswordContainer = styled.div`
  margin: 40px 0;
`;

const InputPassword = styled.input.attrs((props) => ({
  type: 'password',
}))`
  display: block;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  padding: 10px;
  ${({ theme }) => theme.border('1px', 'solid', '#aeb3bb', null, '5px')}
  :focus {
    border-color: #1772f8;
  }
`;

const PasswordValidContainer = styled.div`
  ${({ theme }) => theme.border('1px', 'solid', '#aeb3bb', null, '5px')}
  width: 100%;
  padding: 20px 40px;
  margin: 10px 0 30px 0;
  ul {
    list-style: disc;
    li {
      margin: 10px 0;
      ${({ theme }) => theme.text('12px', null, '#484d55')}
    }
  }
`;

const CompleteBtn = styled.button`
  cursor: pointer;
  width: 100%;
  height: 50px;
  text-align: center;
  margin-top: 30px;
  ${({ theme }) => theme.text('14px', null, '#79818f')};
  ${({ theme }) => theme.border('1px', 'solid', '#c9ccd2', '#c9ccd2', '5px')};
  :hover {
    ${({ theme }) => theme.text('14px', null, 'white')};
    ${({ theme }) => theme.border('1px', 'solid', '#1772f8', '#1772f8', '5px')};
  }
`;
