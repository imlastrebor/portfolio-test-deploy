import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import { Carousel } from "react-responsive-carousel"
import styled from "styled-components"

const SliderContainer = styled.div`
  width: 50%;
  height: 500px !important;
  margin: auto;
`

const PortfolioCarousel = styled(Carousel)`
  margin: auto;
`

const PortfolioItemName = styled(Link)`
  position: fixed;
  bottom: 0;
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

const DemoCarousel = () => {
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
        <SliderContainer>
          <PortfolioCarousel showThumbs={false} infiniteLoop={true}>
            {props.allWordpressWpPortfolio.edges.map(portfolioItem => (
              <div>
                <img src={portfolioItem.node.featured_media.source_url} />
                <PortfolioItemName
                  className="legend"
                  to={`/portfolio/${portfolioItem.node.slug}`}
                >
                  <h2>{portfolioItem.node.title}</h2>
                </PortfolioItemName>
              </div>
            ))}
          </PortfolioCarousel>
        </SliderContainer>
      )}
    />
  )
}

// const DemoCarousel = ({ data }) => (
//   <Carousel autoPlay>
//     {console.log(data.site.siteMetadata.title)}
//     <div>
//       <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
//       <p className="legend">ledegnge</p>
//     </div>

//     <div>
//       <img src="http://lorempixel.com/output/cats-q-c-640-480-6.jpg" />
//       <p className="legend">Legend 6</p>
//     </div>
//   </Carousel>
// )

export default DemoCarousel
