import pdf from "pdf-parse";

export async function extractQuestionsFromPDF(examBuffer, answerBuffer) {
  const examText = (await pdf(examBuffer)).text;
  const answerText = (await pdf(answerBuffer)).text;

  const answerMap = {};
  const answerRegex = /(\d{1,3})\s*[-–—]?\s*([ABCDE])/g;
  let match;
  while ((match = answerRegex.exec(answerText)) !== null) {
    answerMap[match[1]] = match[2];
  }

  const blockRegex =
    /(MATEM[ÁA]TICA|RACIOC[ÍI]NIO L[ÓO]GICO)[\s\S]*?(?=\n[A-ZÇ ]{3,}|$)/gi;
  const blocks = [...examText.matchAll(blockRegex)].map((b) => b[0]);
  const combinedText = blocks.join("\n");

  const questionRegex =
    /(\d{1,3})[).\-]\s+([\s\S]*?)(?=\n\d{1,3}[).\-]\s|\n*$)/g;
  const questions = [];

  while ((match = questionRegex.exec(combinedText)) !== null) {
    const number = match[1];
    const statement = match[2].replace(/\s+/g, " ").trim();
    const answer = answerMap[number];
    if (statement && answer) {
      questions.push({ number, statement, answer_key: answer });
    }
  }

  return questions;
}
