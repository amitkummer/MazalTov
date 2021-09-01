FROM python:3.9.7-slim-buster

WORKDIR /backend

RUN pip install poetry==1.1.8
ENV POETRY_VIRTUALENVS_CREATE=false

COPY pyproject.toml poetry.lock ./
RUN poetry install

COPY . .

ENTRYPOINT [ "python", "manage.py" ]
CMD ["runserver", "0.0.0.0:8000"]

ENV DATABASE_DIR=/data
