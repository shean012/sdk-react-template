import React, { useState, useEffect, useRef } from "react"
import EventBus from "@/utils/eventBus.js"
import "./index.scss"

const PresentAnimate = () => {
  const [userName, setUserName] = useState("")
  const [showAnimateInterval, setShowAnimateInterval] = useState(null)
  const [presents, setPresents] = useState([])
  const [curIdx, setCurIdx] = useState(0)
  const [curPresentId, setCurPresentId] = useState(null)
  const handler = useRef()

  handler.current = () => {
    if (curIdx >= presents.length) {
      setCurIdx(0)
      setPresents([])
      setCurPresentId(null)
      clearInterval(showAnimateInterval)
      setShowAnimateInterval(null)
    } else {
      let userInfo = presents[curIdx] ? JSON.parse(presents[curIdx].userinfo) : ''
      userInfo ? setUserName(userInfo.name) : ''
      presents[curIdx] && presents[curIdx].id ? setCurPresentId(presents[curIdx].id) : ''
      setCurIdx(curIdx + 1)
    }
  }

  useEffect(() => {
    EventBus.subscriber("showPresentAnimate", this, (data) => {
      setPresents(presents.concat(data))
      if (!showAnimateInterval) {
        handler.current()
        let timer = setInterval(() => {
          handler.current()
        }, 3500)
        setShowAnimateInterval(timer)
      }
    })
    return () => showAnimateInterval ? clearInterval(showAnimateInterval) : ''
  }, [])

  return (
    <div className="presentAnimateContainer">
      {presents.map((item) => {
        return (
          <div className="presentAnimate flex row animate__fadeInLeft" key={item.id} style={{display: item.id === curPresentId ? 'flex' : 'none' }}>
            <div className="userName">{userName ? userName : ""}</div>
            <div className="font">送出了点赞</div>
            <div className="presentImg">
              <img
                src="https://img.cdn.dn8188.com/skin/imgs/bq/like_b.gif"
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PresentAnimate
