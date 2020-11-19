import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Routes from './Routes';
import rootReducer from './store/reducers';
import GlobalStyle from './Styles/GlobalStyle';
import theme from './Styles/theme';

const store = createStore(rootReducer);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Routes />
      <GlobalStyle />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
