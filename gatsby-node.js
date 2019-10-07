const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createRedirect } = actions
  createRedirect({
    fromPath: "/",
    toPath: "/home",
    redirectInBrowser: true,
    isPermanent: true,
  })
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local WordPress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
                title
                content
                template
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create Page pages.
        const pageTemplate = path.resolve("./src/templates/page.js")
        const portfolioUnderContentTemplate = path.resolve(
          "./src/templates/portfolioUnderContentTemplate.js"
        )
        const portfolio = result.data.allWordpressPage.edges
        // We want to create a detailed page for each
        // page node. We'll just use the WordPress Slug for the slug.
        // The Page ID is prefixed with 'PAGE_'
        _.each(result.data.allWordpressPage.edges, (edge, index) => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.

          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.slug}/`,
            component: slash(
              edge.node.template === "portfolio_under_content.php"
                ? portfolioUnderContentTemplate
                : pageTemplate
            ),
            context: edge.node,
            // prev: index === 0 ? null : portfolio[index - 1].node,
            // next:
            //   index === portfolio.length - 1
            //     ? null
            //     : portfolio[index + 1].node,
          })
        })
      })
      // ==== END PAGES ====

      // ==== POSTS (WORDPRESS NATIVE AND ACF) ====
      .then(() => {
        graphql(
          `
            query {
              wordpressWpPortfolio {
                acf {
                  portfolio_gallery {
                    id
                    localFile {
                      childImageSharp {
                        fixed(width: 400, height: 400) {
                          src
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
                              fixed(width: 400, height: 400) {
                                src
                              }
                            }
                          }
                        }
                      }

                      portfolio_gallery {
                        title
                        id
                        caption
                        localFile {
                          childImageSharp {
                            fixed(width: 400, height: 400) {
                              src
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
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }

          //   {
          //     console.log("-------------------------------")
          //   }
          //   {
          //     console.log(
          //       result.data.allWordpressWpPortfolio.edges.map(edge =>
          //         edge.node.acf.portfolio_falley.map(
          //           galleryItem => galleryItem.localFile.childImageSharp.fluid.src
          //         )
          //       )
          //     )
          //   }
          //   {
          //     console.log("-------------------------------")
          //   }

          const portfolioTemplate = path.resolve("./src/templates/portfolio.js")

          // createPaginatedPages({
          //   edges: result.data.allWordpressWpPortfolio.edges,
          //   createPage: createPage,
          //   pageTemplate: './src/templates/portfolios.js',
          //   pageLength: 3,
          //   pathPrefix: 'portfolio'
          // })

          // We want to create a detailed page for each
          // post node. We'll just use the WordPress Slug for the slug.
          // The Post ID is prefixed with 'POST_'
          _.each(result.data.allWordpressWpPortfolio.edges, edge => {
            createPage({
              path: `/portfolio/${edge.node.slug}/`,
              component: slash(portfolioTemplate),
              context: edge.node,
            })
          })
          resolve()
        })
      })
    // ==== END POSTS ====
  })
}
