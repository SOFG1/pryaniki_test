import React from "react";
import { BrowserRouter } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
