import React, { useState } from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"
import ItemsCarousel from "react-items-carousel"

const PortfolioWrapper = styled.div`
  width: fit-content;
  height: 100vh;
`
const PortfolioTitleWrapper = styled.div`
  display: block;
  margin: auto;
  width: fit-content;
  background: pink;
  margin-top: 200px;
`
// const Wrapper = styled.div`
//   display: block;
//   margin: auto;
//   width: fit-content;
//   background: pink;
// `

const PortfolioTitle = styled(Link)`
  text-align: center !important;
  background-color: #333;
  text-decoration: none;
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #fff;
  transition: 0.25s linear;
  font-size: 4em;
  &:hover {
    color: #fff;
  }
`

const Img = styled.img`
  max-width: 300px;
  margin-top: 100px;
  opacity: 0.3;
  transition: 0.4s linear;
  ${PortfolioTitle}:hover & {
    display: none;
  }
`

const ItemCarousel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const chevronWidth = 40
  const isMobile = window.innerWidth <= 1024
  let itemsCount
  if (isMobile) {
    itemsCount = 1
  } else {
    itemsCount = 3
  }
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
            }
          }
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
        // style={{ padding: `0 ${chevronWidth}px` }}
        <div>
          {console.log(
            props.allWordpressWpPortfolio.edges.map(edge => edge.node.title)
          )}

          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={itemsCount}
            gutter={50}
            leftChevron={<button>{"<"}</button>}
            rightChevron={<button>{">"}</button>}
            outsideChevron
            chevronWidth={chevronWidth}
          >
            {props.allWordpressWpPortfolio.edges.map(edge => (
              <PortfolioWrapper>
                <Img
                  src={edge.node.featured_media.source_url}
                  // style={{
                  //   backgroundImage: `url(${edge.node.featured_media.source_url})`,
                  // }}
                />
                <PortfolioTitleWrapper>
                  <PortfolioTitle to={`/portfolio/${edge.node.slug}`}>
                    {edge.node.title}
                  </PortfolioTitle>
                </PortfolioTitleWrapper>
              </PortfolioWrapper>
            ))}
          </ItemsCarousel>
        </div>
      )}
    />
  )
}

export default ItemCarousel
