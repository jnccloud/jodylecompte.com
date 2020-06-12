// @flow strict
import React, { useState } from "react";
import { graphql, withPrefix } from "gatsby";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Page from "../components/Page";
import { useSiteMetadata } from "../hooks";

const Portfolio = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const [isOpen, setOpen] = useState(false);

  return (
    <Layout title={`Portfolio - ${siteTitle}`}>
      <Sidebar />
      <Page title="Portfolio">
        <div>
          <h2>SlimWhizzy</h2>
          <div>
            <img
              src={withPrefix("media/portfolio/slimwhizzy.png")}
              style={{
                maxWidth: "300px",
                margin: "0 auto"
              }}
              alt=""
            />
          </div>
          <div>
            <p>
              SlimWhizzy is a micro-framework written in vanilla JavaScript.
              It's designed to make it easy to build interactive WYISWYIG text
              editors inside the browser. It is available on{" "}
              <a href="https://www.npmjs.com/package/slimwhizzy">NPM</a>.
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>
                <strong style={{ color: "#3a539b" }}>Technology Used: </strong>{" "}
                JavaScript
              </span>
              <a style={{color: 'black'}} href="https://slimwhizzy.jodylecompte.com">Demo </a>
              <a style={{color: 'black'}} href="https://github.com/jodylecompte/SlimWhizzy">Code</a>
            </div>
          </div>
          <h2>A Daily Copy</h2>
          <div>
            <img src={withPrefix("media/portfolio/dailycopy.png")} alt="" />
          </div>
          <div>
            <p>
              A Daily Copy is a ReactJS powered website created to help people
              get better at copywriting by providing a randomly generated
              training excercise to practice writing a piece of sales copy every
              day.
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>
                <strong style={{ color: "#3a539b" }}>Technology Used: </strong>{" "}
                React, GatsbyJS, BulmaCSS
              </span>
              <a style={{color: 'black'}} href="https://adailycopy.com">Demo </a>
              <a style={{color: 'black'}} href="https://github.com/jodylecompte/adailycopy.com">Code</a>
            </div>
          </div>
        </div>
      </Page>
    </Layout>
  );
};

export default Portfolio;
