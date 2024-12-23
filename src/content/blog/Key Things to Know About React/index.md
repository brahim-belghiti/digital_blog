---
title: "key Things to Know About React"
description: "key Things to Know About React"
date: "Mar 21 2024"
tags: ["React"]
---

React is a JavaScript library for creating user interfaces (UIs). We refer to it as a **library** because it is not a framework; it does not impose a specific architecture on your application. It is an open-source project developed and maintained by Meta, originally started by Jordan Walke.

At the time of its release, React introduced a completely new approach to building UIs. It is based on components, with each component being a function that encapsulates its own HTML, JavaScript, and CSS. This approach was contrary to the best practices of the time, which emphasized separation of concerns. [[JSX is a syntax extension for JavaScript used in React to describe the structure of the UI, which gets compiled to React.createElement calls under the hood|JSX]] facilitates this integration by allowing developers to write HTML-like syntax within JavaScript.

   
Another innovative concept in React is how the UI updates. Whenever the state changes, React re-renders the affected components. This leads to the well-known expression: 
==UI = f(state)==.

It is also important to note that React applications are typically client-side applications (Single Page Applications, or SPAs). This means that rendering occurs in the browser; JavaScript handles the rendering of HTML and CSS. The server only serves an initial HTML page containing a root `<div>` that references the JavaScript file responsible for rendering. This architecture can have implications for SEO and performance during the initial load. However, with the introduction of React 18, server-side generated code is now possible.

React fit into the declarative paradigme, meaning describe what you want to see in the UI, rather than  instructing how to achieve it.

To effectively start working with React, you need a basic understanding of JavaScript, including concepts such as variable assignment, asynchronous data fetching, array and object destructing, array methods, functions, and event handlers, DOM manipulation.

Styling in React application is similar to HTML, the difference is in JSX the key word *class* is already reserved. so we use the keyword *className*. 


**what is the role of the app ?**
[[in React, the App component serves as the entry point of the application, linking different components together while remaining free of complex logic to maintain separation of concerns.]]







