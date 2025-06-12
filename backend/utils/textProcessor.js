export function extractQuestionsFromText(examRaw, answerRaw) {
  const text = examRaw
    .replace(/-\r?\n\s*/g, "")
    .replace(/\r?\n/g, "\n")
    .trim();

  const answerMap = {};
  for (const m of answerRaw.matchAll(/(\d{1,2})\s*[-–—:]?\s*([A-Ea-e])/g)) {
    answerMap[m[1].padStart(2, "0")] = m[2].toUpperCase();
  }

  const parts = text.split(/\n(?=\d{1,2}\.)/);
  const questions = [];

  for (let block of parts) {
    const qm = block.match(/^(\d{1,2})\.\s*/);
    if (!qm) continue;
    const number = qm[1].padStart(2, "0");
    block = block.slice(qm[0].length).trim();

    const iA = block.indexOf("(A)");
    const statement = block
      .slice(0, iA > -1 ? iA : undefined)
      .replace(/\s+/g, " ")
      .trim();

    const choices = {};
    const labels = ["A", "B", "C", "D", "E"];
    for (let i = 0; i < labels.length; i++) {
      const lab = labels[i];
      const tag = `(${lab})`;
      const start = block.indexOf(tag);
      if (start === -1) continue;
      const nextTag = labels[i + 1] ? `(${labels[i + 1]})` : null;
      const end = nextTag ? block.indexOf(nextTag, start + 1) : block.length;
      let txt = block
        .slice(start + tag.length, end > -1 ? end : undefined)
        .replace(/\s+/g, " ")
        .trim();
      const dotPos = txt.indexOf(".");
      if (dotPos > -1) txt = txt.slice(0, dotPos + 1);
      choices[lab] = txt;
    }

    questions.push({
      number,
      statement,
      choices,
      answer_key: answerMap[number] || null,
    });
  }

  questions.sort((a, b) => parseInt(a.number) - parseInt(b.number));
  return questions;
}