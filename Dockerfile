# Ubuntu LTS (16.04)
FROM ubuntu:16.04

MAINTAINER Kieran O\'Neill

# Use bash shell
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Update and install dependencies
RUN apt-get update --fix-missing
RUN apt-get install -y curl

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.9.5

# Install node & npm with nvm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# Set up our PATH correctly, so we don't have to long-reference npm, node, e.t.c.
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Install global modules.
RUN npm install pm2 yarn -g

# Install dependencies using yarn.
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /usr/app \
    && cd /usr/app \
    && ln -s /tmp/node_modules

# Create app directory.
WORKDIR /usr/app
ADD . /usr/app

# Build app.
RUN yarn run build

# Open up the port
EXPOSE 8080

# Fly my pretties!!
CMD ["pm2", "start", "processes.json", "--no-daemon"]
