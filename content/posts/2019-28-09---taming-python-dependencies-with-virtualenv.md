---
title: Taming Python Dependencies with Virtualenv
date: "2019-09-28T20:40:32.169Z"
template: "post"
draft:
slug: "/posts/taming-python-dependencies/"
category: "Development"
tags:
  - "Package Management"
  - "Python"
description: "The default approach of installing Python packages can be problematic and lead to versioning issues. Let's look at an alternative approach."
socialImage: "/media/boxrack.jpeg"
---

<!-- ![A computer screen featuring code](/media/boxrack.jpeg) -->

## Prerequisites

This post makes the assumption that you are familiar with Python and installing packages with the Pip command line tool. It also assumes that you already have either Python2 or Python3 installed on your system.

All commands will work on Windows, Mac, and Linux unless otherwise stated.

## Introduction

If you are new to Python or always work with the latest library versions, it's likely you just use Pip to install everything globally.

This works fine at first,but can lead to problems quickly as your projects age. Imagine the following scenario.

You manage an application that is dependent on version 1.0 of AwesomePyLib, so you simply install it and move on. The problem enters when you begin managing a second application that relies on version 2.0 of the same library.

Now what do you do? Maybe you upgrade to 2.0, but now your first application is broken. So maybe you just update the code to both use 2.0, or maybe you uninstall and reinstall as needed.

Whatever you choose, you've been distracted now from what you set out to accomplish in the first place. Let me show you a better way.

## Enter Virtualenv

Virtualenv is a Python package for creating virtual Python environments for your project.

So what does this mean? Conceptually think of it as a box to keep a single application in. Inside that box you will also keep an isolated copy of Python, Pip, and any packages your application needs.

To revisit the example from earlier, this would allow us to have one environment for application A with AwesomePythonLib 1.0 and a second with version 2.0 for our application B. Let's look at a real world example.

## Installing Virtualenv

Installing Virtualenv is easy as pie and can simply be installed via Pip on Windows, Mac, or Linux.

```
$ pip install Virtualenv
```

You will need to ensure Python has been added to your PATH, which typically happens when Python is installed.

## Setting Up a Virtual Environment

Let's start by creating a new directory then we will initialize a new Virtualenv environment.

```
$ mkdir pyproject && cd pyproject
$ virtualenv venv
```

This will create a new directory called `venv` inside our directory. This will contain our isolated instance of Python and packages. The next step is to activate the environment and install a package.

```
$ source venv/bin/activate
$ (venv) pip install requests
```

**Windows Users**
On Windows, a batch script is created for activating an environment. The command is as follows:

```
C:\PATH_TO_PROJECT\venv\bin\activate.bat
```

This will install the requests package to your `venv` directory, freeing you worrying what version other projects might be using.

Virtualenv provides a shell function called `deactivate` to exit an environment when you are finished.

```
$ deactivate
```

## Warning About Terminal Sessions

When you activate an environment, it is only activated for that particular terminal session. Be careful of switching to your IDE's embedded terminal or opening additional tabs.

When a Virtualenv environment is active, you will see the environment name in the terminal like the command examples above.

## Alternative Python Versions

While this is less of a problem than it was even just a few years ago, you may still find yourself in a situation of maintaining projects that utilize different versions of Python.

Virtualenv has your back in this situation as well allowing you to create an environment with any Python interpreter you have installed on your system using the `--python` command line flag.

Here's an example of what that looks like.

```
$ virtualenv venv --python=python2.7
```

Now you can work on Python2 and Python3 side by side without any of the usual headache.

## Conclusion

Virtualenv is only a single tool that solves this problem, but I highly recommend you utilize some sort of virtual environment package. Especially if you come from Node where dependencies are scoped to each individual project by default. Another such option is [pyenv](https://github.com/pyenv/pyenv).
