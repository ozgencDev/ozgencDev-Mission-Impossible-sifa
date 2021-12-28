FROM node:stretch-slim
WORKDIR /home/node/app
COPY client /home/node/app/
RUN npm install
CMD npm start
EXPOSE 3000

#Çalışılacak folder 
#Docker file ile eş dosya dizininde olan SsoServer klasörünün içindeki tüm dosyalarını kopyalar.
#Dockerfile içindeki npm install komutu ile node_modules klasörünün oluşturulması. proje halindeki işlemler
#Container boyutu ile ilgili bir bir çalıştırma
#Docker containerının 3010 portu açılır.

# FROM nginx
# COPY default.conf /etc/nginx/conf.d/