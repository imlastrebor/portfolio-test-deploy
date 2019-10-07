import React from "react"
import Layout from "../components/layout_scroll"
import styled from "styled-components"
import { graphql } from "gatsby"

const PortfolioWrapper = styled.div`
  max-width: 90%;
  max-height: 90vh;
  margin: auto;
  margin-top: -20px;
  overflow-y: scroll;
`
const PortfolioInner = styled.div`
  margin: auto;
  padding-bottom: 50px;
`
const FeaturedImage = styled.img`
  max-width: 300px;
  margin: 16px 0;
  margin: auto;
  display: block;
`
const PortfolioText = styled.div`
  color: #fff;
`

const GalleryTitle = styled.div`
  color: #fff;
  text-align: center;
`
const GalleryCaption = styled.div`
  color: #fff;
  text-align: center;
`
const GalleryImg = styled.img`
  max-width: 300px;
  margin: auto;
  display: block;
`
export default ({ pageContext, data }) => (
  <Layout>
    {console.log("------------------")}
    {console.log(pageContext)}
    {console.log("------------------")}

    <PortfolioWrapper>
      <PortfolioInner>
        <h1>{pageContext.title}</h1>
        <FeaturedImage src={pageContext.featured_media.source_url} />
        <PortfolioText
          dangerouslySetInnerHTML={{ __html: pageContext.content }}
        />

        {pageContext.acf.portfolio_gallery.map(galleryItem => (
          <div key={galleryItem.id}>
            <GalleryTitle
              dangerouslySetInnerHTML={{ __html: galleryItem.title }}
            />
            <GalleryImg
              src={galleryItem.localFile.childImageSharp.fixed.src}
              alt={galleryItem.caption}
            />
            <GalleryCaption
              dangerouslySetInnerHTML={{ __html: galleryItem.caption }}
            />
          </div>
        ))}
      </PortfolioInner>
    </PortfolioWrapper>
  </Layout>
)

export const portfolioQuery = graphql`
  query {
    wordpressWpPortfolio {
      acf {
        portfolio_gallery {
          id
          localFile {
            childImageSharp {
              fixed(width: 300, height: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
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
          acf {
            portfolio_item {
              portfolio_item_title
              portfolio_item_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            portfolio_gallery {
              title
              id
              localFile {
                childImageSharp {
                  fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
