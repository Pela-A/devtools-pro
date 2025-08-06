# devtools-pro
Repo used for W3 and W6 Emerging Tech


### Create frontend
cd devtools-pro
npx create-react-app frontend --template typescript

cd frontend
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-config-react-app


### Create backend
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



npm run lint

npm run format

install Prettier vscode extension and ESLint

