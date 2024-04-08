FROM node:18-alpine

LABEL maintainer="diego.vinasco-alvarez@liris.cnrs.fr"
LABEL authors="diego.vinasco-alvarez@liris.cnrs.fr"


# use --env on the docker run command line to override
ENV APPLICATION_PATH=/app

# install npm dependencies
RUN mkdir ${APPLICATION_PATH}
WORKDIR ${APPLICATION_PATH}
ADD ./package.json ${APPLICATION_PATH}
RUN npm install

# add application files and build demo
ADD ./index.html ${APPLICATION_PATH}
ADD ./webpack.config.js ${APPLICATION_PATH}
ADD ./favicon.ico ${APPLICATION_PATH}
ADD ./src ${APPLICATION_PATH}/src
ADD ./bin ${APPLICATION_PATH}/bin
ADD ./assets ${APPLICATION_PATH}/assets
RUN npm run build

# the port on which the UD-Viz application will be listening within the container
EXPOSE 8000

ENTRYPOINT ["npm", "run", "serve"]