# Use an official Node.js runtime as a base image
FROM node:20

# Set the working directory in the container (This is where the volume is mounted, the directory is made if it doesn't exist)
WORKDIR /app

# Expose the port that the frontend service will run on
EXPOSE ${FRONTEND_PORT}

# Run the specified command within the container
CMD ["npm", "run", "start-watch"]