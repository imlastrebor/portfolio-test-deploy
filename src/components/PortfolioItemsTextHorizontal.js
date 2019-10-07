import React, { useState } from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"

const Wrapper = styled.div``

// const PortfolioImageWrapper = styled.div``

const PortfolioItemsWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 960px;
  margin: auto;
  margin-top: 100px;
  max-height: 300px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
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

  @media only screen and (max-width: 1024px) {
    overflow-x: hidden;
    overflow-y: scroll;
    white-space: normal;
    position: static;
    max-height: 80vh;
    max-width: 400px;
  }
`

const PortfolioItem = styled.div`
  height: 100%;
  margin: 40px;
  display: inline-block;
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
  &:after {
    content: "";
    background-image: ${props => `url(${props.itemimage}) `};
    background-size: 100%;
    width: 300px;
    height: 300px;
    opacity: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.25s linear;
    z-index: -1;
    visibility: hidden;
  }
  &:hover&:after {
    opacity: 0.7;
    visibility: hidden;
  }
`
const PortfolioItemNameLinkText = styled.h2`
  display: inline-block;
  margin: 0;
  font-size: 4em;
`

// const PortfolioImage = styled.img`
//   max-width: 300px;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: -5;
//   opacity: 1;
//   display: none;
// `
const PortfolioItemImage = styled.img`
  max-width: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -5;
  opacity: 0;
`
const Logo = styled.img`
  max-width: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -5;
  opacity: 1;
  visibility: visible;
  transition: 0.25s linear;
`
// --------------
//   Styles end
// --------------

const PortfolioItemsTextHorizontal = () => {
  const [logoStyle, setLogoStyle] = useState({})
  const [imageStyle, setImageStyle] = useState({})

  function changeStyle(e) {
    e.preventDefault()
    setLogoStyle({ visibility: "hidden", opacity: "0" })
    setImageStyle({ visibility: "visible", opacity: "1" })
  }
  function resetStyle(e) {
    e.preventDefault()
    setLogoStyle({ visibility: "visible", opacity: "1" })
    setImageStyle({ visibility: "hidden", opacity: "0" })
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
          wordpressWpMedia(title: { in: "logo-05-svg" }) {
            source_url
            title
            id
          }
        }
      `}
      render={props => (
        <Wrapper>
          <Logo
            style={logoStyle}
            key={props.wordpressWpMedia.id}
            src={`${props.wordpressWpMedia.source_url}`}
            alt="Logo"
          />
          {/* {console.log(props.wordpressWpMedia.source_url)}
          <PortfolioImageWrapper>
            {props.allWordpressWpPortfolio.edges.map(edge => (
              <PortfolioImage
                style={imageStyle}
                key={edge.node.id}
                src={edge.node.featured_media.source_url}
                alt="Thumbnail"
              />
            ))}
          </PortfolioImageWrapper> */}

          <PortfolioItemsWrapper>
            {props.allWordpressWpPortfolio.edges.map(portfolioItem => (
              <PortfolioItem key={portfolioItem.node.id}>
                <PortfolioItemImage
                  style={imageStyle}
                  id={portfolioItem.node.id}
                  src={portfolioItem.node.featured_media.source_url}
                  alt="PortfolioItemImage"
                />
                <PortfolioItemNameLink
                  to={`/${portfolioItem.node.slug}`}
                  itemimage={`${portfolioItem.node.featured_media.source_url}`}
                  onMouseEnter={changeStyle}
                  onMouseLeave={resetStyle}
                >
                  <PortfolioItemNameLinkText>
                    {portfolioItem.node.title}
                  </PortfolioItemNameLinkText>
                </PortfolioItemNameLink>
              </PortfolioItem>
            ))}
          </PortfolioItemsWrapper>
        </Wrapper>
      )}
    />
  )
}

export default PortfolioItemsTextHorizontal
