import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import menuData from './menuData';

const Nav = () => {
  const [menu, changeMenu] = useState(menuData);

  const { menuContents, menuValid } = menu;

  const clickMenu = (idx) => {
    let arr = menuValid.map((el, elIdx) => (elIdx === idx ? !el : el));
    changeMenu({
      ...menu,
      menuValid: arr,
    });
  };

  return (
    <NavBar>
      <div>
        <MenuContainer>
          <Link to="/main">
            <IconImg>
              {/* <img alt="logo_img" src="/images/Wall-street-movie-logo.png" /> */}
              <span>Wall Street</span>
            </IconImg>
          </Link>
          <MenuTexts>
            {menuContents.map((menu, idx) => {
              const { id, menuName, menuDetail } = menu;
              return (
                <MenuTextAndDetail
                  onMouseOver={() => clickMenu(idx)}
                  onMouseOut={() => clickMenu(idx)}
                >
                  <Link to="/exchange">
                    <MenuTextContainer>
                      <MenuStyle key={id}>{menuName}</MenuStyle>
                    </MenuTextContainer>
                  </Link>
                  <MenuDetailValid key={id} validIdx={menuValid[idx]}>
                    <MenuDatailContainer>
                      <MenuDetail
                        key={id}
                        menuDatil={menuDetail}
                        validIdx={menuValid[idx]}
                      >
                        {menuDetail.map((menuDetailElement, menuDetailIdx) => {
                          return (
                            <Link to="/profit">
                              <li key={menuDetailIdx}>{menuDetailElement}</li>
                            </Link>
                          );
                        })}
                      </MenuDetail>
                    </MenuDatailContainer>
                  </MenuDetailValid>
                </MenuTextAndDetail>
              );
            })}
          </MenuTexts>
        </MenuContainer>
        <div>
          <Link to="/signup">
            <UserInfo>회원가입</UserInfo>
          </Link>
          <Link to="/login">
            <UserInfo>로그인</UserInfo>
          </Link>
        </div>
      </div>
    </NavBar>
  );
};

export default Nav;

const NavBar = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: #fafafa;
  & > div {
    max-width: 1390px;
    width: 100%;
    margin: 0 auto;
    ${({ theme }) => theme.flex('space-between', 'center')};
  }
`;

const MenuContainer = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
`;

const IconImg = styled.div`
  cursor: pointer;
  margin-right: 10px;
  /* img {
    width: 150px;
  } */
  span {
    ${({ theme }) => theme.text('35px', '700', '#0058ff')}
  }
`;

const MenuTexts = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
`;

const MenuTextAndDetail = styled.div`
  position: relative;
`;

const MenuTextContainer = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
`;

const MenuStyle = styled.span`
  cursor: pointer;
  font-weight: 600;
  margin: 10px 10px;
  padding: 0 10px;
  border-radius: 5px;
  &:hover {
    background-color: rgb(229, 249, 255);
  }
`;

const MenuDetailValid = styled.div`
  pointer-events: ${({ validIdx }) => (validIdx ? null : 'none')};
`;

const MenuDatailContainer = styled.div`
  position: absolute;
  width: 200px;
`;

const MenuDetail = styled.ul`
  display: ${({ menuDatil }) => (menuDatil.length === 0 ? 'none' : null)};
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  opacity: ${({ validIdx }) => (validIdx ? 1 : 0)};
  li {
    padding: 10px;
    &:hover {
      cursor: ${({ validIdx }) => validIdx && 'pointer'};
      background-color: rgb(229, 249, 255);
    }
  }
`;

const UserInfo = styled.span`
  color: gray;
  font-size: 13px;
  padding: 3px 5px;
  margin: 0 5px;
  border: 1px solid gray;
  border-radius: 5px;
`;
