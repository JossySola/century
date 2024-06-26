# 21st Century Times
## Reddit Project

This project is meant to work with the Reddit API as part of the Codecademy Front-End project. The functionality consists of loading posts by predefined categories, searching subreddits, liking posts / comments and commenting on a post.

This repository is secondary as I decided to leave the first repository I started, due to a messy implementation. Before starting the whole project, I came across the concept of **Atomic Design** and I decided to apply it in this project. However, as stated before, the wrong implementation of this technique made me start it again.

In this second repository, I started to build the project from **top to bottom**, unlike the first repository attempt. 

### The following is the order of steps I took:

1. Router planning
2. Sketch of first **Organism** [^1] flowchart
3. Code implementation of a Fetch Handler function, which handles fetch requests and manages the responses in Cache
4. Code implementation to filter the responses from the Reddit API. Implementing the code as a recursive function to filter the **Listings** [^2] received
5. Creation of an **Organism** as a *renderless* React component. Only working with the data fetched first.
    - Focus on the data required for that specific Organism strand. Creating the Organism as the parent and continuing with the children creation while passing the data down.
    - **Maintaining a flowchart to keep track of the connection between the Router, Components, Hooks and Functions.**


[^1]: Term part of the [**Atomic Design**](https://atomicdesign.bradfrost.com/chapter-2/) technique.
[^2]: > *Many endpoints on Reddit use the same protocol for controlling pagination and filtering. These endpoints are called Listings [...]* [**Reddit API Documentation**](https://www.reddit.com/dev/api/)