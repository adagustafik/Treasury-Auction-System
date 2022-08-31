import React from "react";
import { Table } from "react-bootstrap";
import { Bid } from "../../api/getBidsRequest";
import {
  dateConversionToString,
  filterCurrent,
  filterHistory,
} from "../../utilities";
import { useAppSelector } from "../../store/hooks";
import { selectBids } from "../../store/selectors";
import { BidsTableProp } from "./types";

export function BidsTableComponent({ filterOnly, limit = 100 }: BidsTableProp) {
  const { bids } = useAppSelector(selectBids);

  let bidsTop: Bid[] = [];

  if (bids.length > 0) {
    const bidsFiltered: Bid[] = bids.filter((bid: Bid) =>
      filterOnly === "history"
        ? filterHistory(bid.auction)
        : filterCurrent(bid.auction)
    );
    bidsTop = bidsFiltered.slice(0, limit);
  }

  return (
    <>
      {bidsTop.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Auction date</th>
              <th>Closing time</th>
              <th>Issue amount</th>
              <th>Bid id</th>
              <th>Bid date</th>
              <th>Bid type</th>
              <th>Bid amount</th>
              <th>Bid rate</th>
              <th>Yield</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {bidsTop.map((bid: Bid) => (
              <tr key={bid.bidId}>
                <td>{bid.auction.auctionId}</td>
                <td>{dateConversionToString(bid.auction.auctionDate)}</td>
                {bid.type === "comp" && (
                  <td>
                    {dateConversionToString(
                      bid.auction.competitiveBidCloseTime
                    )}
                  </td>
                )}
                {bid.type === "noncomp" && (
                  <td>
                    {dateConversionToString(
                      bid.auction.nonCompetitiveBidCloseTime
                    )}
                  </td>
                )}
                <td>{bid.auction.securityOffered}</td>
                <td>{bid.bidId}</td>
                <td>{dateConversionToString(bid.time)}</td>
                <td>
                  {bid.type === "comp" ? "competitive" : "non-competitive"}
                </td>
                <td>{bid.amount}</td>
                <td>{bid.rate === 0 ? "" : bid.rate}</td>
                <td>{bid.auction.yield}</td>
                <td>{bid.auction.discount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {bidsTop.length === 0 && <p>There were no bids made</p>}
    </>
  );
}
