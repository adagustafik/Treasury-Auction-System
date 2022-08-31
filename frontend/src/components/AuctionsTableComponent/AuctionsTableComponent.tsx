import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Accordion, Button, Form, Modal, Table } from "react-bootstrap";
import { Auction } from "../../api/getAuctionsRequest";
import {
  compareCloseTimesToDate,
  dateConversionToString,
  filterCurrent,
  filterHistory,
  filterRunning,
} from "../../utilities";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAuctions, selectUser } from "../../store/selectors";
import { AuctionTableProp, BidTypeState } from "./types";
import "./style.sass";
import { PurchasesTableComponent } from "../PurchasesTableComponent";
import { fetchNewBid } from "../../api/newBidRequest";
import { fetchBidsData } from "../../store/slices/bids";

export function AuctionsTableComponent({
  filterOnly,
  expanded,
  limit = 100,
}: AuctionTableProp) {
  const { auctions } = useAppSelector(selectAuctions);

  let auctionsTop: Auction[] = [];

  if (auctions.length > 0) {
    const auctionsCurrent = auctions.filter((auction: Auction) =>
      filterOnly === "history" ? filterHistory(auction) : filterCurrent(auction)
    );
    auctionsTop = auctionsCurrent.slice(0, limit);
  }

  const { admin } = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [bidType, setBidType] = useState<BidTypeState>({
    bidtype: "noncomp",
    selected: false,
  });
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [auctionId, setAuctionId] = useState(0);

  const handleBidShow = () => {
    setShow(true);
  };

  const handleBidHide = () => {
    setShow(false);
  };

  function validationOutsideOfForm(): boolean {
    if (bidType.selected === false || amount <= 0) {
      toast("Please, fill out all required fields.");
      return false;
    }
    if (bidType.bidtype === "comp" && rate <= 0) {
      toast("Rete is required for competitive bids");
      return false;
    }
    return true;
  }

  const handleBidSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
    if (validationOutsideOfForm()) {
      const date = new Date();
      const body = {
        time: date.toISOString(),
        type: bidType.bidtype,
        amount,
        rate,
        auctionid: auctionId,
      };
      fetchNewBid(body)
        .then((res) => {
          if (res.success) {
            handleBidHide();
            dispatch(fetchBidsData);
            navigate("/bids");
            toast(res.success);
          }
        })
        .catch((err) => {
          toast(err.message);
        });
    }
  };

  return (
    <>
      {auctionsTop.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Auction date</th>
              <th>Closing time</th>
              <th>Issue amount</th>
              <th>Issue date</th>
              <th>Maturity date</th>
              <th>Terms</th>
              <th>Yield</th>
              <th>Rate</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {auctionsTop.map((auction: Auction) => (
              <React.Fragment key={auction.auctionId}>
                <tr>
                  <td>{auction.auctionId}</td>
                  <td>{dateConversionToString(auction.auctionDate)}</td>
                  <td>{compareCloseTimesToDate(auction)}</td>
                  <td>{auction.securityOffered}</td>
                  <td>{dateConversionToString(auction.issueDate)}</td>
                  <td>{dateConversionToString(auction.maturityDate)}</td>
                  <td>{auction.termsAndConditions}</td>
                  <td>{auction.yield}</td>
                  <td>{auction.rate}</td>
                  <td>{auction.discount}</td>
                </tr>
                {expanded === true &&
                  admin === false &&
                  filterRunning(auction) && (
                    <tr>
                      <td colSpan={11}>
                        <Button className="bid-button" onClick={handleBidShow}>
                          Bid now
                        </Button>
                        <Modal
                          size="lg"
                          show={show}
                          onHide={handleBidHide}
                          backdrop="static"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Place your bid before the auction closing time
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form
                              validated={validated}
                              onSubmit={handleBidSubmit}
                            >
                              <h5>SELECT YOUR BID TYPE</h5>
                              <Form.Check
                                required
                                inline
                                type="radio"
                                name="bidType"
                                label="non-competitive"
                                value="noncomp"
                                onChange={() =>
                                  setBidType({
                                    bidtype: "noncomp",
                                    selected: true,
                                  })
                                }
                              />
                              <Form.Check
                                required
                                inline
                                type="radio"
                                name="bidType"
                                label="competitive"
                                value="comp"
                                onChange={() =>
                                  setBidType({
                                    bidtype: "comp",
                                    selected: true,
                                  })
                                }
                              />
                              <h5>BID AMOUNT</h5>
                              <Form.Control
                                required
                                type="number"
                                min="1"
                                value={amount}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setAmount(Number(event.target.value));
                                  setAuctionId(auction.auctionId);
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Bidding amount is required
                              </Form.Control.Feedback>
                              {bidType.bidtype === "comp" && (
                                <>
                                  <h5>BID RATE</h5>
                                  <Form.Control
                                    required
                                    type="number"
                                    min={auction.rate}
                                    value={rate}
                                    onChange={(
                                      event: React.ChangeEvent<HTMLInputElement>
                                    ) => setRate(Number(event.target.value))}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Bidding rate is required at minimum of
                                    Auction rate
                                  </Form.Control.Feedback>
                                </>
                              )}
                              <Button type="submit" className="bid-button">
                                BID NOW
                              </Button>
                            </Form>
                          </Modal.Body>
                        </Modal>
                      </td>
                    </tr>
                  )}

                {expanded === true && auction.resolved === true && (
                  <tr>
                    <td colSpan={11}>
                      <Accordion>
                        <Accordion.Header>Auction Resolution</Accordion.Header>
                        <Accordion.Body>
                          <PurchasesTableComponent
                            filterBy="auction"
                            auctionId={auction.auctionId}
                          />
                        </Accordion.Body>
                      </Accordion>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      )}
      {auctionsTop.length === 0 && (
        <p>There are currently no auctions to display</p>
      )}
    </>
  );
}
