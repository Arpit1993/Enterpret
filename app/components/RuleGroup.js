import React from "react";
import { connect } from "react-redux";
import Rule from "./Rule.js";
import {
  AddFilterButton,
  RuleGroupContainer,
  DeleteRuleGroupButton,
  EmptyContainer,
} from "./RuleGroup.style.js";
import ToggleButtons from "./Toggle.js";
import {
  addFilterToDisplayList,
  addFilterToRuleGroupList,
  updateQueryList,
  deleteRuleGroupDisplayList,
  deleteRuleGroup,
  removeToggleState,
} from "../redux";

const handleAddFilter = (
  parentIndex,
  addFilterToDS,
  addFilterToRG,
  updateQList
) => {
  addFilterToRG({ parentIndex });
  addFilterToDS({ parentIndex });
  updateQList();
};

const handleDeleteRuleGroupButton = (
  parentIndex,
  deleteRuleGrpToDSList,
  deleteRuleGrp,
  removeTState,
  updateQList
) => {
  deleteRuleGrp({ parentIndex });
  deleteRuleGrpToDSList({ parentIndex });
  removeTState({ parentIndex });
  updateQList();
};

const RuleGroup = ({
  numberOfRules,
  parentIndex,
  addFilterToDS,
  addFilterToRG,
  ruleGroup,
  toggleState,
  updateQList,
  deleteRuleGrpToDSList,
  deleteRuleGrp,
  removeTState,
}) => {
  let showDeleteRuleGroupBtn = true;
  if (parentIndex === 0) {
    showDeleteRuleGroupBtn = false;
  }
  return (
    <React.Fragment>
      <RuleGroupContainer>
        <EmptyContainer>
          {showDeleteRuleGroupBtn && (
            <DeleteRuleGroupButton
              onClick={() =>
                handleDeleteRuleGroupButton(
                  parentIndex,
                  deleteRuleGrpToDSList,
                  deleteRuleGrp,
                  removeTState,
                  updateQList
                )
              }
            >
              <i className={"fa fa-trash"}></i>
            </DeleteRuleGroupButton>
          )}
        </EmptyContainer>

        <div>
          <ToggleButtons
            parentIndex={parentIndex}
            toggleState={toggleState[parentIndex]}
          />
        </div>

        {numberOfRules.map((item, index) => {
          let showButton = index === 0 ? false : true;
          let number = Math.random();
          number = number.toFixed(2);
          return (
            <div>
              <Rule
                key={`${item}_${number}`}
                showButton={showButton}
                parentIndex={parentIndex}
                childIndex={index}
                ruleGroup={ruleGroup}
              />{" "}
            </div>
          );
        })}

        <div>
          <AddFilterButton
            onClick={() =>
              handleAddFilter(
                parentIndex,
                addFilterToDS,
                addFilterToRG,
                updateQList
              )
            }
          >
            + Add Filter
          </AddFilterButton>{" "}
        </div>
      </RuleGroupContainer>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFilterToDS: (payload) => dispatch(addFilterToDisplayList(payload)),
    addFilterToRG: (payload) => dispatch(addFilterToRuleGroupList(payload)),
    deleteRuleGrpToDSList: (parentIndex) =>
      dispatch(deleteRuleGroupDisplayList(parentIndex)),
    deleteRuleGrp: (parentIndex) => dispatch(deleteRuleGroup(parentIndex)),
    removeTState: (parentIndex) => dispatch(removeToggleState(parentIndex)),
    updateQList: () => dispatch(updateQueryList()),
  };
};

export default connect(null, mapDispatchToProps)(RuleGroup);
