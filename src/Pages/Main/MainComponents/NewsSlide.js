import React from "react";
import styled from "styled-components";

const NewsSlide = () => {
  return (
    <SLides>
      <News></News>
      <Btn></Btn>
    </SLides>
  );
};

export default NewsSlide;

const SLides = styled.div`
  width: 1024px;
  height: 42px;
  margin: 40px auto;
  display: flex;
`;

const News = styled.span`
  width: 980px;
  height: 40px;
  background-color: #f5f5f5;
`;

const Btn = styled.button`
  width: 40px;
  height: 40px;
  margin-left: 4px;
  background-color: #f5f5f5;
`;
