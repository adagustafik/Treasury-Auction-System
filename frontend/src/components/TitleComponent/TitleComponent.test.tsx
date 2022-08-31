import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { TitleComponent } from "./TitleComponent";

it("renders the TitleComponent correctly", () => {
  const registerForm = renderer
    .create(
      <BrowserRouter>
        <TitleComponent pageTitle="A page Title" />
      </BrowserRouter>
    )
    .toJSON();
  expect(registerForm).toMatchSnapshot();
});
