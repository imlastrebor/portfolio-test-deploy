import React from "react"
//Change this to set scroll on/off
// "../components/layout" Scroll off
// "../components/layout_scroll" Scroll on
import Layout from "../components/layout"
import PortfolioItems from "../components/PortfolioItems"
import DemoCarousel from "../components/DemoCarousel"
import ItemCarousel from "../components/ItemsCarousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import PortfolioItemsText from "../components/PortfolioItemsText"
import PortfolioItemsTextHorizontal from "../components/PortfolioItemsTextHorizontal"

export default ({ pageContext }) => (
  <Layout>
    {/* <h1 dangerouslySetInnerHTML={{ __html: pageContext.title }} />
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} /> */}
    {/* <PortfolioItems /> */}
    {/* <PortfolioItemsText /> */}
    <PortfolioItemsTextHorizontal />
    {/* <ItemCarousel /> */}
    {/* <DemoCarousel /> */}
  </Layout>
)
