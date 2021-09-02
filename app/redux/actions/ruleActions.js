import {
  UPDATE_CONDITION,
  UPDATE_CRITERIA,
  UPDATE_FIELD,
} from "../reducers/ruleTypes";


export const updateConditionInRG = (payload) => {
    return {
        type: UPDATE_CONDITION,
        payload
    }
}
export const updateCriteriaInRG = (payload) => {
    return {
        type: UPDATE_CRITERIA,
        payload
    }
}

export const updateFieldInRG = (payload) => {
    return {
        type: UPDATE_FIELD,
        payload
    }
}