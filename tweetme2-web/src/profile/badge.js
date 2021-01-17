import React, {useState, useEffect} from "react"
import {apiProfileDetail, apiProfileFollowingToggle} from "./lookup"
import {UserDisplay, UserPicture} from "./components"

export const ProfileBadge = (props) => {
  const {user, didFollowToggle, profileLoading} = props
  const profPicstyle = {fontSize: "2.2rem", backgroundColor: "#245280"}
  const profPicClasses = "px-4 py-3 rounded-circle text-white"
  let currentActionVerb = user.is_following ? "Unfollow" : "Follow"
  currentActionVerb = profileLoading ? "Loading..." : currentActionVerb

  const handleFollowToggle = (event) => {
    event.preventDefault()
    if (!profileLoading) {
      didFollowToggle(currentActionVerb) 
    }
  }

  return(
  <div className="d-flex px-auto">
    <UserPicture user={user} stylings={profPicstyle} classes={profPicClasses}/>
    <UserDisplay user={user} includeFullName hideLink/>
    <button className="btn btn-primary" onClick={handleFollowToggle}>
      {currentActionVerb}
    </button>
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