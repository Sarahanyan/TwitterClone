import React, {useState, useEffect, useRef} from "react"
import {TweetCreate} from "./create"
import {TweetsList} from "./list"


export const TweetsComponent = (props) => {
  const canTweet = props.canTweet === "false" ? false : true
  const [createdTweet, setCreatedTweet] = useState({})

  const handleTweet = (newTweet) => {
    setCreatedTweet(newTweet)
  }

  return (
    <div className="col-12 my-4">
      {canTweet && <TweetCreate didTweet={handleTweet}/>}
      <TweetsList createdTweet={createdTweet} {...props}/>
    </div>
      
    )
}