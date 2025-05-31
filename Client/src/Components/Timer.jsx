import { useEffect, useState } from "react";

export default function TimerSection() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [editstate, setEditstate] = useState({ field: null, value: "" });
  const [showTimeUp, setShowTimeUp] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setShowTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  function formatTime(totalSeconds) {
    const hr = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const sec = String(totalSeconds % 60).padStart(2, "0");
    return { hr, mins, sec };
  }

  const { hr, mins, sec } = formatTime(time);

  function calculateTime(h, m, s) {
    const hh = parseInt(h, 10);
    const mm = parseInt(m, 10);
    const ss = parseInt(s, 10);

    if (
      isNaN(hh) || isNaN(mm) || isNaN(ss) ||
      hh < 0 || mm < 0 || mm > 59 || ss < 0 || ss > 59
    ) {
      return 0;
    }
    return hh * 3600 + mm * 60 + ss;
  }

  function saveEditField() {
    if (!editstate.field) return;

    const newValue = editstate.value.padStart(2, "0");

    const newTimeObj = {
      hr,
      mins,
      sec,
      [editstate.field]: newValue,
    };

    const newTotalSecond = calculateTime(
      newTimeObj.hr,
      newTimeObj.mins,
      newTimeObj.sec
    );

    setTime(newTotalSecond);
    setEditstate({ field: null, value: "" });
    setShowTimeUp(false);

    if (newTotalSecond > 0) {
      setRunning(true); 
    }
  }

  function handleEditField(field) {
    if (editstate.field === field) {
      saveEditField();
    } else {
      setRunning(false);
      setEditstate({
        field,
        value: { hr, mins, sec }[field].replace(/^0+/, "") || "0",
      });
    }
  }

  const inputStyle = {
    width: "40px",
    height: "40px",
    textAlign: "center",
    fontSize: "20px",
    borderRadius: "8px",
    border: "1px solid black",
  };

  return (
    <div>
      <div
        className="main-box"
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "blueviolet",
          height: 700,
          width: 900,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "blueviolet",
            boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: 6,
            padding: "35px",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "250px",
              height: "250px",
              border: "3px solid black",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              borderRadius: "50%",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="text"
                style={inputStyle}
                readOnly={editstate.field !== "hr"}
                value={editstate.field === "hr" ? editstate.value : hr}
                onClick={() => handleEditField("hr")}
                onChange={(e) =>
                  setEditstate({ ...editstate, value: e.target.value })
                }
              />
              <span>:</span>
              <input
                type="text"
                style={inputStyle}
                readOnly={editstate.field !== "mins"}
                value={editstate.field === "mins" ? editstate.value : mins}
                onClick={() => handleEditField("mins")}
                onChange={(e) =>
                  setEditstate({ ...editstate, value: e.target.value })
                }
              />
              <span>:</span>
              <input
                type="text"
                style={inputStyle}
                readOnly={editstate.field !== "sec"}
                value={editstate.field === "sec" ? editstate.value : sec}
                onClick={() => handleEditField("sec")}
                onChange={(e) =>
                  setEditstate({ ...editstate, value: e.target.value })
                }
              />
            </div>
          </div>

          {showTimeUp && (
            <div style={{ color: "white", fontSize: "20px" }}>⏰ Time’s up!</div>
          )}

          <div>
            <button
              style={{
                borderRadius: "8px",
                padding: "0.8em 1.9em",
                marginRight: "70px",
              }}
              onClick={() => {
                if (editstate.field) {
                  saveEditField();
                } else {
                  setRunning(!running);
                }
              }}
            >
              {running ? "Pause" : "Start"}
            </button>
            <button
              style={{ borderRadius: "8px", padding: "0.8em 1.9em" }}
              onClick={() => {
                setRunning(false);
                setTime(0);
                setEditstate({ field: null, value: "" });
                setShowTimeUp(false);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
