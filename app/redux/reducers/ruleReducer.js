const initialState = {
  fieldList: [
    "Theme",
    "Sub-theme",
    "Reason",
    "Language",
    "Source",
    "Rating",
    "Time Period",
    "Customer ID",
  ],
  conditionList: [
    "Equals",
    "Does not equal",
    "Like",
    "Not like",
    "Is Empty",
    "Is",
    "Is not",
  ],
  criteriaList: ["Offers", "Performance", "Platform", "Product Feedback"],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
