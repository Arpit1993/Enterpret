import {
  ADD_NEW_RULE_RULE_GROUP,
  ADD_NEW_RULE_GROUP,
  DELETE_SPECIFIC_RULE_RULE_GROUP,
  DELETE_SPECIFIC_RULE_GROUP,
  DISPLAY_LIST_ADD_NEW_RULE,
  DISPLAY_LIST_ADD_NEW_RULE_GROUP,
  DISPLAY_LIST_DELETE_SPECIFIC_RULE,
  DISPLAY_LIST_DELETE_SPECIFIC_RULE_GROUP,
  ADD_TOGGLE_STATE,
  REMOVE_TOGGLE_STATE,
  UPDATE_TOGGLE_STATE,
  UPDATE_QUERY_LIST,
} from "./mainTypes";
import { mapper } from "../../components/mapper";

import { UPDATE_FIELD, UPDATE_CRITERIA, UPDATE_CONDITION } from "./ruleTypes";

const queryBuilder = (ruleGroup, toggleState) => {
  let listToReturn = [];
  ruleGroup.forEach((list, pindex) => {
    let query = "";
    list.forEach((item, cindex) => {
      let fieldName = item.field;
      let conditionName = item.condition;
      let criteriaName = item.criteria;
      let andOr = toggleState[pindex];
      let symbol = andOr ? "&&" : "||";
      if (cindex !== list.length - 1) {
        query +=
          "(field." +
          fieldName +
          ")" +
          " " +
          mapper[conditionName] +
          " " +
          "\\" +
          criteriaName +
          "\\" +
          " " +
          symbol +
          " ";
      } else {
        query +=
          "(field." +
          fieldName +
          ")" +
          " " +
          mapper[conditionName] +
          " " +
          "\\" +
          criteriaName +
          "\\";
      }
    });
    listToReturn.push(query);
  });
  return listToReturn;
};
const initialState = {
  displayList: [[1]],
  ruleGroup: [[{ field: "Theme", condition: "Equals", criteria: "Offers" }]],
  toggleState: [true],
  queryList: [],
};

const reducer = (state = initialState, action) => {
  let parentIndex = null;
  let childIndex = null;
  let valueToUpdate = null;

  switch (action.type) {
    case ADD_NEW_RULE_RULE_GROUP:
      let newField = {
        field: "Theme",
        condition: "Equals",
        criteria: "Offers",
      };
      parentIndex = action.payload.parentIndex;
      return {
        ...state,
        ruleGroup: state.ruleGroup.map((list, index) => {
          return parentIndex === index ? [...list, newField] : list;
        }),
      };

    case ADD_NEW_RULE_GROUP:
      return {
        ...state,
        ruleGroup: state.ruleGroup.concat([
          [{ field: "Theme", condition: "Equals", criteria: "Offers" }],
        ]),
      };

    case DELETE_SPECIFIC_RULE_RULE_GROUP:
      parentIndex = action.payload.parentIndex;
      childIndex = action.payload.childIndex;
      return {
        ...state,
        ruleGroup: state.ruleGroup.map((list, index) => {
          if (parentIndex === index) {
            return list.filter((rule, index) => {
              return childIndex !== index ? rule : "";
            });
          }
          return list;
        }),
      };

    case DELETE_SPECIFIC_RULE_GROUP:
      parentIndex = action.payload.parentIndex;
      return {
        ...state,
        ruleGroup: state.ruleGroup.filter((list, index) => {
          return index !== parentIndex ? list : "";
        }),
      };

    case DISPLAY_LIST_ADD_NEW_RULE:
      parentIndex = action.payload.parentIndex;
      return {
        ...state,
        displayList: state.displayList.map((list, index) => {
          return index === parentIndex ? [...list, 1] : list;
        }),
      };

    case DISPLAY_LIST_ADD_NEW_RULE_GROUP:
      return {
        ...state,
        displayList: state.displayList.concat([[1]]),
      };

    case DISPLAY_LIST_DELETE_SPECIFIC_RULE:
      parentIndex = action.payload.parentIndex;
      return {
        ...state,
        displayList: state.displayList.map((list, index) => {
          if (index === parentIndex) {
            list.pop();
          }
          return index === parentIndex ? [...list] : list;
        }),
      };

    case DISPLAY_LIST_DELETE_SPECIFIC_RULE_GROUP:
      parentIndex = action.payload.parentIndex;
      return {
        ...state,
        displayList: state.displayList.filter((list, index) => {
          return parentIndex !== index ? [...list] : "";
        }),
      };

    case UPDATE_CONDITION:
      valueToUpdate = action.payload.conditionValue;
      parentIndex = action.payload.parentIndex;
      childIndex = action.payload.childIndex;
      state.ruleGroup[parentIndex][childIndex]["condition"] = valueToUpdate;
      return state;
    //   return {
    //     ...state,
    //     ruleGroup: state.ruleGroup.map((list, index) => {
    //       if (parentIndex === index) {
    //         return list.map((item, index) => {
    //           if (childIndex === index) {
    //             return { ...item, condition: valueToUpdate };
    //           }
    //           return { ...item };
    //         });
    //       }
    //       return [...list];
    //     }),
    //   };

    case UPDATE_CRITERIA:
      valueToUpdate = action.payload.criteriaValue;
      parentIndex = action.payload.parentIndex;
      childIndex = action.payload.childIndex;
      state.ruleGroup[parentIndex][childIndex]["criteria"] = valueToUpdate;
      return state;
    //   return {
    //     ...state,
    //     ruleGroup: state.ruleGroup.map((list, index) => {
    //       if (parentIndex === index) {
    //         return list.map((item, index) => {
    //           if (childIndex === index) {
    //             return { ...item, criteria: valueToUpdate };
    //           }
    //           return { ...item };
    //         });
    //       }
    //       return [...list];
    //     }),
    //   };

    case UPDATE_FIELD:
      valueToUpdate = action.payload.fieldValue;
      parentIndex = action.payload.parentIndex;
      childIndex = action.payload.childIndex;
      state.ruleGroup[parentIndex][childIndex]["field"] = valueToUpdate;
      return state;
    //   return {
    //     ...state,
    //     ruleGroup: state.ruleGroup.map((list, index) => {
    //       if (parentIndex === index) {
    //         return list.map((item, index) => {
    //           if (childIndex === index) {
    //             return { ...item, field: valueToUpdate };
    //           }
    //           return { ...item };
    //         });
    //       }
    //       return [...list];
    //     }),
    //   };
    case ADD_TOGGLE_STATE:
      return {
        ...state,
        toggleState: state.toggleState.concat(true),
      };

    case REMOVE_TOGGLE_STATE:
      parentIndex = action.payload.parentIndex;
      return {
        ...state,
        toggleState: state.toggleState.filter((item, index) => {
          return parentIndex !== index;
        }),
      };

    case UPDATE_TOGGLE_STATE:
      parentIndex = action.payload.parentIndex;
      valueToUpdate = action.payload.tValue;
      state.toggleState[parentIndex] = valueToUpdate;
      return state;

    case UPDATE_QUERY_LIST:
      let res = queryBuilder(state.ruleGroup, state.toggleState);
      return {
        ...state,
        queryList: res,
      };
    default:
      return state;
  }
};

export default reducer;
