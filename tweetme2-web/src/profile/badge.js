import React, {useState, useEffect} from "react"
import {apiProfileDetail, apiProfileFollowingToggle} from "./lookup"
import {UserDisplay, UserPicture} from "./components"
import {DisplayCount} from "./utils"

export const ProfileBadge = (props) => {
  const {user, didFollowToggle, profileLoading} = props
  const profPicstyle = {fontSize: "2.7rem", backgroundColor: "#245280"}
  const profPicClasses = "px-5 py-4 mt-5 mb-5 rounded-circle text-white"
  let currentActionVerb = user.is_following ? "Unfollow" : "Follow"
  currentActionVerb = profileLoading ? "Loading..." : currentActionVerb

  const handleFollowToggle = (event) => {
    event.preventDefault()
    if (!profileLoading) {
      didFollowToggle(currentActionVerb) 
    }
  }

  return(
  <div className="container my-5 px-auto">
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4 py-5 px-4">
          <UserPicture user={user} stylings={profPicstyle} classes={profPicClasses}/><br />
          <h5 className="card-title mt-5"><UserDisplay user={user} includeFullName hideLink /></h5>

          {/* <p className="mt-5"><UserDisplay user={user} includeFullName hideLink /></p> */}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <p>Followers: <DisplayCount>{user.followers_count}</DisplayCount></p>
            <p>Following: <DisplayCount>{user.following_count}</DisplayCount></p>
            <p>{user.location}</p>
            <p>{user.bio}</p>
            <button className="btn btn-primary mt-3" onClick={handleFollowToggle}>
              {currentActionVerb}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
  )
}

export const ProfileBadgeComponent = (props) => {
  const {username} = props
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)
  // console.log(username);

  const profileDetailCallback = (response, status) => {
    if (status === 200) {
      setProfile({...response})
      console.log(profile);
    } else {
      alert("Sorry, a serious error occured")
    }
  }

  useEffect(() => {
    apiProfileDetail(username, profileDetailCallback)
  }, [username])

  const handleNewFollow = (actionVerb) => {
    setProfileLoading(true)
    apiProfileFollowingToggle(username, actionVerb, (response, status) => {
      if (status === 200) {
        setProfile(response)
        console.log(profile);
      }
      setProfileLoading(false)
    })
  }

  return profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading}/> : <h1>Loading...</h1>
}


    {/* <div className="card p-4 mx-auto " style={{width: "100%"}}>
      <div className="card-img-top my-5 mx-auto d-flex">
        <UserPicture user={user} stylings={profPicstyle} classes={profPicClasses}/>
        <UserDisplay user={user} includeFullName hideLink /> <br />
      </div>
      <div className="card-body mx-auto">
        <p>Followers: <DisplayCount>{user.followers_count}</DisplayCount></p>
        <p>Following: <DisplayCount>{user.following_count}</DisplayCount></p>
        <p>{user.location}</p>
        <p>{user.bio}</p>
        <button className="btn btn-primary mt-3" onClick={handleFollowToggle}>
          {currentActionVerb}
      </button>
      </div>
    </div> */}