import React, {useState, useRef} from "react"
import {apiTweetCreate} from "./lookup"

export const TweetCreate = (props) => {
  const {didTweet} = props
  const canTweet = props.canTweet === "false" ? false : true
  const textareaRef = useRef()
  const [createdTweet, setCreatedTweet] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textareaRef.current.value
    console.log(newVal);

    const createTweetCallback = (response, status) => {
      if (status === 201){
        didTweet(response)
      }
    }
    apiTweetCreate(createTweetCallback, newVal)
    textareaRef.current.value = ""
    
  }
  return (
    <div className="container my-4">
        <form onSubmit={handleSubmit}>
          <textarea ref={textareaRef} required={true} className="form-control" />
          <button type="submit" className="btn btn-primary mt-2">Tweet</button>
      </form>
    </div>
      
    )
}