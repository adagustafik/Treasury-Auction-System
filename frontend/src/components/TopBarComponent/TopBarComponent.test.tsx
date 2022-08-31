import { Provider } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";
import renderer from "react-test-renderer";
import { store } from "../../store/store";
import { TopBarComponent } from "./TopBarComponent";

it("renders correctly without props", () => {
  const registerForm = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <TopBarComponent />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(registerForm).toMatchSnapshot();
});

it("renders correctly with Link node to login", () => {
  const registerFormLogin = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <TopBarComponent>
            <Link to="/login">LOGIN</Link>
          </TopBarComponent>
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(registerFormLogin).toMatchSnapshot();
});
