import React, { useEffect, useRef } from "react";

function TimeDisplay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawClock() {
      ctx.clearRect(0, 0, 160, 160);

      // 시계 원
      ctx.beginPath();
      ctx.arc(80, 80, 70, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "#b0c4e7";
      ctx.lineWidth = 7;
      ctx.stroke();

      // 시
      for (let i = 0; i < 12; i++) {
        const angle = ((i * 30 - 90) * Math.PI) / 180;
        const x = 80 + Math.cos(angle) * 59;
        const y = 80 + Math.sin(angle) * 59;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
        ctx.fillStyle = "#295a9d";
        ctx.fill();
      }

      const now = new Date();
      const sec = now.getSeconds();
      const min = now.getMinutes();
      const hour = now.getHours() % 12;

      // 시침
      let angle = (((hour + min / 60) * 30 - 90) * Math.PI) / 180;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(80, 80);
      ctx.lineTo(80 + Math.cos(angle) * 35, 80 + Math.sin(angle) * 35);
      ctx.strokeStyle = "#19589e";
      ctx.lineWidth = 7;
      ctx.stroke();
      ctx.restore();

      // 분침
      angle = (((min + sec / 60) * 6 - 90) * Math.PI) / 180;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(80, 80);
      ctx.lineTo(80 + Math.cos(angle) * 48, 80 + Math.sin(angle) * 48);
      ctx.strokeStyle = "#3877c8";
      ctx.lineWidth = 4.4;
      ctx.stroke();
      ctx.restore();

      // 초침
      angle = ((sec * 6 - 90) * Math.PI) / 180;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(80, 80);
      ctx.lineTo(80 + Math.cos(angle) * 57, 80 + Math.sin(angle) * 57);
      ctx.strokeStyle = "#f47b28";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      // 중앙 동그라미
      ctx.beginPath();
      ctx.arc(80, 80, 4.5, 0, 2 * Math.PI);
      ctx.fillStyle = "#19589e";
      ctx.fill();
    }

    drawClock();
    const interval = setInterval(drawClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginBottom: "18px" }}>
      <canvas
        ref={canvasRef}
        width={160}
        height={160}
        style={{ display: "block", margin: "0 auto" }}
      />
    </div>
  );
}

export default TimeDisplay;
