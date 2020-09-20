import React from "react"
import { Helmet } from "react-helmet"

import { rhythm } from "../utils/typography"
import useScript from "../utils/usescript"

const Valine = () => {
  const status = useScript(`//unpkg.com/valine/dist/Valine.min.js`)
  if (status === "ready") {
    new window.Valine({
      el: `#vcomments`,
      appId: `nz6bXMmJFc8MFel7rjABVkRs-MdYXbMMI`,
      appKey: `ShmNgaeVX5Oh6C62OtT7W1Qd`,
      placeholder: `Say Something`,
      avatar: ``,
      guest_info: [`nick`, `mail`],
      lang: `en`,
      visitor: false,
    })
  }
  return <div id="vcomments"></div>
}

const Gitalk = ({ id, location }) => {
  const status = useScript(`//cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js`)
  if (status === "ready") {
    const gitalk = new window.Gitalk({
      clientID: `74a99996d02981497895`,
      clientSecret: `666acd52c84878ed4e9632a4a5d91005ed410831`,
      repo: `_posts`,
      owner: `EvilMouth`,
      admin: [`EvilMouth`],
      id: id,
      distractionFreeMode: true,
      lang: `en`,
    })

    gitalk.render("gitalk-container")
  }
  return (
    <div id="gitalk-container">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css"
        ></link>
      </Helmet>
    </div>
  )
}

const Comment = ({ id, location }) => {
  return (
    <div
      id="commentContainer"
      style={{
        marginTop: rhythm(2),
      }}
    >
      <Valine />
      <Gitalk id={id} location={location} />
    </div>
  )
}

export default Comment
