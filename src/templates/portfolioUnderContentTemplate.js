import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"

const AboutWrapper = styled.div`
  max-width: 90%;
  max-height: 90vh;
  overflow-y: scroll;
  margin: auto;
  margin-top: 70px;
`
const AboutInner = styled.div`
  margin: auto;
  padding-top: 50px;
  padding-bottom: 50px;
`
const AboutTitle = styled.div`
  color: #fff;
`
const AboutContent = styled.div`
  color: #fff;
`
export default ({ pageContext }) => (
  <Layout>
    <AboutWrapper>
      <AboutInner>
        <AboutTitle dangerouslySetInnerHTML={{ __html: pageContext.title }} />
        <AboutContent
          dangerouslySetInnerHTML={{ __html: pageContext.content }}
        />
      </AboutInner>
    </AboutWrapper>
  </Layout>
)
