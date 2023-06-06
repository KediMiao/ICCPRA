import React, { useState } from "react";

function CreateArea(props) {
  const [item, setItem] = useState({
    title: "",
    content: "",
  });

  function handleInput(event) {
    const { name, value } = event.target;
    setItem((preItem) => {
      return {
        ...preItem,
        [name]: value,
      };
    });
  }

  function submitItem(event) {
    props.onItem(item);
    setItem({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          value={item.title}
          onChange={handleInput}
          name="title"
          placeholder="Title"
        />
        <textarea
          name="content"
          value={item.content}
          onChange={handleInput}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitItem}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
