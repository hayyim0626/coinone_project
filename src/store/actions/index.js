export const addCoin = (item) => {
  return {
    type: 'ADD_COIN',
    coin: item,
  };
};

export const deleteCoin = (items) => {
  return {
    type: 'DELETE_COIN',
    coin: items,
  };
};
