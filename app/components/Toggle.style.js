import styled from "@emotion/styled";
import { css } from "@emotion/css";

export const AndButton = styled("button")`
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border: 1px solid #404348;
  border-radius: 4px;
  width: 50px;
  height: 30px;
  border-right: none;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  font-size: 14px;
`;

export const OrButton = styled("button")`
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border: 1px solid #404348;
  border-radius: 4px;
  width: 50px;
  height: 30px;
  border-left: none;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  font-size: 14px;
`;

export const SelectedState = css`
  background-color: #5c61f0 !important;
`;

export const ToggleContainer = styled("div")`
  margin-bottom: 30px;
`;
