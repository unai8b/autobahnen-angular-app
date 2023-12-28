# Use an official Node image as a parent image
FROM node:18.14.0 as build
# Set the working directory to /app
WORKDIR /app
# Add the source code to /app
COPY . /app
# Install Angular CLI
RUN npm install -g @angular/cli@17.0.7
# Install all the dependencies
RUN npm install