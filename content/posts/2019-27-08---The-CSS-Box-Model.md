---
title: The CSS Box Model - How Browsers Size Things
date: "2019-08-26T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/the-css-box-model/"
category: "Web Development"
tags:
  - "Design"
  - "CSS"
description: "Sizing elements on your web pages can sometimes be a little tricky. You set your width and your height, you did all the math, and even drew a wireframe. Now something is off with everything's sizing. Why does this happen sometimes?"
socialImage: "/media/measurement.jpeg"
---

## Prerequisites

The only requirement for reading this article is a basic understanding of HTML and CSS. It is intended for beginning level developers, but more advanced developers may still benefit from the review.

This post will not cover newer additions to CSS such as Flexbox or CSSGrid. Their behavior each warrants one if not several blog posts on their own.

## Little Boxes on the Internet

The web in a nutshell is not so dissimilar from a set of Matryoshka dolls.

![A small set of Matryoshka or Russian Stacking Dolls](/media/stacking-doll.jpeg)

It all begins with the largest box, your `<body>` tag and then you work your way through adding smaller boxes and their contents until you have the page you imagined.

## Element Levels: Inline Vs Block

Having removed Grid and Flexbox from discussions for now, the two most common are block level and inline level elements.

We will build our way up to full impact of this setting, but let's start by re-visiting the idea of the idea of <body> as the largest box. There are a few distinctions that define a block level element's sizing:

- Each element will appear on a new line, stacked one above the next.
- Each element will have a width of 100% of its parent character.
- Each element will only have the height necessary to contain itself and it's children

As a reminder, these rules are only _default_ behavior. They can and often will be over-written by CSS frameworks, UI kits, and especially even your own code.

The other most common level of elements are inline elements which behave much more like the soft and flexible contents than a rigid container. To contrast their behavior:

- Each element will appear side by side until forced to wrap by the width constraints introduced by it's container or the browser window.
- Each element will only take only as much space as necessary.
- Setting an explicit height or width has no effect as these are properties of block level elements.

The most iconic example of a block level element is the `div` element while `button` and `anchor` are common inline level elements.

There is also a hybrid level called inline-block. As the name suggests, these are a "best of both worlds" element that can be laid in a row, but also behave like blocks with explicit height and width. A good example of this is buttons on a navigation bar.

## The CSS Box Model

The model that is used to describe these boxes and their atomic units is called The CSS Box model and is pictured below.

![CSS Box Model Diagram](/media/box-model.png)

There are several models that dictate how the above is translated into a real element, but by default it is based on the content box or the dark red rectangle at the center.

When you explicitly set a width or a height on an element, it's not unreasonable at all to assume that this will end up being the final width and height of your element, right? In actuality, what happens is just the content box is set to that height and width.

After the fact, then the border size, margin size, and padding size are all added to the size you set; resulting in an element that can be quite different from what you imagined.

Consider the following CSS:

```css
.element {
  width: 100px;
  margin: 15px;
  padding: 15px;
  border: 2px solid #000;
}
```

I suspect the average beginner would expect a box that is 100px wide, of which 15px is margin, 15px is padding, and 2px is border. In actuality, the box is 164 pixels.

```
 15px +  // Left Margin
  2px +  // Left Border
 15px +  // Left Padding
100px +  // Content Box
 15px +  // Right Padding
  2px +  // Right Border
 15px    // Right Margin
```

### Aside: Inline level elements

As a reminder, height and width is ignored by inline level elements. All other behavior described above is the same for both.

## Box Sizing - Border-Box

There is an alternative setting that is worth considering as a default for your projects. It is, in my opinion, a much more coherent choice because it matches the mental model that people would naturally expect.

A height or width you set is applied to the border-box instead of the content box. he trade off is that since your element won't grow, extra space is removed from the content box instead. A mistake here can lead to insufficient space for your content and strange wrapping or alignment issues.

You must also be mindful of your margin. Even though it's outside of the visible portion of your element, it is still part of the total size and effects your elements placement inside its parent container.

To re-visit our previous example, with box sizing of border box, our element would now be 100 pixels wide as we have designated (without margin), but the content box will now only be 66 pixels wide. You can see a real example and experiment using this [CodePen](https://codepen.io/jodylecompte/pen/XOaLpw).

## Border-Box as a Default

If border-box sizing sounds like the behavior you are used to but you haven't made the change yourself, it may be because of your CSS framework of choice. A lot of developers agree that border-box tends to be a more sane default for sizing and frameworks such as Bootstrap often set the box-sizing for all elements. Normalize.CSS has this same behavior as well.

When in doubt, you can always inspect the element with your browser's developer tools. This will allow you to see the browser generated box model for that particular element and see precisely how the browser decided to size it.

## Conclusion

CSS is very simple syntactically, but it carries a lot of nuance and gotchas in its application. There are element levels such as inline-flex or positioning options such as fixed positioning that will change the rules slightly. You should still now feel comfortable knowing how 99% of your elements will be sized before you even get to the refresh button to check your latest code.
