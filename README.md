# devtools-pro

Repo used for W3 and W6 Emerging Tech

This project will serve to learn to improve my quality of life as a developer with things like, linters, formatters, github workflows for CI/CD and Docker. Please note that this tutorial does not explain syntax as that is something that would take too long and you have google and AI for. I do explain the basic components of various thigns though.

Later in Week 6 I will implement a basic site that can integrate with Stripe.

## Tutorial

### Tutorial on Linter and Formatter

1. Setup development environment. For this step follow the project setup commands below

2. Install necessary packages, VS Code Extensions etc. For a linter I used ESLint and Prettier (JavaScript linter and formatter)

3. Create any necessary configuration files. For ESLint create, .eslintrc.json and .eslintignore files. For prettier, create .prettierignore and .prettierrc file.

### Tutorial on Docker Desktop

1. Install Docker Desktop. Follow steps in wizard.

2. Ensure you have Docker Desktop open on your computer. The Docker Engine must be running in order for containers and images to be created

3. Create dockerfiles and docker compose files.

When you create a dockerfile, this is basically instructions for building a Docker Image (Specific to your application). This file is then used to create a container which is basically a Linux environment of the image where an application runs from.

The Docker Compose file takes this a step further and allows you to run multiple containers as one full functioning application. Think like having a React Front End SPA (Single Page Application), Which communicates to a DJANGO API, that probably communicates with a database. These are specific to your application and can either reference specific images, or DockerFiles which create images.

4. If configured correctly, run the command docker-compose up --build. This will launch all the applications/containers specified in your docker-compose.yml file and also rebuild images. Note that docker saves your most recent image typically so if you don't update the image, you may not see changes. Using --build allows those images to rebuild.

### Tutorial on Github Workflows (CI/CD)

1. Create your repository on Github.

2. Create a .github/workflows directory/folder.

3. Create various .yml files based on needs or what you want to have run.

Note that workflow .yml files have specific syntax that I will not be fully explaining. In short though you have workflows that run based on specific parameters (push to main, PR etc). Workflows are made up of one to many jobs. These jobs are made of one to many steps.

## Project Setup Commands

### Create frontend

cd devtools-pro
npx create-react-app frontend --template typescript

cd frontend
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-config-react-app

### Create backend (can skip flake8 and black installation those are just linters and formatters for Python)

cd backend
python -m venv venv
venv\Scripts\activate

Install Dependencies:
pip install django djangorestframework
django-admin startproject core .
python manage.py startapp api

pip install black flake8

Create txt file of dependencies for docker
pip freeze > requirements.txt

install Prettier and ESLint vscode extension

npm run lint

npm run format


## W6 Additions

Integrated with Stripe to handle transactions.

Required steps were installing dependencies for front end project and python project.

Once done, we will first handle logic on our backend.

### Backend work

Need to make sure Stripe is in our list of dependencies.

On our stripe account, we want to find our sk and add it to our settings.py

Create a view for payment intent inside a django app.

backend -> api -> views.py

Add view as a path in our urls.py so that url can be queried

### Frontend work

Make sure we have installed stripe package

Create features you plan on having behind a paywall versus not.

Lock premium feature behind use state.

Then create premium checkout form using stripe information and create an async request to backend. Backend will validate with stripe, and if successful, tell the client it was successful