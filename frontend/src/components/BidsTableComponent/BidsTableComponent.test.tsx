import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { store } from "../../store/store";
import { BidsTableComponent } from "./BidsTableComponent";

it("renders correctly with filter function prop", () => {
  const registerForm = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <BidsTableComponent filterOnly={"current"} />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(registerForm).toMatchSnapshot();
});
