import React from "react"

const Images = (props) => {
  let url = props.src || ""
  let idx = url.indexOf("images")
  let src = ""
  if (idx === -1) src = url
  else {
    let fileName = url.substr(idx + 7)
    let imageUrl = process.env.NODE_ENV === "production" ? imageDefUrl : ""
    src = imageUrl
      ? `${imageUrl + fileName}`
      : require(`../../images/${fileName}`)
  }

  return (
    <>
      <img style={{ width: "100%", display: "block" }} src={src} />
    </>
  )
}

export default Images
