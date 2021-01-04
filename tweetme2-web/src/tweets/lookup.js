import {backendLookup} from "../lookup"

export function apiTweetsList(callback){
  backendLookup('GET', "/tweets/", callback)   
        }

export function apiTweetCreate(callback, tweetValue){
  backendLookup('POST', "/tweets/create/", callback, {content: tweetValue})   
        }

export function apiTweetAction(callback, tweetId, action){
  const data = {id: tweetId, action}
  backendLookup('POST', "/tweets/action/", callback, data)   
}