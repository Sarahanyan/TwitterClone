import React, {useState, useEffect} from "react"
import {apiTweetsFeed} from "./lookup"
import {Tweet} from "./detail"

export function TweetsFeedList(props) {
  const [tweets, setTweets] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const createdTweet = props.createdTweet
  let retweetedTweet
  
  useEffect(() => {
    setTweets([createdTweet, ...tweets])
  }, [createdTweet])

  useEffect(() => {
    const setTweetsCallback = (response, status) => {
      if (status === 200){
        setTweets(response.results)
        if (!tweets) {
          setTweets([{id: 1, content: "hey"}, {id: 2, content: "heysup"}, {id: 3, content: "sup"}])      
        }
        setNextUrl(response.next)
      }
    }
    apiTweetsFeed(setTweetsCallback)

  }, [])
  
  const didRetweet = (actionTweet) => {
    retweetedTweet = actionTweet
    setTweets([retweetedTweet, ...tweets])
  }

  const handleLoadNext = (event) => {
    event.preventDefault()
      const handleLoadNextResponse = (response, status) => {
          if (status === 200){
            setTweets([...tweets, ...response.results])
            setNextUrl(response.next)
        }
      }
        apiTweetsFeed(handleLoadNextResponse, nextUrl)

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
          {nextUrl !== null && 
          <button className="btn btn-success float-end" onClick={handleLoadNext}>
            More Tweets  >>> 
            </button>
            }
      </div>

  );
}