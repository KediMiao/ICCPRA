import React, { useState } from "react";
import Header from "./inPersonSignIn/Header";
import Footer from "./inPersonSignIn/Footer";
import Note from "./inPersonSignIn/Note";
import CreateArea from "./inPersonSignIn/CreateArea";

function SignIn() {
  const [item, setItem] = useState([]);

  function addItem(newItem) {
    setItem((preItem) => {
      return [...preItem, newItem];
    });
    // console.log(item);
  }

  function deleteItem(id) {
    setItem((preItem) => {
      return preItem.filter((everyItem, index) => {
        return index !== id;
      });
    });

    // console.log("delete action was triggered");
  }

  return (
    <div>
      <Header />
      <CreateArea onItem={addItem} />
      {item.map((newItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={newItem.title}
            content={newItem.content}
            onDelete={deleteItem}
          />
        );
      })}
      {/* <Note key={1} title="Note title" content="Note content" /> */}
      <Footer />
    </div>
  );
}

export default SignIn;
