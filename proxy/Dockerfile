FROM nginx:alpine

# remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# copy custom nginx config to container
COPY nginx.conf /etc/nginx/conf.d/

# EXPOSE port 80
EXPOSE 80

# Start nginx when the container starts
CMD [ "nginx", "-g", "daemon off;"] 