import React from "react";
import { connect } from "react-redux";
import {
  Select,
  Button,
  SelectContainer,
  LabelText,
  EmptyContainer,
} from "./Rule.style.js";
import {
  updateConditionInRG,
  updateCriteriaInRG,
  updateFieldInRG,
} from "../redux/actions/ruleActions";
import {
  deleteSpecificRuleRGList,
  deleteSpecificRuleDisplayList,
  updateQueryList,
} from "../redux";

const handleRuleDeleteButton = (
  parentIndex,
  childIndex,
  deleteRuleDSPL,
  deleteRuleRGL,
  updateQList
) => {
  deleteRuleDSPL({ parentIndex, childIndex });
  deleteRuleRGL({ parentIndex, childIndex });
  updateQList();
};

const hanldeSelectChange = (
  e,
  typeToUpdate,
  parentIndex,
  childIndex,
  updateCondition,
  updateField,
  updateCriteria,
  updateQList
) => {
  switch (typeToUpdate) {
    case "field":
      let fieldValue = e.target.value;
      updateField({ fieldValue, parentIndex, childIndex });
      break;
    case "condition":
      let conditionValue = e.target.value;
      updateCondition({ conditionValue, parentIndex, childIndex });
      break;
    case "criteria":
      let criteriaValue = e.target.value;
      updateCriteria({ criteriaValue, parentIndex, childIndex });
      break;
  }
  updateQList();
};

const Rule = ({
  showButton = true,
  parentIndex,
  childIndex,
  fieldList,
  ruleGroup,
  conditionList,
  criteriaList,
  deleteRuleDSPL,
  deleteRuleRGL,
  updateCondition,
  updateField,
  updateCriteria,
  updateQList,
}) => {

  let fieldListLoaded = fieldList && fieldList.length;
  let conditionListLoaded = conditionList && conditionList.length;
  let criteriaListLoaded = criteriaList && criteriaList.length;

  return (
    <React.Fragment>
      <SelectContainer>
        <EmptyContainer>
          <LabelText>Field</LabelText>
          <Select
            onChange={(e) =>
              hanldeSelectChange(
                e,
                "field",
                parentIndex,
                childIndex,
                updateCondition,
                updateField,
                updateCriteria,
                updateQList
              )
            }
          >
            {fieldListLoaded &&
              fieldList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item}
                    selected={
                      ruleGroup[parentIndex][childIndex]["field"] === item
                    }
                  >
                    {item}
                  </option>
                );
              })}
          </Select>
        </EmptyContainer>
        <EmptyContainer>
          <LabelText>Condition</LabelText>
          <Select
            onChange={(e) =>
              hanldeSelectChange(
                e,
                "condition",
                parentIndex,
                childIndex,
                updateCondition,
                updateField,
                updateCriteria,
                updateQList
              )
            }
          >
            {conditionListLoaded &&
              conditionList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item}
                    selected={
                      ruleGroup[parentIndex][childIndex]["condition"] === item
                    }
                  >
                    {item}
                  </option>
                );
              })}
          </Select>
        </EmptyContainer>
        <EmptyContainer>
          <LabelText>Criteria</LabelText>
          <Select
            onChange={(e) =>
              hanldeSelectChange(
                e,
                "criteria",
                parentIndex,
                childIndex,
                updateCondition,
                updateField,
                updateCriteria,
                updateQList
              )
            }
          >
            {criteriaListLoaded &&
              criteriaList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item}
                    selected={
                      ruleGroup[parentIndex][childIndex]["criteria"] === item
                    }
                  >
                    {item}
                  </option>
                );
              })}
          </Select>
        </EmptyContainer>
        {showButton && (
          <Button
            onClick={() =>
              handleRuleDeleteButton(
                parentIndex,
                childIndex,
                deleteRuleDSPL,
                deleteRuleRGL,
                updateQList
              )
            }
            className={"btn"}
          >
            <i className={"fa fa-trash"}></i>
          </Button>
        )}
      </SelectContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    displayList: state.main.displayList,
    fieldList: state.rule.fieldList,
    conditionList: state.rule.conditionList,
    criteriaList: state.rule.criteriaList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCondition: (payload) => dispatch(updateConditionInRG(payload)),
    updateCriteria: (payload) => dispatch(updateCriteriaInRG(payload)),
    updateField: (payload) => dispatch(updateFieldInRG(payload)),
    deleteRuleDSPL: (payload) =>
      dispatch(deleteSpecificRuleDisplayList(payload)),
    deleteRuleRGL: (payload) => dispatch(deleteSpecificRuleRGList(payload)),
    updateQList: () => dispatch(updateQueryList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
