export const  calculateTime = (h, m, s) => {
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
 export const formatTime = (totalSeconds) => {
    const hr = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const sec = String(totalSeconds % 60).padStart(2, "0");
    return { hr, mins, sec };
}