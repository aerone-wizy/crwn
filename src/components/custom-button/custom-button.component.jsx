import React from "react";

// import "./custom-buttom.styles.scss";

import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = (props) => (
  <CustomButtonContainer {...props}>{props.children}</CustomButtonContainer>
);

export default CustomButton;
