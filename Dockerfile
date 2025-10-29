FROM httpd
MAINTAINER name harish
LABEL this the automation project 
COPY . /usr/local/apache2/htdocs/
