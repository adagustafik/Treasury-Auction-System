import React from "react";
import { Button, Form } from "react-bootstrap";
import "./style.sass";

export function CreateNewAuctionForm() {
  return (
    <div className="create-auction-form">
      <Form className="create-auction-container">
        <div className="create-auction-col">
          <Form.Label>Auctions date</Form.Label>
          <Form.Control type="date" />
          <Form.Label>Issue date</Form.Label>
          <Form.Control type="date" />
          <Form.Label>Maturity date</Form.Label>
          <Form.Control type="date" />
          <Form.Label>Non-competitive bid closing date</Form.Label>
          <Form.Control type="date" />
          <Form.Label>Competitive bid closing date</Form.Label>
          <Form.Control type="date" />
        </div>
        <div className="create-auction-col">
          <Form.Label>Amount offered</Form.Label>
          <Form.Control type="text" />
          <Form.Label>Rate</Form.Label>
          <Form.Control type="text" />
          <Form.Label>Yield</Form.Label>
          <Form.Control type="text" />
          <Form.Label>Discount margin</Form.Label>
          <Form.Control type="text" />
        </div>
        <div className="terms-and-submit-container">
          <Form.Label>Terms and conditions</Form.Label>
          <Form.Control as="textarea" placeholder="terms.." />
          <Button type="submit">Create auction</Button>
        </div>
      </Form>
    </div>
  );
}
