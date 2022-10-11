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
}
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}
function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1> \n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th>";
  for (let pref of data.performances) {
    result += `<tr><td>${pref.play.name}</td><td>(${pref.audience}석)</td></tr>`;
    result += `<td>${usd(pref.amount)}</td>\n`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
  return result;
}
function usd(aNumber) {
  return new Intl.NumberFormat("un-Us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
console.log(statement(invoiceData[0], playsData));

class performanceCalculator {
  performance;
  constructor(aPerformance) {
    this.performance = aPerformance;
  }
}
