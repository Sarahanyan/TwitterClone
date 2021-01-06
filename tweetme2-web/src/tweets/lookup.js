import {backendLookup} from "../lookup"

export function apiTweetDetail(tweetId, callback){
  backendLookup('GET', `/tweets/${tweetId}`, callback)   
}

export function apiTweetsList(username, callback){
  let endpoint = "/tweets/"
  if (username) {
    endpoint = `/tweets/?username=${username}`
  }
  backendLookup('GET', endpoint, callback)   
        }

export function apiTweetCreate(callback, tweetValue){
  backendLookup('POST', "/tweets/create/", callback, {content: tweetValue})   
        }

export function apiTweetAction(callback, tweetId, action){
  const data = {id: tweetId, action}
  backendLookup('POST', "/tweets/action/", callback, data)   
}