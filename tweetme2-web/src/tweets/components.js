import React, {useState, useEffect, useRef} from "react"
import {TweetCreate} from "./create"
import {TweetsList} from "./list"
import {Tweet} from "./detail"
import {apiTweetDetail} from "./lookup"


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

export const TweetDetailComponent = (props) => {
  console.log(props);
  const {tweetId} = props
  const [tweet, setTweet] = useState()

  const tweetDetailCallback = (response, status) => {
    if (status === 200) {
      setTweet({...response})
      console.log(tweet);
    } else {
      alert("Sorry, a serious error occured")
    }
  }

  useEffect(() => {
    apiTweetDetail(tweetId, tweetDetailCallback)
  }, [tweetId])

  return (
  <div className="mx-auto">
    {tweet && <Tweet singleTweet={tweet}/>}
  </div>)
}