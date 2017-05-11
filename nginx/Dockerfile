FROM nginx

MAINTAINER Kieran O\'Neill

# Copy configuration file.
COPY nginx.conf /etc/nginx/nginx.conf

# Mount SSL
VOLUME ["/etc/nginx/ssl", "/etc/nginx/psw"]

# Stop container stopping - "daemon off;"
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Start Nginx
CMD service nginx start
