# Next.js Portfolio-Website | Frontend

This project is designed to be used in conjunction with a backend. If you wish to use it for your own website, you will need to set up your own backend.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Testing with Your Backend](#testing-with-your-backend)
- [Creating Your Own Backend](#creating-your-own-backend)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will guide you through setting up the project to run on your local machine for development and testing purposes.

## Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/nextjs-frontend-project.git
cd nextjs-frontend-project
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```
The project will be running at `http://localhost:3000`.

## Testing with Your Backend

If you don't know how to set up a backend for your website, just follow a tutorial like this one, for example: [How to create a backend API in Express JS](https://dev.to/bilal1718/how-to-create-a-backend-api-in-express-js-e0k)

To test the front-end with your backend:

1. Ensure your backend is running and accessible. 
2. Update the API endpoints in the front-end project to match the URLs of your backend. In this project it is often defined in the files via `const URL = "example.com"`.
3. Start the development server:

```bash
npm run dev
```

## Creating Your Own Backend

If you wish to create your own backend, you will need to:

1. Develop your backend API using your preferred technology stack (e.g., Node.js, Python, Ruby on Rails, etc.). If you don't know how to set up a backend for your website, just follow a tutorial like this one, for example: [How to create a backend API in Express JS](https://dev.to/bilal1718/how-to-create-a-backend-api-in-express-js-e0k)
3. Deploy your backend to a server or cloud service like for example [Vercel.com](https://vercel.com/).
4. Update the front-end project to use the URLs of your deployed backend. In this project they are often defined within the files via `const URL = "example.com"`.

## Contributing

If you would like to contribute to this project, please fork the repository, submit a pull request, and I'll look into it.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
