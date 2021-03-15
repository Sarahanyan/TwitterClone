import React, {useState} from "react"
import {ActionBtn} from "./buttons"
import {UserDisplay, UserPicture} from "../profile"

export const Tweet = (props) => {
  let {content, likes, id, user} = props.singleTweet
  const handleDidRetweet = props.handleDidRetweet
  const parentTweet = props.singleTweet.parent
  const[singleTweet, setSingleTweet] = useState(props.singleTweet)
  const isDetailView = checkIfDetailView(singleTweet)
  const profPicstyle = {fontSize: "2.2rem", backgroundColor: "#245280"}
  const profPicClasses = "px-4 py-3 rounded-circle text-white"
  const tweetClass = "col-12 py-4 my-3 border-bottom d-flex flex-column"

  function checkIfDetailView(tweet){
    const path = window.location.pathname
    const idRegex = /(?<tweetId>\d+)/
    const match = path.match(idRegex)
    const urlTweetId = match ? match.groups.tweetId : -1
    return `${tweet.id}` === `${urlTweetId}`
  }

  const handleLink = (event) => {
    event.preventDefault()
    window.location.href = `${singleTweet.id}`
  }

  const tweetActionDidPerform = (actionTweet, status) => {
    if (status === 200) {
      setSingleTweet(actionTweet)
    }else if (status === 201){
      handleDidRetweet(actionTweet)
    }
  }

  return (
    <div className={tweetClass} style={{"backgroundColor": "rgb(247, 249, 251)"}}>
      <div className="d-flex mb-2 mx-2">
        <UserPicture user={user} stylings={profPicstyle} classes={profPicClasses}/>
        <p className="mx-3">
          <UserDisplay user={user} includeFullName/>
        </p>
      </div>
      {content && <h3 className="mx-5">{content}</h3>}
      {
        parentTweet && 
        <div>
          <ParentTweet tweet={parentTweet} checkIfDetailView={checkIfDetailView} handleLink={handleLink}/>
        </div>
      }
      <div className="mt-3 align-self-end">
        <ActionBtn singleTweet={singleTweet} action="like" tweetActionDidPerform={tweetActionDidPerform}/>
        <ActionBtn singleTweet={singleTweet} action="unlike" tweetActionDidPerform={tweetActionDidPerform}/>
        <ActionBtn singleTweet={singleTweet} action="retweet" tweetActionDidPerform={tweetActionDidPerform}/>
        {
          (!isDetailView) && <button className="btn btn-outline-secondary mx-2 btn-sm border-0" onClick={handleLink}>view tweet</button>
        }
      </div>
    </div>
  )
}

const ParentTweet = (props) => {
  const {checkIfDetailView, handleLink} = props
  const {content, user} = props.tweet
  const isDetailView = checkIfDetailView(props.tweet)
  const profPicstyle = {fontSize: "2.2rem", backgroundColor: "rgb(251, 251, 251)", color:"#574f4f"}
  const profPicClasses = "px-4 py-3 rounded-circle"

  // console.log(props.tweet.id, (user.first_name) ? user.first_name : "null");

  return (
    <div className="col-9 mx-auto border rounded py-1 px-2 mb-2 position-relative" style={{"background": "#e8eef4"}}>
      <p className="mb-2 text-muted small">Retweet</p>
      <div className="d-flex mt-4 pointer">
          <UserPicture user={user} stylings={profPicstyle} classes={profPicClasses}/>
          <p className="mx-3">
            <UserDisplay user={user} includeFullName/>
          </p>
      </div>
      <h3>{content}</h3><br/>
      {
        (!isDetailView) && <button className="btn btn-link text-muted position-absolute bottom-0 end-0" onClick={handleLink}>
          view tweet
        </button>
      }
    </div>
  )
}

