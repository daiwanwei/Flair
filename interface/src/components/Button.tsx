import { Button } from "antd";
import styled from "styled-components";

export const BaseButton = styled(Button)`
  width: 100%;
  height: 100%;
  color: #000000;
  font-size: 21px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Space Grotesk", sans-serif;
  border-radius: 4px;
`;

export const PrimaryButton = styled(BaseButton)`
  border: 1px solid #fffd8c;
  background: #f0b90b;
  text-transform: none;
  font-family: "Work Sans", sans-serif;
`;
