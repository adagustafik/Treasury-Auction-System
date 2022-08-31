import { Auction } from "../api";
import { dateConversionToNumber } from "./dateConversion";

const today = new Date();
const todayNum = today.getTime();

export const compareCloseTimes = (auction: Auction) => {
  const closeComp = dateConversionToNumber(auction.competitiveBidCloseTime);
  const closeNonComp = dateConversionToNumber(
    auction.nonCompetitiveBidCloseTime
  );
  return closeComp > closeNonComp ? closeComp : closeNonComp;
};

export const filterCurrent = (auction: Auction): boolean => {
  const date = compareCloseTimes(auction);
  return date > todayNum;
};

export const filterHistory = (auction: Auction): boolean => {
  const date = compareCloseTimes(auction);
  return date <= todayNum;
};

export const filterRunning = (auction: Auction): boolean => {
  const close = compareCloseTimes(auction);
  const start = dateConversionToNumber(auction.auctionDate);
  return start < todayNum && close > todayNum;
};

export const compareCloseTimesToDate = (auction: Auction) => {
  const closeTime = compareCloseTimes(auction);
  const date = new Date(closeTime);
  return date.toLocaleTimeString([], {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
