import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"

const PortfolioItemsWrapper = styled.div`
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
`
const PortfolioImage = styled.img`
  max-width: 100%;
  opacity: 0.5;
`
const PortfolioItem = styled.div`
  height: 100%;
  width: 300px;
  border: 1px solid #efefef;
  padding: 16px;
  margin: 16px;
  &:hover ${PortfolioImage} {
    opacity: 1 !important;
  }
`

const PortfolioItemName = styled(Link)`
  margin-top: -50%;
  text-decoration: none;
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: red;
  &:hover {
    color: red;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: red;
  }
`

const PortfolioItems = () => {
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
          {props.allWordpressWpPortfolio.edges.map(portfolioItem => (
            <PortfolioItem key={portfolioItem.node.id}>
              <PortfolioImage
                src={portfolioItem.node.featured_media.source_url}
                alt="Thumbnail"
              />
              <PortfolioItemName to={`/portfolio/${portfolioItem.node.slug}`}>
                {/* <Link to={`/portfolio/${portfolioItem.node.slug}`}>
                  <h2>{portfolioItem.node.title}</h2>
                </Link> */}

                <h2>{portfolioItem.node.title}</h2>
              </PortfolioItemName>
            </PortfolioItem>
          ))}
        </PortfolioItemsWrapper>
      )}
    />
  )
}

export default PortfolioItems
