FROM python:3.9

ENV PYTHONDONTWRITEBYTECOD 1
ENV PYTHONUNBUFFERED 1

RUN pip install django requests

COPY ./ /srv
WORKDIR /srv

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
