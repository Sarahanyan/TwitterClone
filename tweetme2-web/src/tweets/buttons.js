import React from "react"
import {apiTweetAction} from "./lookup"

export const ActionBtn = (props) => {
  const {singleTweet, action, tweetActionDidPerform} = props
  const likes = singleTweet.likes
  const btnClass = action === "like" ? "btn-outline-primary" : action === "unlike" ? "btn-outline-secondary" : "btn-outline-success"                                                                   
  let btnText = { 
    like: `${likes} likes`, 
    unlike: `unlike`, 
    retweet: "retweet"
  }
  const btnStyle = {width: "25%"}

  function tweetActionCallback(response, status){
    if (status === 200 || status === 201) {
      tweetActionDidPerform(response, status)
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
    apiTweetAction(tweetActionCallback, singleTweet.id, action)
}

  return(
    <button className={`btn ${btnClass} mx-1 btn-sm border-0`} onClick={handleClick} style={{btnStyle}}>
      {btnText[action]}
    </button>
  )
}