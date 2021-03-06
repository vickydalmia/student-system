export const pageReducer = (state, action) => {
  switch (action.type) {
    case "ADVANCE_PAGE":
      return { ...state, page: state.page + 1 };
    case "RESET_PAGE":
      return { ...state, ...{ page: 1 } };
    default:
      return state;
  }
};
