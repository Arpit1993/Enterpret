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
  UPDATE_QUERY_LIST
} from "../reducers/mainTypes";

export const addNewRuleGroupToDisplayList = () => {
  return {
    type: DISPLAY_LIST_ADD_NEW_RULE_GROUP,
  };
};

export const addNewRuleGroupToRuleGroupList = () => {
  return {
    type: ADD_NEW_RULE_GROUP,
  };
};

export const deleteRuleGroupDisplayList = (payload) => {
  return {
    type: DISPLAY_LIST_DELETE_SPECIFIC_RULE_GROUP,
    payload,
  };
};

export const deleteRuleGroup = (payload) => {
  return {
    type: DELETE_SPECIFIC_RULE_GROUP,
    payload,
  };
};

export const deleteSpecificRuleDisplayList = (payload) => {
  return {
    type: DISPLAY_LIST_DELETE_SPECIFIC_RULE,
    payload,
  };
};

export const deleteSpecificRuleRGList = (payload) => {
  return {
    type: DELETE_SPECIFIC_RULE_RULE_GROUP,
    payload,
  };
};

export const addFilterToDisplayList = (payload) => {
  return {
    type: DISPLAY_LIST_ADD_NEW_RULE,
    payload,
  };
};

export const addFilterToRuleGroupList = (payload) => {
  return {
    type: ADD_NEW_RULE_RULE_GROUP,
    payload,
  };
};

export const addToggleState = () => {
  return {
    type: ADD_TOGGLE_STATE
  };
};

export const removeToggleState = (payload) => {
  return {
    type: REMOVE_TOGGLE_STATE,
    payload,
  };
};

export const updateToggleState = (payload) => {
  return {
    type: UPDATE_TOGGLE_STATE,
    payload,
  };
};

export const updateQueryList = () => {
  return {
    type: UPDATE_QUERY_LIST
  }
}