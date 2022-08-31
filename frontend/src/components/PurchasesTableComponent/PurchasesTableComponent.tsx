import React from "react";
import { Table } from "react-bootstrap";
import { Purchase } from "../../api";
import { useAppSelector } from "../../store/hooks";
import { selectPurchases, selectUser } from "../../store/selectors";
import { dateConversionToString } from "../../utilities";
import { PurchasesTableProp } from "./types";

export function PurchasesTableComponent({
  filterBy,
  auctionId,
}: PurchasesTableProp) {
  const { user } = useAppSelector(selectUser);
  const { purchases } = useAppSelector(selectPurchases);

  let purchasesFiltered: Purchase[] = [];

  if (purchases.length > 1) {
    purchasesFiltered = purchases.filter((purchase: Purchase) =>
      filterBy === "user"
        ? purchase.bid.user.userName === user
        : purchase.auction.auctionId === auctionId
    );
  }

  return (
    <>
      {purchasesFiltered.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Purchase Id</th>
              <th>Amount</th>
              <th>Final Rate</th>
              <th>Auction id</th>
              <th>Bid id</th>
              <th>Bid type</th>
              <th>Bid amount</th>
              <th>Bid rate</th>
              <th>Bid date</th>
            </tr>
          </thead>
          <tbody>
            {purchasesFiltered.map((purchase: Purchase) => (
              <tr key={purchase.purchaseId}>
                <td>{purchase.purchaseId}</td>
                <td>{purchase.amount}</td>
                <td>{purchase.rate}</td>
                <td>{purchase.auction.auctionId}</td>
                <td>{purchase.bid.bidId}</td>
                <td>
                  {purchase.bid.type === "comp"
                    ? "competitive"
                    : "non-competitive"}
                </td>
                <td>{purchase.bid.amount}</td>
                <td>{purchase.bid.rate}</td>
                <td>{dateConversionToString(purchase.bid.time)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {purchasesFiltered.length <= 0 && <p>There were no purchases made</p>}
    </>
  );
}
