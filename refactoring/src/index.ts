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

function statement(invoice: Invoice, plays: PlaysObj) {
  const statementData: any = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances;
  return renderPlainText(statementData, plays);
}
function renderPlainText(data: any, plays: PlaysObj) {
  let result = `청구 내역 (고객명 : ${data.customer})\n`;

  for (let pref of data.performances) {
    result += `${playFor(pref).name}: ${usd(amountFor(pref) / 100)} (${
      pref.audience
    }석)`;
  }
  result += `총액: ${usd(totalAmount() / 100)}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function totalAmount() {
    let result = 0;
    for (let pref of data.performances) {
      result += amountFor(pref);
    }
    return result;
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let pref of data.performances) {
      result += volumeCreditsFor(pref);
    }
    return result;
  }

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function volumeCreditsFor(pref: Performance) {
    let result = 0;
    result += Math.max(pref.audience - 30, 0);
    if ("comedy" === playFor(pref).type)
      result += Math.floor(pref.audience / 5);
    return result;
  }

  function playFor(pref: Performance) {
    return (plays as unknown as PlaysObj)[pref.playID];
  }

  function amountFor(aPeformance: Performance) {
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
  }
}

console.log(
  statement(
    invoiceData[0] as unknown as Invoice,
    playsData as unknown as PlaysObj
  )
);
