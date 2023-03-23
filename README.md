# WeatherApp

The frontend is done using React and Backend using Django

To run this Project first install requirements

```sh
pip install - r requirments.txt
```

you should have installed all the requirements

Now makemigrations and migrate
```sh
python manage.py makemigrations
```
```sh
python manage.py migrations
```

Now start your project

```sh
python manage.py runserver
```

Now to get frontend working cd into frontend directory by typing
```sh
cd frontend
```
install npm dependencies by typing
```sh
npm install --force
```
and type npm start to start your frontend

```sh
npm start
```
This app allows you to search for city weather by its name and also forcast for next 5 days

Key Features  --------

For this project I used JWT TOKEN Based Authentication using package for JWT authentication i.e djangorestframework-simplejwt which provides some features as well as a pluggable token blacklist app.
