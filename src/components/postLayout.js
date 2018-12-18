import React from 'react';
import { graphql } from 'gatsby';
import Layout from './layout';

const postLayout = ({ data, location }) => (

  <Layout location={location}>
    <div>
      <h1>Post Layout</h1>
      <div dangerouslySetInnerHTML={{
        __html: data.markdownRemark.html
      }} />
    </div>
  </Layout>
);


export default postLayout;

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: {
      slug: {
        eq: $slug
      }
    }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`;
