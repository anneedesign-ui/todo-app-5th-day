import React, { useState } from "react";

// 명언 배열
const quotes = [
  "시작이 반이다. - 아리스토텔레스",
  "한 번의 실패와 영원한 실패를 혼동하지 마라. - F. Scott Fitzgerald",
  "행동 없는 비전은 꿈에 불과하다. - Joel Barker",
];

function QuoteComponent() {
  // 현재 명언 인덱스 state(스테이트)
  const [idx, setIdx] = useState(Math.floor(Math.random() * quotes.length));
  // 새 명언 표시 함수
  const handleNewQuote = () =>
    setIdx(Math.floor(Math.random() * quotes.length));

  return (
    <div className="quote-area">
      <div>{quotes[idx]}</div>
      <button onClick={handleNewQuote}>다른 명언 보기</button>
    </div>
  );
}
export default QuoteComponent;
