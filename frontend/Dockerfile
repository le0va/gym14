###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]


###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine As build

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force


###################
# PRODUCTION
###################

FROM nginx:stable-alpine as production

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


# server {
    

#     server_name gym14.kpi.in.ua;

#     # Перенаправление HTTP на HTTPS
#     location / {
#         return 301 https://$host$request_uri;
#     }
# }

# server {
#     listen 80;
#     listen [::]:80;

#     server_name gym14.kpi.in.ua;

#     root /usr/share/nginx/html;
#     index index.html index.htm index.nginx-debian.html;

#     location / {
#         try_files $uri $uri/ /index.html;
#     }

#     location /api {
#         proxy_pass http://localhost:5000;
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;
#     }
# }