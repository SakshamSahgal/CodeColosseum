# Use an official Node.js runtime as a base image
FROM node:20

# Set the working directory in the container (This is where the volume is mounted, the directory is made if it doesn't exist)
WORKDIR /app

# Copy the Backend directory contents into the container at /app
COPY ./Backend/ /app

# Install any needed packages specified in the package.json
RUN npm install


ARG OAUTH_CLIENT_ID
ARG DOMAIN

#echo the args to the console
RUN echo "OAUTH_CLIENT_ID: ${OAUTH_CLIENT_ID}"
RUN echo "DOMAIN: ${DOMAIN}"

# Run ls to see the contents of the directory
RUN ls

WORKDIR /app/Frontend

# Copy the Frontend directory contents into the container at /app/Frontend
COPY ./Frontend/ /app/Frontend

RUN npm install

#create a .env file in the Frontend directory
RUN echo "REACT_APP_OAUTH_CLIENT_ID=${OAUTH_CLIENT_ID}" >> .env \
    && echo "REACT_APP_BASE_URL=${DOMAIN}" >> .env

# Run ls -la to see the contents of the directory
RUN ls

# cat the .env file to see the values
RUN cat .env

# Run npm run build in the Frontend directory
RUN npm run build

# COPY the build directory from the Frontend directory to the Backend directory
RUN cp -r /app/Frontend/build /app

# set the working directory to /app again
WORKDIR /app

# Delete the Frontend directory
RUN rm -rf /app/Frontend

# Run the specified command within the container
CMD ["node", "src/index.js"]

