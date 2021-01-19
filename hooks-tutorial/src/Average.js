import React, { useCallback, useMemo, useRef, useState } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");

  if (numbers.length > 0) {
    return numbers.reduce((a, b) => a + b) / numbers.length;
  }

  return 0;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const input = useRef(null);

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  const onInsert = useCallback(() => {
    setList(list.concat(parseInt(number)));
    setNumber("");

    input.current.focus();
  }, [number, list]);

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={input} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
