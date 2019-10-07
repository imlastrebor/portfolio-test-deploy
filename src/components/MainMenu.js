import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"
import SiteInfo from "./SiteInfo"

const MainMenuWrapper = styled.div`
  z-index: 5;
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: transparent;

  padding: 10px 0;

  /* -webkit-box-shadow: 0px 18px 15px -5px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 0px 18px 15px -5px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 18px 15px -5px rgba(0, 0, 0, 0.8); */
`

const MenuItem = styled(Link)`
  color: white;
  padding: 10px;
  display: block;
`

const MainMenuInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  width: 90%;
  height: 100%;
`

const MainMenu = () => (
  <StaticQuery
    query={graphql`
      {
        allWordpressWpApiMenusMenusItems(filter: { name: { eq: "mainmenu" } }) {
          edges {
            node {
              items {
                title
                object_slug
                object_id
              }
            }
          }
        }
      }
    `}
    render={props => (
      <MainMenuWrapper>
        <MainMenuInner>
          <SiteInfo />
          {props.allWordpressWpApiMenusMenusItems.edges[0].node.items.map(
            item => (
              <MenuItem to={`/${item.object_slug}`} key={item.title}>
                {item.title}
              </MenuItem>
            )
          )}
        </MainMenuInner>
      </MainMenuWrapper>
    )}
  />
)

export default MainMenu
