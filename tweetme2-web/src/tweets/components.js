import React, {useState, useEffect, useRef} from "react"
import {displayTweets, createTweet} from "../lookup"

export const ActionBtn = (props) => {
  const handleClick = (event) => {
    event.preventDefault() 
    userLike ? setLikes(likes - 1) : setLikes(likes + 1)
    setUserLike(!userLike)
  }

  const {singleTweet, action} = props
  const [userLike, setUserLike] = useState(false)
  const [likes, setLikes] = useState(singleTweet.likes)
  const btnClass = action === "like" ? "btn-primary" : action === "unlike" ? "btn-outline-secondary" : "btn-outline-success"                                                                   
  const btnText = { like: `${likes} likes`, 
                    unlike: "unlike", 
                    retweet: "retweet"
                  }

  return(
    <button className={`btn ${btnClass} mx-1`} onClick={handleClick}>
      {btnText[action]}
    </button>
  )
}

export const Tweet = (props) => {
  const {content, likes} = props.singleTweet
  return (
    <div className="col-10 py-5 my-3 border-bottom">
      <h3>{content}</h3>
      <div className="btn btn-group">
        <ActionBtn singleTweet= {props.singleTweet} action="like" />
        <ActionBtn singleTweet= {props.singleTweet} action="unlike" />
        <ActionBtn singleTweet= {props.singleTweet} action="retweet" />
      </div>
    </div>
  )
}

export function TweetsList(props) {
  const [tweets, setTweets] = useState([])
  const createdTweet = props.createdTweet

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
    createTweet(createTweetCallback, newVal)
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