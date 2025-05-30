import { useDeferredValue, useEffect, useRef, useState } from "react";

export default function TimerSection() {
  const [time, setTime] = useState(0);
  const [Running, setIsRunnig] = useState(false);
  const [editstate, setEditstate] = useState({ field: null, value: "" });

  const hrRef = useRef(null);
  const minRef = useRef(null);
  const secondsRef = useRef(null);

  useEffect(function () {
    if (!Running) return;

    const interval = setInterval(function () {
      setTime((prev) => {
        if (prev <= 0) {
          setIsRunnig(false);
          return 0;
        }
        return prev - 1;
      }, 1000);

      return () => clearInterval(interval);
    });
  });

  function formatTime(totalSeconds) {
    const hr = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const sec = String(totalSeconds % 60).padStart(2, "0");
    return { hr, mins, sec };
  }

  const { hr, mins, sec } = formatTime(time);

  function calculateTime(h, m, s) {
    const hh = parseInt(h, 10);
    const mm = parseInt(m, 10);
    const ss = parseInt(s, 10);

    if (
      isNaN(hh) ||
      isNaN(mm) ||
      isNaN(ss) ||
      hh < 0 ||
      mm < 0 ||
      mm > 59 ||
      ss < 0 ||
      ss > 59
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
    if(newTotalSecond > 0) setIsRunnig(true);
  }

  function handleEditField(field) {
    if (editstate.field === field) {
      saveEditField();
    } else {
      setIsRunnig(false);
      setEditstate({
        field,
        value: { hr, mins, sec }[field].replace(/^0+/, "") || 0,
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
              <input type="text" style={inputStyle} readOnly={editstate.field !== "hr"} value={editstate.field === "hr"? editstate.value : hr} 
           />
              <span>:</span>
              <input type="text" style={inputStyle} readOnly={editstate.field !== "mins"} value={mins} />
              <span>:</span>
              <input type="text" style={inputStyle} readOnly={editstate.field !== "sec"} value={sec} />
            </div>
          </div>
          <div>
            <button
              style={{
                borderRadius: "8px",
                padding: "0.8em 1.9em",
                marginRight: "70px",
              }}
              onClick={() => setIsRunnig(!Running)}
            >
              {Running ? "Pause" : "Start"}
            </button>
            <button
              style={{ borderRadius: "8px", padding: "0.8em 1.9em" }}
              onClick={() => {
                setIsRunnig(!Running);
                settotalSeconds(0);
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
