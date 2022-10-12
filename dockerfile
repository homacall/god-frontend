FROM node:latest 
RUN apt update -y
RUN apt install nano
RUN apt install curl vim net-tools git build-essential -y 
# RUN curl -sL https://deb.nodesource.com/setup_14.x | bash 
# RUN apt install nodejs -y
# RUN node -v
# RUN npm -v
# # install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update -y
RUN apt install yarn -y
WORKDIR /app
COPY package*.json yarn.lock /app/
# # install repository
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
