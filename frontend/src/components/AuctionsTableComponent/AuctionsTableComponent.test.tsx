import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { store } from "../../store/store";
import { AuctionsTableComponent } from "./AuctionsTableComponent";

it("renders correctly without bidding option limit 5", () => {
  const registerForm = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <AuctionsTableComponent
            filterOnly="current"
            expanded={false}
            limit={5}
          />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(registerForm).toMatchSnapshot();
});
