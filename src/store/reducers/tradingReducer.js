const tradingReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COIN':
      return [...state, action.coin];
    case 'DELETE_COIN':
      return [...action.coin];
    default:
      return state;
  }
};

export default tradingReducer;
