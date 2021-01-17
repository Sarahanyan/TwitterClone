
import React from "react"

export const UserPicture = (props) => {
  const {user, stylings} = props

  return(
    <UserLink>
      <span className="px-4 py-3 rounded-circle text-white" style={{fontSize: "2.2rem", backgroundColor: "#245280"}}>
        {user && user.first_name[0].toUpperCase()}
      </span>
    </UserLink>
  )
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
  const {user, includeFullName} = props
  const nameDisplay = user && (includeFullName ? `${user.first_name} ${user.last_name}` : null)

  return(
    <>
      {nameDisplay} <br/>
      {user && <UserLink username={user.username}>@{user.username}</UserLink>}
    </>
  )
}
