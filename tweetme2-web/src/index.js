import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {TweetsComponent, TweetDetailComponent, FeedComponent} from './tweets'
import {ProfileBadgeComponent} from "./profile"

const appEl = document.getElementById('root')

if (appEl) {
  ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 
}

const tweetsFeedEl =   document.getElementById('tweetme-2-feed')
const createEl = React.createElement

if (tweetsFeedEl) {
  ReactDOM.render(
  createEl(FeedComponent, tweetsFeedEl.dataset), tweetsFeedEl
); 
}

const tweetsEl = document.getElementById('tweetme-2')

if (tweetsEl) {
  ReactDOM.render(
  createEl(TweetsComponent, tweetsEl.dataset), tweetsEl
); 
}

const tweetsDetailElements = document.querySelectorAll('.tweetme-2-detail')
tweetsDetailElements.forEach((container) => {
  ReactDOM.render(
  createEl(TweetDetailComponent, container.dataset), container)
})

const profileDetailElements = document.querySelectorAll('.tweetme-2-profile-detail')
profileDetailElements.forEach((container) => {
  ReactDOM.render(
  createEl(ProfileBadgeComponent, container.dataset), container)
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
