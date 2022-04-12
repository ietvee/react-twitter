import React, { useState, useEffect, useRef } from "react";
import "firebase/database";
import fireDb from "./firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { toast } from "react-toastify";
import { useDetectOutsideClick } from "./useDetectOutsideClick";

function App() {
  const [newTweet, setNewTweet] = useState("");
  const [data, setData] = useState({});
  const timestamp = firebase.firestore.Timestamp.now()
    .toDate()
    .toLocaleString();
  // Delete Toggle
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  // Favorite Tweet
  const [fav, setFav] = useState([]);

  // Add Tweet
  const createTweet = (e) => {
    e.preventDefault();
    fireDb.child("Tweet").push({ content: newTweet, created: timestamp });
    setNewTweet("");
  };

  const onChangeHandler = (e) => {
    setNewTweet(e.target.value);
  };

  // Favorite Tweet - need to enhance
  const handleChangeFav = (id) => {
    setFav([...fav, id]);
  };

  // Get Tweets
  useEffect(() => {
    fireDb
      .child("Tweet")
      .orderByChild("created")
      .on("value", (snapshot) => {
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
      fireDb.child(`Tweet/`).remove((err) => {
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
      <div className="tweet-input">
        <input
          className="input"
          type="text"
          placeholder="What's happening?"
          onChange={onChangeHandler}
          value={newTweet}
        />
        {/* todo: Input validation */}
        <span>
          <button
            className="btn btn-tweet"
            onClick={createTweet}
            disabled={/^\s/.test(newTweet) || newTweet.length === 0}
          >
            Tweet
          </button>
        </span>
      </div>
      <div>
        {Object.values(data)
        .map((id, index) => {
          return (
            <div key={index}>
              <ol className="tweet-list">
                <li className="tweet-card">
                  <div className="tweet-content">
                    <div className="tweet-header">
                      <span className="fullname">
                        <strong>User User</strong>
                        <span className="username">
                          &nbsp; @User
                          <span className="tweet-time">
                            &nbsp; · &nbsp; {id.created}
                          </span>
                        </span>
                      </span>

                      <div>
                        <button className="btn" onClick={() => setIsActive(id)}>
                          <svg
                            width="21"
                            height="21"
                            fill="currentColor"
                            viewBox="0 0 21 21"
                            className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                          >
                            <g>
                              <circle cx="5" cy="12" r="2"></circle>
                              <circle cx="12" cy="12" r="2"></circle>
                              <circle cx="19" cy="12" r="2"></circle>
                            </g>
                          </svg>
                        </button>
                        {isActive === id ? (
                          <div ref={dropdownRef} className="menu">
                            <ul>
                              <li>
                                <button
                                  className="delete-btn"
                                  onClick={() => onDelete(id)}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="tweet-text">
                      <p>{id.content}</p>
                    </div>
                    <div className="tweet-footer">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-chat"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                        </svg>
                        <span> 0</span>
                      </span>
                      <span>
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <g>
                            <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                          </g>
                        </svg>
                        <span> 0</span>
                      </span>
                      <button className="btn">
                        <span onClick={() => handleChangeFav(index)}>
                          {/* {fav.toString()} */}

                          <svg
                            width="20"
                            height="20"
                            fill={fav.indexOf(index) >= 0 ? "red" : "black"}
                            viewBox="0 0 24 24"
                            className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                          >
                            <g>
                              <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                            </g>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
