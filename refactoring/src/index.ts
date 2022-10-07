import invoiceData from "./jsonData/invoices.json";
import playsData from "./jsonData/plays.json";

console.log("hello");
type PlayIds = "hamlet" | "asLike" | "othello";

type Performance = {
  playID: PlayIds;
  audience: number;
};
type Invoice = {
  customer: string;
  performances: Performance[];
};

type PlaysObj = {
  [key in PlayIds]: {
    name: "Hamlet" | "As You Like It" | "Othello";
    type: "comedy" | "tragedy";
  };
};

const amountFor = (
  aPerformance: Performance,
  play: {
    name: "Hamlet" | "As You Like It" | "Othello";
    type: "comedy" | "tragedy";
  }
) => {
  let result = 0;
  switch (play.type) {
    case "tragedy": //비극
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;

    case "comedy": //희극
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;

    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }
  return result;
};

function statement(invoice: Invoice, plays: PlaysObj) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명 : ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let pref of invoice.performances) {
    if (typeof pref.playID === "string") {
      const play = plays[pref.playID];
      let thisAmount = amountFor(pref, play);

      console.log(play.name, "===");
      // 포인트를 적립한다.
      volumeCredits += Math.max(pref.audience - 30, 0);
      if ("comedy" === play.type)
        volumeCredits += Math.floor(pref.audience / 5);
      result += `${play.name}: ${format(thisAmount / 100)} (${
        pref.audience
      }석)`;
      totalAmount += thisAmount;
      result += `총액: ${format(totalAmount / 100)}\n`;
      result += `적립 포인트: ${volumeCredits}점\n`;
      return result;
    }
  }
}

console.log(playsData, "----");

console.log(
  statement(
    invoiceData[0] as unknown as Invoice,
    playsData as unknown as PlaysObj
  )
);
