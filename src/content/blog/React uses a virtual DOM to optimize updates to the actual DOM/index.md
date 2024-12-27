---
title: "React uses a virtual DOM to optimize updates to the actual DOM"
description: ""
date: "Dec 19 2024"
tags: ["react-js"]
url: "react-uses-a-virtual-dom-to-optimize-updates-to-the-actual-dom"

---

React uses a virtual DOM to optimize updates to the actual DOM. When the state or props of component change, React first updates the virtual DOM. Then, it compares the virtual DOM with the actual DOM using a process called reconciliation - reconciliation is the process by which React determines what has changed in the virtual DOM and updates the actual DOM efficiently - and applies only the changes (the "diff") to the real DOM. This approach improves performance.




