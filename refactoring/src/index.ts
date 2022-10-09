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
  return renderPlainText(createStatementData(invoice, plays));

  function createStatementData(invoice: Invoice, plays: PlaysObj) {
    const statementData: Invoice & {
      performances: {
        play: {
          name: "Hamlet" | "As You Like It" | "Othello";
          type: "comedy" | "tragedy";
        } | null;
        playID: PlayIds;
        audience: number;
        amount: number | null;
        volumeCredits: number | null;
      }[];
      totalAmount: number | null;
      totalVolumeCredits: number | null;
    } = {
      customer: "",
      performances: [],
      totalAmount: 0,
      totalVolumeCredits: 0,
    };
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;
  }

  function enrichPerformance(aPeformance: Performance) {
    // 책에서는 이렇게 함 const result = Object.assign({}, aPeformance);
    const result: {
      play: {
        name: "Hamlet" | "As You Like It" | "Othello";
        type: "comedy" | "tragedy";
      } | null;
      playID: PlayIds;
      audience: number;
      amount: number | null;
      volumeCredits: number | null;
    } = { ...aPeformance, play: null, amount: null, volumeCredits: null };
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }
  function playFor(pref: Performance) {
    return (plays as unknown as PlaysObj)[pref.playID];
  }
  function amountFor(aPeformance: {
    play: {
      name: "Hamlet" | "As You Like It" | "Othello";
      type: "comedy" | "tragedy";
    } | null;
    playID: PlayIds;
    audience: number;
    amount: number | null;
    volumeCredits: number | null;
  }) {
    let thisAmount = 0;
    if (!aPeformance.play) throw Error("check performances play");
    switch (aPeformance.play.type) {
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
        throw new Error(`알 수 없는 장르: ${aPeformance.play.type}`);
    }
    return thisAmount;
  }
  function volumeCreditsFor(aPeformance: {
    play: {
      name: "Hamlet" | "As You Like It" | "Othello";
      type: "comedy" | "tragedy";
    } | null;
    playID: PlayIds;
    audience: number;
    amount: number | null;
    volumeCredits: number | null;
  }) {
    let result = 0;
    result += Math.max(aPeformance.audience - 30, 0);
    if ("comedy" === aPeformance.play?.type)
      result += Math.floor(aPeformance.audience / 5);
    return result;
  }
  function totalAmount(data: {
    customer: string;
    performances: {
      play: {
        name: "Hamlet" | "As You Like It" | "Othello";
        type: "comedy" | "tragedy";
      } | null;
      playID: PlayIds;
      audience: number;
      amount: number | null;
      volumeCredits: number | null;
    }[];
    totalAmount: number | null;
  }) {
    return data.performances.reduce((total, c) => {
      if (c.amount) {
        return total + c.amount;
      }
      throw Error("performances amount is null");
    }, 0);
  }
  function totalVolumeCredits(data: {
    customer: string;
    performances: {
      play: {
        name: "Hamlet" | "As You Like It" | "Othello";
        type: "comedy" | "tragedy";
      } | null;
      playID: PlayIds;
      audience: number;
      amount: number | null;
      volumeCredits: number | null;
    }[];
    totalAmount: number | null;
  }) {
    return data.performances.reduce((total, c) => {
      if (!c.volumeCredits) throw Error("performances volumeCredits is null");
      return total + c.volumeCredits;
    }, 0);
  }
}
function renderPlainText(
  data: Invoice & {
    performances: {
      play: {
        name: "Hamlet" | "As You Like It" | "Othello";
        type: "comedy" | "tragedy";
      } | null;
      playID: PlayIds;
      audience: number;
      amount: number | null;
      volumeCredits: number | null;
    }[];
    totalAmount: number | null;
    totalVolumeCredits: number | null;
  }
) {
  let result = `청구 내역 (고객명 : ${data.customer})\n`;

  for (let pref of data.performances) {
    if (!pref.play) throw Error("check performances play");
    if (!pref.amount) throw Error("check performances amount");

    result += `${pref.play.name}: ${usd(pref.amount)} (${pref.audience}석)`;
  }
  if (!data.totalAmount) throw Error("check totalAmount");
  if (!data.totalVolumeCredits) throw Error("check totalVolumeCredits");

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}

console.log(
  statement(
    invoiceData[0] as unknown as Invoice,
    playsData as unknown as PlaysObj
  )
);
