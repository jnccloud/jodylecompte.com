"use strict";

module.exports = {
  url: "https://jodylecompte.com",
  pathPrefix: "/",
  title: "JodyLeCompte.com",
  subtitle: "Blog posts about technology, programming, and SalesForce.",
  copyright: `© ${new Date().getFullYear()} Jody LeCompte. All Right Reserved. Bootstapped with Gatsby-Starter-Lumen.`,
  disqusShortname: "",
  postsPerPage: 5,
  googleAnalyticsId: "UA-136589283-1",
  useKatex: false,
  menu: [
    {
      label: "Posts",
      path: "/",
    },
    {
      label: "About Me",
      path: "/pages/about",
    },
    // {
    //   label: "Portfolio",
    //   path: "/portfolio"
    // },
    {
      label: "Categories",
      path: "/categories",
    },
    {
      label: "Tags",
      path: "/tags",
    },
  ],
  author: {
    name: "Jody LeCompte",
    photo: "/photo.jpg",
    bio:
      "I am a father, fisherman, and full stack developer dedicated to helping others to learn and reach their maximum potential while I work to reach my own.",
    contacts: {
      email: "jody@jodylecompte.com",
      twitter: "jody_lecompte",
      linkedin: "jody-lecompte-7b562812b/",
      codepen: "jodylecompte",
      github: "jodylecompte",
    },
  },
};
