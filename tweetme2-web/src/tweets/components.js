import React, {useState, useEffect} from "react"
import {displayTweets} from "../lookup"

export const ActionBtn = (props) => {
  const {singleTweet, action} = props
  const btnClass = action === "like" ? "btn-primary" : action === "unlike" ? "btn-outline-secondary" : "btn-outline-success"

  const btnText = { like: `${singleTweet.likes} likes`, 
                    unlike: "unlike", 
                    retweet: "retweet"
                  }

  return(
    <button className={`btn ${btnClass} mx-1`}>
      {btnText[action]}
    </button>
  )
}

export const Tweet = (props) => {
  const {content, likes} = props.singleTweet
  return (
    <div className="col-md-6 col-10 py-5 my-3 border-bottom">
      <h3>{content}</h3>
      <div className="btn btn-group">
        <ActionBtn singleTweet= {props.singleTweet} action="like" />
        <ActionBtn singleTweet= {props.singleTweet} action="unlike" />
        <ActionBtn singleTweet= {props.singleTweet} action="retweet" />
      </div>
    </div>
  )
}

export function TweetsList() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const setTweetsCallback = (response, status) => {
      if (status === 200){
        setTweets(response)
        if (!tweets) {
          setTweets([{id: 1, content: "hey"}, {id: 2, content: "heysup"}, {id: 3, content: "sup"}])      
        }
        
      }
    }
    displayTweets(setTweetsCallback)

  }, [])

  return (

      <div className="container align-center">
          {
          tweets.map((singleTweet, index) =>{
            const {id, content, likes} = singleTweet
            return(
              <Tweet key={`${index}-${id}`} singleTweet = {singleTweet} />
            )
          })
          }
      </div>

  );
}