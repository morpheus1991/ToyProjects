import createStatementData from "./createStatementData";
import invoiceData from "./jsonData/invoices.json";
import playsData from "./jsonData/plays.json";

function renderPlainText(data) {
  let result = `청구 내역 (고객명 : ${data.customer})\n`;
  for (const pref of data.performances) {
    result += ` ${pref.play.name}: ${usd(pref.amount)} (${pref.audience}석)\n `;
  }
  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점 \n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("un-Us", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

console.log(statement(invoiceData[0], playsData));
