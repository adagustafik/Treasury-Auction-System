import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { CreateNewAuctionForm } from "./CreateNewAuctionForm";

it("renders the CreatAuctionForm correctly", () => {
  const createAuctionForm = renderer
    .create(
      <BrowserRouter>
        <CreateNewAuctionForm />
      </BrowserRouter>
    )
    .toJSON();
  expect(createAuctionForm).toMatchSnapshot();
});
