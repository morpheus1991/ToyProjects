import invoiceData from "./jsonData/invoices.json";
import playsData from "./jsonData/plays.json";

console.log("hello");
type PlayIds = "hamlet" | "asLike" | "othello";

type Performances = {
  playID: PlayIds;
  audience: number;
};
type Invoice = {
  customer: string;
  performances: Performances[];
};

type PlaysObj = {
  [key in PlayIds]: {
    name: "Hamlet" | "As You Like It" | "Othello";
    type: "comedy" | "tragedy";
  };
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
      let thisAmount = 0;

      switch (play.type) {
        case "tragedy": //비극
          thisAmount = 40000;
          if (pref.audience > 30) {
            thisAmount += 1000 * (pref.audience - 30);
          }
          break;

        case "comedy": //희극
          thisAmount = 30000;
          if (pref.audience > 20) {
            thisAmount += 10000 + 500 * (pref.audience - 20);
          }
          thisAmount += 300 * pref.audience;
          break;

        default:
          throw new Error(`알 수 없는 장르: ${play.type}`);
      }

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

console.log(
  statement(
    invoiceData[0] as unknown as Invoice,
    playsData as unknown as PlaysObj
  )
);
