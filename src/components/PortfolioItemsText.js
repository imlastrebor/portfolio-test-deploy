import React, { useState } from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"
import { TweenMax, Power2, TimelineLite } from "gsap/TweenMax"

const PortfolioItemsWrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 100px;
  max-height: 80vh;
  overflow-y: scroll;
  display: block;
  text-align: center;
  justify-content: center;

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(220, 220, 220, 0.1);
    border-radius: 10px;
    background-color: transparent;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(220, 220, 220, 0.2);
    background-color: transparent;
  }
`
const PortfolioItems = styled.div``

const PortfolioItem = styled.div`
  height: 100%;
  margin: 40px;
  /* max-width: 90%;
  padding: 50px;
  margin: 10px auto;
  position: relative; */
`

const PortfolioItemNameLink = styled(Link)`
  display: inline-block;
  z-index: -2;
  text-decoration: none;
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #fff;
  transition: 0.25s linear;
  &:hover {
    color: #fff;
  }
  ${PortfolioItem}:hover & {
    opacity: 1;
  }
`
const PortfolioItemNameLinkText = styled.h2`
  display: inline-block;
  margin: 0;
  font-size: 4em;
`
const Svg = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
`

const PortfolioImage = styled.img`
  max-width: 300px;
  /* --------- */
  /* Image distort filter */
  /* filter: url(#noise); */
  /* --------- */

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -5;
  opacity: 0;
  transition: 0.4s linear;
  ${PortfolioItemNameLink}:hover & {
    opacity: 0.7;
  }
`

const PortfolioItemsText = () => {
  const [currentStyle, setCurrentStyle] = useState({})
  const [currentTop, setCurrentTop] = useState({})
  //Mouse event function testing
  function handleHover(e) {
    e.preventDefault()
    console.log("function works!")
    setCurrentStyle({})
  }
  //Mouse event function testing
  function handleLeave(e) {
    e.preventDefault()
    console.log("function works!")
    setCurrentStyle({})
  }
  //Mouse movement follow
  function mouseMovement(e) {
    e.preventDefault()
    console.log("X" + e.pageX)
    console.log("Y" + e.pageY)
    setCurrentTop({ left: e.clientX, top: e.clientY })
  }
  return (
    <StaticQuery
      query={graphql`
        {
          allWordpressWpPortfolio {
            edges {
              node {
                id
                slug
                title
                excerpt
                content
                featured_media {
                  source_url
                }
              }
            }
          }
        }
      `}
      render={props => (
        <PortfolioItemsWrapper>
          {/* <PortfolioItemsWrapper> */}
          <PortfolioItems>
            {/* -------- */}
            {/* Image distort filter */}
            {/* -------- */}
            {/* <Svg>
                <filter id="noise">
                  <feTurbulence
                    baseFrequency="0.02 0.03"
                    result="NOISE"
                    numOctaves="1"
                    id="turbulence"
                  />
                  <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="20" />
                </filter>
              </Svg> */}
            {/* -------- */}
            {props.allWordpressWpPortfolio.edges.map(portfolioItem => (
              <PortfolioItem
                style={currentStyle}
                key={portfolioItem.node.id}
                onMouseOver={handleHover}
                onMouseOut={handleLeave}
              >
                <PortfolioItemNameLink
                  onMouseEnter={mouseMovement}
                  onMouseLeave={mouseMovement}
                  to={`/portfolio/${portfolioItem.node.slug}`}
                >
                  {/* <Link to={`/portfolio/${portfolioItem.node.slug}`}>
                  <h2>{portfolioItem.node.title}</h2>
                </Link> */}
                  <PortfolioImage
                    style={currentTop}
                    src={portfolioItem.node.featured_media.source_url}
                    alt="Thumbnail"
                  />
                  <PortfolioItemNameLinkText>
                    {portfolioItem.node.title}
                  </PortfolioItemNameLinkText>
                </PortfolioItemNameLink>
              </PortfolioItem>
            ))}
          </PortfolioItems>
        </PortfolioItemsWrapper>
      )}
    />
  )
}

export default PortfolioItemsText
