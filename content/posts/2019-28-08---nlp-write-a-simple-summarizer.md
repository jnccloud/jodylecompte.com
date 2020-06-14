---
title: Write a Simple Summarizer with Python and Natural Language Processing
date: "2019-08-27T20:40:32.169Z"
template: "post"
draft:
slug: "/posts/nlp-write-a-simple-summarizer/"
category: "Machine Learning"
tags:
  - "Natural Language Processing"
  - "Python"
description: "Natural language processing is a branch of machine learning dealing with analyising or creating natural speech. We will be using the basic techniques of NLP to summarize paragraphs of text. "
socialImage: "/media/nlp.jpg"
---

## Prerequisites

This article assumes that you are familiar with programming in Python and downloading and installing
third-party Python packages via Pip. No experience with natural language processing or machine
learning required as we will be starting from scratch.

You must already have a Python version of 3.2 or greater installed; we will cover installing the NLTK library and corpus.

## What is natural language processing (NLP)?

Natural language processing is the study of natural language both written and verbal using algorithms and technology.
It is the nexus point of many fields such as linguistics, machine learning, data science, and programming. It can be used for a wide variety of things such as sentiment analysis of a piece of text to determine the mood of the writer, dictating spoken language into text, or summarizing large bodies of text into smaller bodies of text.

## Natural Language Toolkit

We could, without a large amount of difficulty code this entire project from scratch. We will instead be using a very powerful and battle tested library called NLTK for Python. This will allow us to keep our code very high level and focus on the process of summarizing text more than purely details about syntax.

## How to Summarize Test Programmatically

Python and NLTK are only one lineup to tackle this problem; but most naive summarizers such as this one will follow a very similar process to that which I describe below. We'll start with the theory, then dive into a working code example.

### Data Gathering

The first step to any data related problem is to properly obtain the data we are going to be working with and getting it in a medium in which we can easily begin clean-up and other preparations. For this experiment, we will be loading text in from a file but you could easily modify this to scrape from your favorite news site or RSS feed.

### Data Setup / Preparation

Data prep and clean-up will almost always be the most time consuming and tedious portion of any machine learning or data science endeavor. The better we do here, the better the outcome of the whole project. This is not the stage where we can skimp on the details.

The real world is random and chaotic and often data is as well. This is the stage where we get the data in the shape and format we need to begin working with it. For example, "stop words" such as `to` and `a` and punctuation are not relevant to the grading and scoring process of our code, therefore we will remove it before getting started.

Other common scenarios you may run into is needing to scale data that is in two different extremes or correcting incomplete or incorrect data in a dataset. In our example here, we will be using our preparation phase to weed out stop words and punctuation.

### Tokenization

Tokenization is the process by which we will take our sentences and break them down by the words they contain. You may already be familiar with this as it forms the foundation of a lot of other approaches such as compiling or interpretting source code.

We will look at this much closer in a moment with supporting code as well, but in short, given the following sentence:

```
The giant yellow bumblebee flew to the next juicy yellow flower.
```

We should the receive something very similar to this:

```
{
  'giant': 1,
  'yellow: 2,
  'bumblebee': 1,
  'flew': 1,
  'next': 1,
  'juicy': 1,
  'flower: 1
}
```

There are a few take-aways you should make note of at this point:

- Notice that for `yellow` we have a quantity of 2, this plays into the weight / score in the next section
- Notice that punctuation and stop words like `the` or `to` have been removed. They are not important to the overall
  summary in this case, but in future NLP projects you may choose to include them depending on what you are doing.

### Weighing and Scoring

This model will be based off a somewhat naive but still effective strategy of scoring based on frequency as we started doing in the example above. Each final word token will have a score associated with it equal to the number of times it appeared in the paragraph text. Ultimately we will then score sentences based on their words and the top ranking sentences will become our summary.

Let's go ahead and move onto some more concrete examples. Don't worry if things are still a little unclear as they will probably make much more sense with a little code.

## Environment Setup

Let's start by creating a directory and installing the Python packages we will need. The below examples reference Virtualenv, but it is not required to follow along with this tutorial. For more information on Virtualenv see: [Taming Python Dependencies with Virtualenv](https://jodylecompte.com/posts/taming-python-dependencies/)

```
$ mkdir nlp-simple-summarizer && cd npl-simple-summarizer
$ virtualenv venv
$ source venv/bin/activate
$ pip3 install nltk
$ python3
```

Once the library has been installed, we can go into the Python REPL to install the corpus.

```
>>> import nltk
>>> nltk.download('punkt')
>>> nltk.download()
```

This should result in a screen that appears at least mostly similar to the following:

![Download Data Tool for NLTK](/media/nlpdownload.png)

I selected All Corpora, but feel free to check out some of the other great reference materials in this collection.

## Locate Some Text

