import React, { useEffect } from "react";
import { connect } from "react-redux";
import RuleGroup from "./RuleGroup.js";
import {
  AddRuleGroupButton,
  FinalContainer,
  ListAllQueryButton,
  ConcatenateAllQueryButton,
  MainEmptyContainer,
  Note,
} from "./RuleGroup.style.js";
import {
  addNewRuleGroupToDisplayList,
  addNewRuleGroupToRuleGroupList,
  addToggleState,
  updateQueryList,
} from "../redux";
import QueryDisplay from "./QueryDisplay.js";
const handleAddRuledGroupButton = (
  addRuleToDSList,
  addRuleToRGList,
  addTState,
  updateQList
) => {
  addRuleToDSList();
  addRuleToRGList();
  addTState();
  updateQList();
};

const handleListQueries = (queryList) => {
  navigator.clipboard.writeText(queryList);
};

const handleConcatenatedQueries = (queryList) => {
  const concatenatedString = queryList.join("");
  navigator.clipboard.writeText(concatenatedString);
};

const Main = ({
  displayList,
  addRuleGroupToDSList,
  addRuleGroupToRGList,
  ruleGroup,
  addTState,
  toggleState,
  updateQList,
  queryList,
}) => {
  useEffect(() => {
    updateQList();
  }, []);
  return (
    <MainEmptyContainer>
      <QueryDisplay />
      {displayList.map((item, index) => {
        let numberOfRules = item;
        let showDeleteRuleGroupBtn = true;
        if (index === 0) {
          showDeleteRuleGroupBtn = false;
        }
        let number = Math.random();
        number = number.toFixed(2);
        return (
          <React.Fragment>
            <RuleGroup
              key={`${item}_${number}`}
              numberOfRules={numberOfRules}
              parentIndex={index}
              ruleGroup={ruleGroup}
              toggleState={toggleState}
            />
          </React.Fragment>
        );
      })}
      <MainEmptyContainer>
        <AddRuleGroupButton
          onClick={(e) =>
            handleAddRuledGroupButton(
              addRuleGroupToDSList,
              addRuleGroupToRGList,
              addTState,
              updateQList
            )
          }
        >
          + Add new group filter
        </AddRuleGroupButton>
      </MainEmptyContainer>
      <FinalContainer>
        <ListAllQueryButton onClick={() => handleListQueries(queryList)}>
          Get List of Queries!
        </ListAllQueryButton>
        <ConcatenateAllQueryButton
          onClick={() => handleConcatenatedQueries(queryList)}
        >
          Get Concatenated Queries!
        </ConcatenateAllQueryButton>
      </FinalContainer>
      <Note>
        Note: The "Get List Of Queries!" button will copy to clipboard the array
        of queries(like queries displayed in banner). The "Get Contcatenated
        Queries!" button will concate the list of queries and copy the values to
        clipboard. After clicking either of the button open browser console or
        tab and press 'Ctrl + V'.{" "}
      </Note>
    </MainEmptyContainer>
  );
};
const mapStateToProps = (state) => {
  return {
    displayList: state.main.displayList,
    ruleGroup: state.main.ruleGroup,
    toggleState: state.main.toggleState,
    queryList: state.main.queryList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRuleGroupToDSList: () => dispatch(addNewRuleGroupToDisplayList()),
    addRuleGroupToRGList: () => dispatch(addNewRuleGroupToRuleGroupList()),
    addTState: () => dispatch(addToggleState()),
    updateQList: () => dispatch(updateQueryList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
