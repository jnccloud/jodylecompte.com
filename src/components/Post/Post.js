// @flow strict
import React from "react";
import { Link } from "gatsby";
import Author from "./Author";
import Comments from "./Comments";
import Content from "./Content";
import Meta from "./Meta";
import Tags from "./Tags";
import styles from "./Post.module.scss";

const Post = ({ post }) => {
  const { html, tableOfContents } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date, socialImage } = post.frontmatter;

  return (
    <div className={styles["post"]}>
      <Link className={styles["post__home-button"]} to="/">
        All Posts
      </Link>

      <div className={styles["post__content"]}>
        <Content
          body={html}
          title={title}
          socialImage={socialImage}
          tableOfContents={tableOfContents}
        />
      </div>

      <div className={styles["post__footer"]}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles["post__comments"]}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
