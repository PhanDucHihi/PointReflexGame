/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function TimeoutExample() {
  const [count, setCount] = useState(0);
  const [isCount, setIsCount] = useState(false);

  useEffect(() => {
    setIsCount(!isCount);
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
    console.log("Ngay sau setCount:", count); // Thấy giá trị cũ

    setTimeout(() => {
      console.log("Trong setTimeout:", count); // Vẫn là giá trị cũ (chốt theo lần render cũ)
    }, 1000);
  };

  console.log("Component render với count:", count, isCount);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Tăng Count</button>
    </div>
  );
}
