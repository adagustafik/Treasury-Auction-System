import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { store } from "../../store/store";
import { RegisterFormComponent } from "./RegisterFormComponent";

it("renders correctly for register page", () => {
  const registerForm = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterFormComponent page="register" />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(registerForm).toMatchSnapshot();
});
