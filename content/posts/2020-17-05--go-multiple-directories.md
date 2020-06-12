---
title: Structure Your Go Project Into Multiple Directories
date: "2020-05-17T15:50:32.169Z"
template: "post"
draft:
slug: "/posts/go-structure-your-go-project/"
category: "Development"
tags:
  - "Golang"
description: "A common problem developers run into is the question of how to structure your project's files and directories. In GoLang, this is not only a philosphoical question but also a technical one as well. Let's look at 
how to break your code into separate directories."
socialImage: "/media/packages.jpg"
---

## Prerequisites

This post assumes you are familiar with at least the basics of compiling and running Go applications and have Go installed on your developent machine. No advanced techniques will be used here and the only stdib package we will be using is the fmt package. 

## No Opinions Here
This post is not going to discuss the trade offs or opinions around how to structure your app a specific way, only the technique used to do it. For more
information on how to actually structure your app, feel free to check out one of these great talks below: 

* [GopherCon EU 2018: Peter Bourgon - Best Practices for Industrial Programming](https://www.youtube.com/watch?v=PTE4VJIdHPg)
* [GopherCon Russia 2018: Ashley McNamara + Brian Ketelsen - Go best practices.](https://www.youtube.com/watch?v=MzTcsI6tn-0)
* [GopherCon 2017: Edward Muller - Go Anti-Patterns](https://www.youtube.com/watch?v=ltqV6pDKZD8)
* [GopherCon 2018: Kat Zien - How Do You Structure Your Go Apps](https://www.youtube.com/watch?v=oL6JBUk6tj0)

## The Problem
Coming from a background in JavaScript and Python, I was used to being able to import files based on their relative file paths. Nice and simple. 

When experimenting with Golang and trying to split my files into different directories, I quickly realized that Go approaches things a little bit differently. With each directory often being it's own package, and imports working based off directories not invidual files. This makes the approach to import files a little different as well.

## The Solution
Let's look at an extremely simple project where we utilize two sub direcoties to contain some of our code. I have chosen to call these directories `models` and `routes` in this example since they are common parts of your average web application, but they can be whatever unit of division makes sense for your code and use case. 

Create the following folder structure:

```
$ mkdir go-multiple-directories-example
$ cd go-multiple-directories-example
$ mkdir models
$ mkdir routes
```

## Go Modules
The next step is to actually initalize our Go module, this is the most importnt step as the rest of our setup hinges on this setup. 

```
$ go mod init github.com/jodylecompte/go-multiple-directories-example
```

I want to draw a bit of attention specifically to this point. I have chosen to use the Github URL of the final source code for the module name, but don't let this confuse you. This led me to believe that you had to upload code to GitHub prior to being able to use it and constantly update back and forth. This is strictly a label and does not require the code be pushed before use. 

## Flushing Out Our Files
Inside the models directory, create a new file called `users.go` with the follwoing code:

```go
package models

import "fmt"

func AllUsers() {
	fmt.Println("All Users")
}
```

The most important take away here is notice that the package name is not main in this case, it is named `models` to match the name of the directory. In GoLang, you can only have one package per directory and the package name should match the directory name.

Our function is very straight forward and just outputs some text, imagine you might be calling a third party API or accessing a database instead in your actual production application.

Now create a file in the routes diretory called `api.go` and paste the following code into it.

```go
package routes

import "fmt"

func APIPostRoute() {
	fmt.Println("New Post Route")
}
```

Take note that like the previous example, the package name matches our directory name.

## Bringing It All Together
The last step is for us to create our main package and `main.go` file in the root of our directory. This file should live next to the `go.mod` file we created earlier by running `go mod init`. 

Copy the following contents into the file:

```go
package main

import (
	"fmt"

	"github.com/jodylecompte/go-multiple-directories-example/models"
	"github.com/jodylecompte/go-multiple-directories-example/routes"
)

func main() {
	fmt.Println("Main package - main file")
	models.AllUsers()
	routes.APIPostRoute()
}
```

Let's circle back to the name we provided when we created our go module and you'll see we used the same name when importing our other packages.

An important distinction to make here is that we are not importing individual files, but importing entire packages. Any function in any file in those directories that begins with a capital letter will be exported and publically available and imported in for use in the above file. 

We then access our functions in those files from the package name that they are contained within such as `models.AllUsers`. 

## Source Code
You can find the source code above on [GitHub](https://github.com/jodylecompte/go-multiple-directories-example)

## Conclusion
It's pretty simple but it gave me a significant amount of confusion and in my attempts to learn I came across dozens of other cases of people being confused so hopefully this sets the record straight and enables you to begin breaking your Go program down into multiple directories when your code and use case make sense. 
