import React from "react";

function Otptimer() {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          // Callback when timer reaches 0
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, [initialTime, onTimeout]);

  return (
    <div>
      {timeLeft > 0 ? <p>Time left: {timeLeft} seconds</p> : <p>Time's up!</p>}
    </div>
  );
}
export default Otptimer;
