import React, { useState, useRef, useEffect } from "react"
import giftBoxImg from "../../images/giftBox.png"
import { inject, observer } from "mobx-react"
import "./index.scss"

const SendPresentBtn = (props) => {
  const [progressWidth, setProgressWidth] = useState(40)
  const [progressInterval, setProgressInterval] = useState(null)
  const [isCooling, setIsCooling] = useState(false)
  const progressHandle = useRef(null)

  progressHandle.current = () => {
    if (progressWidth >= 40) {
      setIsCooling(false)
      return clearInterval(progressInterval)
    }
    setProgressWidth(progressWidth + 1.333)
  }

  useEffect(() => {
    return () => progressInterval ? clearInterval(progressInterval) : null
  }, [])

  const sendPresent = () => {
    if (isCooling) return layer.msg("礼物冷却中！")
    else if (!isCooling) {
      let { appid, key, userInfo } = uerAuthorizeInfo
      hccms.post.ZhiboSystemDiscussion(
        {
          msgtype: 2,
          msg: '',
          appid,
          appuserid: key,
          userinfo: JSON.stringify({
            name: userInfo.username,
            img: userInfo.avatar,
          }),
          scheduleid: props.liveStore.curLessonId,
        },
        (res) => {
          setIsCooling(true)
          setProgressWidth(0)
          let timer = setInterval(() => {
            progressHandle.current()
          }, 1000)
          setProgressInterval(timer)
        }
      )
    }
  }

  return (
    <div className="sendBtnContainer flex column" onClick={sendPresent}>
      <img src={giftBoxImg} className="giftBoxImg" alt="" />
      <div className="progressContainer">
        <div className="progress" style={{ width: progressWidth + "px" }}></div>
      </div>
    </div>
  )
}

export default inject("liveStore")(observer(SendPresentBtn))