The first step to summarizing some text is that we need to locate some text. I've chosen the following story made freely
available by [Voice of America](https://www.voanews.com/africa/malawi-grooms-future-female-scientists-through-science-camp).

[Malawi Grooms Future Female Scientists Through Science Camp](https://www.voanews.com/africa/malawi-grooms-future-female-scientists-through-science-camp)

I simply grabbed the text off this page by copying and pasting, but you can also grab a copy from Github [here](https://github.com/jodylecompte/NLP-Simple-Summarizer/blob/main/data.txt). I did not do any cleanup or formatting of this text except to remove images as this will be something we handle with our code.

## Create a Text Summary

We will now trace our way back through the steps earlier, this time writing code to do the job for us.

Create a new directory called `src` and a file called `summarize.py` where our code will live with the following contents.

```
$ mkdir src
$ touch src/summarizer.py
```

```python
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from string import punctuation
from nltk.probability import FreqDist
from heapq import nlargest
from collections import defaultdict
```

Don't worry about these just yet, we'll review each one as we use them. If you execute your summarizer.py file and do not get any errors then that verifies our install was successful.

### Clean Up Text

The amount of work that needs to be done at this step will largely depend on the source and quality of your data. For example, if you had scraped the content dynamically using BeautifulSoup or similar, you'd have to write code to clean all the un-related HTML tags out.

We will simply be loading in the contents from the file and replacing a few common things like line breaks and tabs.

```python
with open("data.txt") as f:
    data = f.read()
    replace = {
        ord('\f') : ' ',
        ord('\t') : ' ',
        ord('\n') : ' ',
        ord('\r') : None
    }

    content = data.translate(replace)

print(data)
```

After re-running your script, you should get the output text in one continuous run-on paragraph.

### Tokenizing the Text

The next step will be to tokenize the text. For brievity, only breaking the text out into tokens by individual words was mentioned, but we will also be doing so with sentences. This is what allows us to determine the final sentence score and pick our strongest sentences for the final summary.

```python
stop_words = set(stopwords.words('english') + list(punctuation))
words = word_tokenize(content.lower())

word_tokens = [word for word in words if word not in stop_words]
sentence_tokens = sent_tokenize(content)

print(word_tokens)
print(sentence_tokens)
```

We start by creating a set which will contain the English stop words (words like 'it' or 'the') as well as punctuation
that we have loaded from the NLTK corpus.

We use the NLTK provided `word_tokenize` function to create a list of every unique word in the example text, and `sent_tokenize` to do the thing for each unique sentence. The subsequent list comprehension simply steps through and for each word in our list, if it is not one of our stop words or punctuation then it adds it to our list stored in `word_tokens`.

### Score Our Tokens

As described above, now that we have a list of the most important words and the sentences they make up, we can score everything.
We will be utilizing a build in function as well as a from-scratch implementation of essentially the same code so that you can see it both ways.

```python
word_freq = FreqDist(word_tokens)

ranking = defaultdict(int)

for i, sentence in enumerate(sentence_tokens):
    for word in word_tokenize(sentence.lower()):
        if word in word_freq:
            ranking[i] += word_freq[word]

print(ranking)
```

The first line utilizes a built-in function that takes our list of words and produces a frequency map where each key is a word and each value is a number of occurances for that word, more or less identical to our earlier example. This gives us the benefit of not only totaling up our score, but also giving us a consistent lookup time utilizing the hash map characteristics of a Python dictionary.

To better understand how this works, we will score our sentences using a default dictionary. It then proceeds to step through each sentence, and then checking each word of the sentence against the frequency map we generated at the previous step and incrementing that total sentences score.

The magic here is that a default dictionary will automatically create the missing index when we try to add a value if we have not seen that particular index before. Because we assigned the type Int, that default value starts with 0 making it a perfect data structure for creating frequency maps.

### Putting It All Together

That's a wrap! If everything went according to plan, you should have an output of each of your sentences by number and their score. This is the final information we need to put together the summary!

```python
indexes = nlargest(5, ranking, key=ranking.get)
final_sentences = [sentence_tokens[j] for j in sorted(indexes)]
print(' '.join(final_sentences))
```

The `nlargest` function is another function that we brought in to make this job easier on us, it accepts the ranking list we made earlier and can give us the N number of sentences we want. The first parameter is to signify we want five results (sentences) from the ranking table we created previously.

## The Final Picture

If you used the same beginning news story as me, your summary should have been output along the lines of this:

```
THYOLO, MALAWI - One hundred teenage girls from high
schools in Malawi recently attended a "Girls in Science"
camp at the Malawi University of Science and Technology,
known as MUST. Actually when we go to the population, 52
percent of Malawi population is female, but when we go
through the landscape of science and technologies and
innovation, you find that the number of females is lower,”
Mweta said. Role model and Engineering Student at MUST,
Rachael Nyanda  shared her knowledge with the campers
Rachael Nyanda shared her knowledge with the campers.
“Even if I go home now, I know how to program an app,
as if I see any other problems I am pretty sure I am
able to able to find some solutions to it and create
more apps and help a lot of people in Malawi,” Juma
said. “We have learned about ecology, like they have
taught us how to catch mammals so that we can make
some other experiments, let’s say, test their blood
sample like to find out the diseases that
affect birds…” Sipyagule said.
```

Given the simplicity of our model, that's not too shabby!

## Conclusion

Machine learning and natural language processing can both be a little bit intimidating when you
are first getting started, but I hope this project has helped you to get started and feel a little
more confident about it. If you had a good time working on this, I suggest doing some research into
some more advanced techniques that will more consistent produce quality summaries.

You can find the finished code on [Github](https://github.com/jodylecompte/NLP-Simple-Summarizer).
