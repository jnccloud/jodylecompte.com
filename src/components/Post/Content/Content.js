// @flow strict
import React from "react";
import styles from "./Content.module.scss";

type Props = {
  body: string,
  title: string
};

const Content = ({ body, title, socialImage, tableOfContents }: Props) => (
  <div className={styles["content"]}>
    <h1 className={styles["content__title"]}>{title}</h1>
    <div className={styles["content__body"]}>
      <div>
        <img src={socialImage} />
        <h2>Table of Contents</h2>
        <div dangerouslySetInnerHTML={{ __html: tableOfContents }}></div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </div>
  </div>
);

export default Content;
