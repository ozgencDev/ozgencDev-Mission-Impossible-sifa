FROM node:stretch-slim

WORKDIR /home/node/app
#Çalışılacak folder 
COPY SsoServer /home/node/app/
#Docker file ile eş dosya dizininde olan SsoServer klasörünün içindeki tüm dosyalarını kopyalar.
RUN npm install
#Dockerfile içindeki npm install komutu ile node_modules klasörünün oluşturulması. proje halindeki işlemler
CMD node server.js
#Container boyutu ile ilgili bir bir çalıştırma
EXPOSE 3010
#Docker containerının 3010 portu açılır.