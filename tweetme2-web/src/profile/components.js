
import React from "react"

export const UserPicture = (props) => {
  const {user, stylings, hideLink, classes} = props
  const profilePic = (
    <span className={classes} style={stylings}>
      {user && user.first_name[0].toUpperCase()}
    </span>
  )

  return hideLink ? {profilePic} : <UserLink>{profilePic}</UserLink>
}

export const UserLink = (props) => {
  const {username} = props

  const handleLink = (event) => {
    event.preventDefault()
    window.location.href = `/profiles /${username}`
  }
  return(
    <span onClick={handleLink} className="pointer">
      {props.children}
    </span>
  )
}

export const UserDisplay = (props) => {
  const {user, includeFullName, hideLink} = props
  const nameDisplay = user && (includeFullName ? `${user.first_name} ${user.last_name}` : null)

  return(
    <>
      {nameDisplay} <br/>
      {user ? hideLink ? `@${user.username}` : <UserLink username={user.username}>@{user.username}</UserLink> : null
      }
    </>
  )
}
