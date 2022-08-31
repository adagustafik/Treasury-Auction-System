import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { store } from "../../store/store";
import { SideBarComponent } from "./SideBarComponent";

it("renders correctly the SideBar component with prop dashboard", () => {
  const sideBar = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <SideBarComponent page="dashboard" />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(sideBar).toMatchSnapshot();
});
