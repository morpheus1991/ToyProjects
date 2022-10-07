import invoiceData from "./jsonData/invoices.json";
import playsData from "./jsonData/plays.json";

console.log("hello");
type PlayIds = "hamlet" | "as-like" | "othello";

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

const volumeCreditsFor = (pref: Performance) => {
  let volumeCredits = 0;
  volumeCredits += Math.max(pref.audience - 30, 0);
  if ("comedy" === playFor(pref).type)
    volumeCredits += Math.floor(pref.audience / 5);
  return volumeCredits;
};

const playFor = (pref: Performance) => {
  return (playsData as unknown as PlaysObj)[pref.playID];
};

const amountFor = (aPeformance: Performance) => {
  let thisAmount = 0;
  switch (playFor(aPeformance).type) {
    case "tragedy": //비극
      thisAmount = 40000;
      if (aPeformance.audience > 30) {
        thisAmount += 1000 * (aPeformance.audience - 30);
      }
      break;

    case "comedy": //희극
      thisAmount = 30000;
      if (aPeformance.audience > 20) {
        thisAmount += 10000 + 500 * (aPeformance.audience - 20);
      }
      thisAmount += 300 * aPeformance.audience;
      break;

    default:
      throw new Error(`알 수 없는 장르: ${playFor(aPeformance).type}`);
  }
  return thisAmount;
};

const usd = (aNumber: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
};

function statement(invoice: Invoice) {
  let totalAmount = 0;
  let result = `청구 내역 (고객명 : ${invoice.customer})\n`;

  for (let pref of invoice.performances) {
    //청구 내역을 출력한다.
    result += `${playFor(pref).name}: ${usd(amountFor(pref) / 100)} (${
      pref.audience
    }석)`;
  }
  let volumeCredits = 0;
  for (let pref of invoice.performances) {
    volumeCredits += volumeCreditsFor(pref);
  }
  result += `총액: ${usd(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

console.log(statement(invoiceData[0] as unknown as Invoice));
