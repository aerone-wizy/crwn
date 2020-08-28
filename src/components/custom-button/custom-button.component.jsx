import React from "react";

// import "./custom-buttom.styles.scss";

import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({ children, props, onClick }) => (
  <CustomButtonContainer {...props} onClick={onClick}>
    {children}
  </CustomButtonContainer>
);

export default CustomButton;
