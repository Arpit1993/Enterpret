import React, { useState } from "react";
import {
  AndButton,
  OrButton,
  SelectedState,
  ToggleContainer,
} from "./Toggle.style.js";
import { updateToggleState, updateQueryList } from "../redux";
import { connect } from "react-redux";

const handleAndClick = (
  parentIndex,
  setSelectAnd,
  updateTState,
  updateQList
) => {
  setSelectAnd(true);
  let tValue = true;
  updateTState({ parentIndex, tValue });
  updateQList();
};
const handleOrClick = (
  parentIndex,
  setSelectAnd,
  updateTState,
  updateQList
) => {
  setSelectAnd(false);
  let tValue = false;
  updateTState({ parentIndex, tValue });
  updateQList();
};
const ToggleButtons = ({
  parentIndex = 0,
  toggleState = true,
  updateTState,
  updateQList,
}) => {
  const [selectAnd, setSelectAnd] = useState(toggleState);
  return (
    <React.Fragment>
      <ToggleContainer>
        <AndButton
          className={selectAnd ? SelectedState : ""}
          onClick={() =>
            handleAndClick(parentIndex, setSelectAnd, updateTState, updateQList)
          }
        >
          AND
        </AndButton>
        <OrButton
          className={!selectAnd ? SelectedState : ""}
          onClick={() =>
            handleOrClick(parentIndex, setSelectAnd, updateTState, updateQList)
          }
        >
          OR
        </OrButton>
      </ToggleContainer>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTState: (payload) => dispatch(updateToggleState(payload)),
    updateQList: () => dispatch(updateQueryList()),
  };
};
export default connect(null, mapDispatchToProps)(ToggleButtons);
