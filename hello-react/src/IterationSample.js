import React, { useRef, useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5);

  const input = useRef(null);

  const onChange = (e) => setInputText(e.target.value);
  const onClick = () => {
    setNextId(nextId + 1);
    setInputText("");

    setNames(
      names.concat({
        id: nextId,
        text: inputText,
      })
    );

    input.current.focus();
  };

  const onRemove = (id) => {
    setNames(names.filter((name) => name.id !== id));
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <>
      <input
        value={inputText}
        onChange={onChange}
        onKeyPress={onKeyPress}
        ref={input}
      />
      <button onClick={onClick}>추가</button>
      <ul>
        {names.map((name) => (
          <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
            {name.text}
          </li>
        ))}
      </ul>
    </>
  );
};

export default IterationSample;
