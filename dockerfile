FROM nginx:latest
COPY index.html styles.css mediaqueries.css Script.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]