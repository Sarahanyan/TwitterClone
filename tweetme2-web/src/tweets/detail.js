import React, {useState} from "react"
import {ActionBtn} from "./buttons"

export const Tweet = (props) => {
  let {content, likes, id} = props.singleTweet
  const handleDidRetweet = props.handleDidRetweet
  const parentTweet = props.singleTweet.parent
  const tweetClass = "col-10 py-5 my-3 border-bottom"
  const[singleTweet, setSingleTweet] = useState(props.singleTweet)

  const tweetActionDidPerform = (actionTweet, status) => {
    if (status === 200) {
      setSingleTweet(actionTweet)
    }else if (status === 201){
      handleDidRetweet(actionTweet)
    }
  }

  return (
    <div className={tweetClass}>
      <h3>{content}</h3>
      {
        parentTweet && 
        <div>
          <ParentTweet tweet={parentTweet}/>
        </div>
      }
      <div className="btn btn-group">
        <ActionBtn singleTweet={singleTweet} action="like" tweetActionDidPerform={tweetActionDidPerform}/>
        <ActionBtn singleTweet={singleTweet} action="unlike" tweetActionDidPerform={tweetActionDidPerform}/>
        <ActionBtn singleTweet={singleTweet} action="retweet" tweetActionDidPerform={tweetActionDidPerform}/>
      </div>
    </div>
  )
}

const ParentTweet = (props) => {
  const {content} = props.tweet
  return (
    <div className="col-9 mx-auto border rounded py-1 mb-2" style={{"background": "#e8eef4"}}>
      <p className="mb-0 text-muted small">Retweet</p>
      <h3>{content}</h3>
    </div>
  )
}