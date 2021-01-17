import {backendLookup} from "../lookup"

export function apiProfileDetail(username, callback){
  backendLookup('GET', `/profiles/${username}/`, callback)   
}

export function apiProfileFollowingToggle(username, action, callback){
  const data = {action: `${action && action}`.toLowerCase()}
  console.log(data);
  backendLookup('POST', `/profiles/${username}/follow/`, callback, data)   
}