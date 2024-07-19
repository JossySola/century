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
#### Actions taken at the final stages of the project
6. Something I've done after some time working in the project, is moving TypeScript types to a global file where many components can use them instead of defining them on each file
7. Another thing that I believe modularizes the styling is having a `.css` file in each component folder. Then for every className, I used a `prefix-` syntax in the name. For example: if the component's name is **Timer** then a class name would be *timer-header*. That also helped me whenever I had to look at the HTML file on the Google Dev tools, to identify what element belonged to what component
    - Some context: At the beginning of the project, I created a `bash` script and incorporated it into my `package.json` file. Basically calling `npm run auto`, prompts me the name I want to use for a new component and the script creates a folder with the name and four files inside:
        1. `.css`
        2. `.stories.tsx`
        3. `.test.js`
        4. `.tsx`
    However, in this project I used neither the Storybook file extension nor the Jest test one

After 6 months of working in this project, which is a long time, I couldn't keep up with the flowchart update, however, at this ending moment I'll update it to see how robust it looks and somehow upload it here for everyone to see.

## Features that could improve this project

1. Partial loading in <Feed> component
    - Right now the Feed component is rendered at once. If there are 29 elements, those 29 elements are rendered. As each element, or in this case, each <Preview> has a <User> component that loads the User's profile image, this is done by `fetching` the user's data. However, if 29 elements are being rendered, there is also going to be 29 fetches made in what? one second?, in return that gives the error *'too many requests'*. Partially loading the <Feed> component would handle this issue.
2. Edit any comment owned
3. Commenting replies
4. Adding CSS animations so the render changes don't look stiff


[^1]: Term part of the [**Atomic Design**](https://atomicdesign.bradfrost.com/chapter-2/) technique.
[^2]: > *Many endpoints on Reddit use the same protocol for controlling pagination and filtering. These endpoints are called Listings [...]* [**Reddit API Documentation**](https://www.reddit.com/dev/api/)