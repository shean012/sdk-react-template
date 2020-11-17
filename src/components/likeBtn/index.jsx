import React, { useState } from "react"
import './index.scss'
import likeIcon from '../../images/like.png'

const LikeBtn = () => {
  const [showAnimate, setShowAnimate] = useState(false)

  const showLikeAminate = () => {
    if (!showAnimate) {
      setShowAnimate(true)
      setTimeout(() => {
        setShowAnimate(false)
      }, 2500);
    }
  }

  return (
    <div className="likeBtnContainer" onClick={showLikeAminate}>
      <img src={likeIcon} className={`${showAnimate ? 'animate__tada' : ''}`} />
      <div className={`count ${showAnimate ? 'fadeInOut_animate' : ''}`} >+1</div>
    </div>
  )
}

export default LikeBtn