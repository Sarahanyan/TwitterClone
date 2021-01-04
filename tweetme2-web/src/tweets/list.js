import React, {useState, useEffect} from "react"
import {apiTweetsList} from "./lookup"
import {Tweet} from "./detail"

export function TweetsList(props) {
  const [tweets, setTweets] = useState([])
  const createdTweet = props.createdTweet
  let retweetedTweet
  
  useEffect(() => {
    setTweets([createdTweet, ...tweets])
  }, [createdTweet])

  useEffect(() => {
    const setTweetsCallback = (response, status) => {
      if (status === 200){
        setTweets(response)
        if (!tweets) {
          setTweets([{id: 1, content: "hey"}, {id: 2, content: "heysup"}, {id: 3, content: "sup"}])      
        }
        
      }
    }
    apiTweetsList(props.username, setTweetsCallback)

  }, [])
  
  const didRetweet = (actionTweet) => {
    retweetedTweet = actionTweet
    setTweets([retweetedTweet, ...tweets])
  }

  return (
      <div className="container align-center">
          {
          tweets.map((singleTweet, index) =>{
            const {id, content, likes} = singleTweet
            return(
              <div key={`${index}-${id}`}>
                <Tweet singleTweet = {singleTweet} handleDidRetweet={didRetweet}/>
              </div>
            )
          })
          }
      </div>

  );
}