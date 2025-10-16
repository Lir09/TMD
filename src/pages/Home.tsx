import { useState } from "react";

interface Room {
  id: number;
  title: string;
  time: string;
  isReserved: boolean;
}

function Home() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, title: "멀티 1실", time: "16:40 ~ 21:00", isReserved: false },
    { id: 2, title: "멀티 2실", time: "16:40 ~ 21:00", isReserved: false },
    { id: 3, title: "멀티 3실", time: "16:40 ~ 21:00", isReserved: false },
    { id: 4, title: "프로젝트 1실", time: "16:40 ~ 21:00", isReserved: false },
    { id: 5, title: "프로젝트 2실", time: "16:40 ~ 21:00", isReserved: false },
  ]);

  const [isLocked, setIsLocked] = useState(false); // 틀렸을 때 잠금 상태
  const [lockTime, setLockTime] = useState(0); // 남은 시간 표시용

  const toggleReserve = (id: number) => {
    if (isLocked) {
      alert(`❌ 예약이 잠겨 있습니다. ${lockTime}초 후 다시 시도하세요.`);
      return;
    }

    const correctId = 4; // ✅ 정답: 프로젝트 1실

    if (id === correctId) {
      alert("🎉 정답! 비밀번호는 대전대신고등학교 개교기념일...");
      setRooms((prev) =>
        prev.map((room) =>
          room.id === id ? { ...room, isReserved: !room.isReserved } : room
        )
      );
    } else {
      alert("❌ 틀렸습니다! 20초 동안 예약이 불가능합니다.");
      setIsLocked(true);
      setLockTime(20);

      // 1초마다 남은 시간 감소
      const interval = setInterval(() => {
        setLockTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsLocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>특별실 예약 시스템</h1>
      {isLocked && (
        <div style={styles.lockNotice}>
          🚫 잘못된 예약 시도! {lockTime}초 동안 예약이 불가능합니다.
        </div>
      )}

      <div style={styles.container}>
        {rooms.map((room) => (
          <div
            key={room.id}
            style={{
              ...styles.card,
              backgroundColor: room.isReserved ? "#e8f5e9" : "#fff",
              borderColor: room.isReserved ? "#4caf50" : "#ccc",
              opacity: isLocked && !room.isReserved ? 0.6 : 1,
              pointerEvents: isLocked ? "none" : "auto",
            }}
          >
            <div>
              <div style={styles.roomTitle}>{room.title}</div>
              <div style={styles.roomTime}>{room.time}</div>
            </div>

            <button
              style={{
                ...styles.button,
                backgroundColor: room.isReserved ? "#f44336" : "#4caf50",
              }}
              onClick={() => toggleReserve(room.id)}
            >
              {room.isReserved ? "취소" : "예약"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: "Noto Sans KR, sans-serif",
    background: "linear-gradient(180deg, #f0f8ff, #e3f2fd)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#1565c0",
  },
  lockNotice: {
    color: "#f44336",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "460px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "2px solid #ccc",
    borderRadius: "12px",
    padding: "18px 24px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
    transition: "0.2s all ease",
  },
  roomTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  roomTime: {
    fontSize: "0.9rem",
    color: "#555",
    marginTop: "4px",
  },
  button: {
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    marginLeft: "16px",
    height: "40px",
    alignSelf: "center",
    transition: "0.2s all ease",
  },
};
