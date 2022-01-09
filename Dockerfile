FROM node:16
LABEL maintainer="alexandre.em@pm.me"
WORKDIR /em-tuner

COPY . .
RUN yarn --silent

ENV PORT 5000
ENV REACT_APP_ENDPOINT http://localhost:3000/models

CMD ["yarn", "start"]
EXPOSE 5000
