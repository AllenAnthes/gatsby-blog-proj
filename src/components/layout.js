import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Spring } from 'react-spring';
import Archive from './archive';
import Header from './header';
import './layout.css';

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
`;

const SITE_TITLE_QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: {
      regex: "/bg/"
    }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }

  }
`;

const Layout = ({ children, location }) => (
  <StaticQuery
    query={SITE_TITLE_QUERY}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title}/>
        {/*{location.pathname === '/' &&}*/}
        <Spring
          from={{ height: 100 }}
          to={{ height: location.pathname === '/' ? 200 : 100 }}
        >
          {styles => (
            <div style={{ overflow: 'hidden', ...styles }}>
              <Img fluid={data.file.childImageSharp.fluid}/>
            </div>
          )}

        </Spring>
        <MainLayout>
          <div>
            {children}
          </div>
          <Archive/>
        </MainLayout>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  location: {},
};

export default Layout;
