import React from "react"

const Index = ({ data, location }) => {
  return (
    <div>
      <ul>
        <li>
          <a href="/blog">read Blog</a>
        </li>
        <li>
          <a href="https://github.com/EvilMouth">fork Github</a>
        </li>
        <li>
          <a href="https://twitter.com/EvilLittleMouth">mention Twitter</a>
        </li>
        <li>
          <a href="https://telegram.me/EvilLittleMouth">chat Telegram</a>
        </li>
      </ul>
    </div>
  )
}

export default Index
