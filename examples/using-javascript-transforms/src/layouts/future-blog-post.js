/*
We don't actually use this anywhere currently, but would love to. It makes sense to include
 these data-type agnostic, but blog post specific components here. However, we cannot run graphql
 queries within the layouts, so all of our data is in the children of this component. This is wrapping
 both the markdown converted into a react component AND our javascript which is required directly.
 Since we cannot use this component, we move these components into templates/markdown.js and each
 javascript file will need to add these components.
*/

import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import moment from 'moment';

class BlogPostTemplate extends React.Component {
  render() {
      let frontmatter = this.props.data;
      let siteMetadata = this.props.siteMetadata;

      const home = (
        <div className='nav'>
          <div className='container'>
            <div className='nav-left'>
              <Link
                className='nav-item is-tab is-active'
                to={ '/' }>
                Home
              </Link>
            </div>
          </div>
        </div>
      );

      if (frontmatter.updated === null) {
        var published = (
          <div className='date-published'>
            <p><em>published { moment(frontmatter.written).format('D MMM YYYY') }</em></p>
          </div>
        );
      } else {
        var published = (
          <div className='date-published'>
            <p><em>originally published { moment(frontmatter.written).format('D MMM YYYY') } and
                    updated { moment(frontmatter.updated).format('D MMM YYYY') }</em></p>
          </div>
        );
      }

      return (
          <div className='ArticleTemplate'>
            <Helmet
              title={ frontmatter.title }
              meta={[
                { name: 'description', content: frontmatter.description },
                { property: 'og:url', content: ('https://www.jacobbolda.com/'+frontmatter.path) },
                { property: 'og:description', content: frontmatter.description },
                { property: 'og:type', content: 'article' },
                { property: 'og:article:author', content: 'Jacob Bolda' },
                { property: 'og:article:published_time', content: moment(frontmatter.written, 'YYYY-MM-DD') },
                { property: 'og:article:modified_time', content: moment(frontmatter.updated, 'YYYY-MM-DD') },
                { property: 'og:article:tag', content: frontmatter.category },
                { name: 'twitter:label1', content: 'Category' },
                { name: 'twitter:data1', content: frontmatter.category },
                { name: 'twitter:label2', content: 'Written' },
                { name: 'twitter:data2', content: frontmatter.written },
              ]}
            />
            { home }
            <div className='container'>
              { this.props.children() }
            </div>
            <div className='footer container'>
              { published }
              <hr />
              <p>
                { siteMetadata.siteDescr }
                <a href={ siteMetadata.siteTwitterUrl }>
                  <br></br> <strong>{ siteMetadata.siteAuthor }</strong> on Twitter</a>
              </p>
            </div>
          </div>
          );
  }
}

export default BlogPostTemplate;
