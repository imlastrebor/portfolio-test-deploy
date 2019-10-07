import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

const Wrapper = styled.div`
  margin-top: 100px;
`
const Title = styled.h1`
  color: white;
`
const Content = styled.p`
  color: white;
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Wrapper>
      <Title>NOT FOUND</Title>
      <Content>
        You just hit a route that doesn&#39;t exist... the sadness.
      </Content>
    </Wrapper>
  </Layout>
)

export default NotFoundPage
