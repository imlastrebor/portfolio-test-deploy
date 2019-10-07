/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import MainMenu from "./MainMenu"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle, keyframes } from "styled-components"

// bg animation
const movement = keyframes`
  /* 0%, 100% { transform:translate(0, 0) }
  10% { transform:translate(-5%, -10%) }
  20% { transform:translate(-15%, 5%) }
  30% { transform:translate(7%, -25%) }
  40% { transform:translate(-5%, 25%) }
  50% { transform:translate(-15%, 10%) }
  60% { transform:translate(15%, 0%) }
  70% { transform:translate(0%, 15%) }
  80% { transform:translate(3%, 35%) }
  90% { transform:translate(-10%, 10%) } */
`

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,700&display=swap');

body, html{
  font-family: 'Roboto Mono', monospace;
  margin: 0 !important;
  padding: 0 !important;
  height:100%;
  overflow:hidden !important;
  
}
body{
  background-color:#000709;
  &::after {
    animation: ${movement}  8s steps(10) infinite;
    background: url(${props => props.imgUrl});
    content: "";
    height: 300%;
    left: -50%;
    opacity: .1;
    position: fixed;
    top: -100%;
    width: 300%;
    z-index: -2;
  }
}

`
const LayoutWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;

  height: 100%;
`

// const Layout = ({ children }) => (
//   <div>
//     <GlobalStyles />
//     <MainMenu />
//     <LayoutWrapper>{children}</LayoutWrapper>
//   </div>
// )

// export default Layout

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        wordpressWpMedia(title: { in: "grungeDark" }) {
          source_url
          title
        }
      }
    `
  )
  const testi = data.wordpressWpMedia.source_url
  console.log(testi)
  return (
    <div>
      <GlobalStyles imgUrl={data.wordpressWpMedia.source_url} />
      <MainMenu />
      <LayoutWrapper>{children}</LayoutWrapper>
    </div>
  )
}
