import React, { useState, useEffect } from "react";
import "firebase/database";
import fireDb from "./firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { toast } from "react-toastify";

function App() {
  const [newTweet, setNewTweet] = useState("");
  const [data, setData] = useState({});
  const timestamp = firebase.firestore.Timestamp.now().toDate().toUTCString();

  // Add Tweet
  const createTweet = (e) => {
    e.preventDefault();
    fireDb.child("Tweet").push({ content: newTweet, created: timestamp });
    setNewTweet("");
  };

  const onChangeHandler = (e) => {
    setNewTweet(e.target.value);
  };

  // Get Tweets
  useEffect(() => {
    fireDb.child("Tweet").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);

  // Delete Tweet
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete it ?")) {
      fireDb.child(`Tweet/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("deleting from the database");
        }
      });
    }
  };

  return (
    <>
      <div>
        <input
          className="input"
          type="text"
          placeholder="What's happening?"
          onChange={onChangeHandler}
          value={newTweet}
        />
        {/* todo: Input validation */}
        <button
          className="btn"
          onClick={createTweet}
          disabled={/^\s/.test(newTweet) || newTweet.length === 0}
        >
          Tweet
        </button>
      </div>

      <div>
        {Object.keys(data).map((id) => {
          return (
            <div key={id}>
              <div className="tweet-content"> {data[id].content} </div>
              <div className="tweet-created-on"> {data[id].created} </div>
              <button className="btn btn-delete" onClick={() => onDelete(id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
