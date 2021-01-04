import React, {useState, useEffect, useRef} from "react"
import {apiTweetsList, apiTweetCreate, apiTweetAction} from "./lookup"

export const ActionBtn = (props) => {
  const {singleTweet, action, tweetActionDidPerform} = props
  const likes = singleTweet.likes
  const btnClass = action === "like" ? "btn-primary" : action === "unlike" ? "btn-outline-secondary" : "btn-outline-success"                                                                   
  let btnText = { 
    like: `${likes} likes`, 
    unlike: `unlike`, 
    retweet: "retweet"
  }

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
    <button className={`btn ${btnClass} mx-1`} onClick={handleClick}>
      {btnText[action]}
    </button>
  )
}

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
    apiTweetsList(setTweetsCallback)

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

export const TweetsComponent = (props) => {
  const textareaRef = useRef()
  const [createdTweet, setCreatedTweet] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textareaRef.current.value
    console.log(newVal);

    const createTweetCallback = (response, status) => {
      if (status === 201){
        setCreatedTweet(response)
      }
    }
    apiTweetCreate(createTweetCallback, newVal)
    textareaRef.current.value = ""
    
  }
  return (
    <div className="col-12 my-4">
      <form onSubmit={handleSubmit}>
          <textarea ref={textareaRef} required={true} className="form-control" />
          <button type="submit" className="btn btn-primary mt-2">Tweet</button>
      </form>
      <TweetsList createdTweet={createdTweet}/>
    </div>
      
    )
}