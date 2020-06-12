// @flow strict
import React from "react";
import { getContactHref } from "../../../utils";
import styles from "./Author.module.scss";
import { withPrefix } from "gatsby";
import { useSiteMetadata } from "../../../hooks";

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles["author"]}>
      <div>
        <img
          src={withPrefix(author.photo)}
          className={styles["author__photo"]}
          width="150"
          height="150"
          alt={author.name}
        />
      </div>
      <div className={styles["author__bio_box"]}>
        <h3>About the Author</h3>
        <p className={styles["author__bio"]}>
          {author.bio}
          <a
            className={styles["author__bio-twitter"]}
            href={getContactHref("twitter", author.contacts.twitter)}
            rel="noopener noreferrer"
            target="_blank"
          >
            Follow <strong>{author.name}</strong> on Twitter
          </a>
        </p>
      </div>
    </div>
  );
};

export default Author;
