import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"

const SiteInfoWrapper = styled.div`
  flex-grow: 1;
  color: white;
  margin: auto 0;
`

const SiteTitle = styled(Link)`
  font-weight: bold;
  color: white;
  text-decoration: none;
  font-size: 1.5em;
`

const SiteInfo = () => (
  <StaticQuery
    query={graphql`
      {
        allWordpressSiteMetadata {
          edges {
            node {
              name
              description
            }
          }
        }
      }
    `}
    render={props => (
      <SiteInfoWrapper>
        <SiteTitle to={`/`}>
          {props.allWordpressSiteMetadata.edges[0].node.name}
        </SiteTitle>
        <div>{props.allWordpressSiteMetadata.edges[0].node.description}</div>
      </SiteInfoWrapper>
    )}
  />
)

export default SiteInfo
