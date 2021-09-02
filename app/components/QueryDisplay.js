import React from "react";
import {
  QueryDisplayContainer,
  QueryContentContainer,
  QueryTextContainer,
  QueryTextHeading,
  QueryText,
  Heading,
} from "./QueryDisplay.style";
import { connect } from "react-redux";

const QueryDisplay = ({ queryList }) => {
  return (
    <React.Fragment>
      <QueryDisplayContainer>
        <QueryContentContainer>
          <Heading>Build your query</Heading>
          {queryList.map((item, index) => {
            return (
              <QueryTextContainer>
                <QueryTextHeading>{`Query ${index + 1}`}</QueryTextHeading>
                <QueryText>{item}</QueryText>
              </QueryTextContainer>
            );
          })}
        </QueryContentContainer>
      </QueryDisplayContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    queryList: state.main.queryList,
  };
};

export default connect(mapStateToProps, null)(QueryDisplay);
