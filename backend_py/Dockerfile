# base image
FROM python:3.12-slim-bullseye

# set environment variables
ENV PYTHONUNBUFFERED 1

# expose port(s)
EXPOSE 8000

# set directory
WORKDIR /opt/app

# install dependencies and add application
RUN pip install pipenv
COPY Pipfile Pipfile.lock ./
RUN pipenv install --system --deploy --ignore-pipfile
COPY . ./

# run the app
CMD ["supervisord", "-c", "supervisord.conf"]
