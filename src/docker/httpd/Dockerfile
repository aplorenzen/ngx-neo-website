FROM httpd:alpine

# This dockerfile needs to be copied to the dist directory of your angular project,
# this can be specified in the .angular-cli.json. in the assets section of the apps section
#
#         {
#            "glob": "Dockerfile",
#            "input": "docker/httpd/",
#            "output": "./"
#
#          }
COPY ./ /usr/local/apache2/htdocs/
COPY ./conf/httpd.conf /usr/local/apache2/conf/httpd.conf

RUN rm -rf /usr/local/apache2/htdocs/conf

  #/usr/local/apache2/htdocs/Dockerfile \


# Rewrite the httpd.conf, and enable the rewrite module if disabled.
# RUN sed -i -e \
#   's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' \
#   /usr/local/apache2/conf/httpd.conf

RUN chown -R www-data:www-data \
  /usr/local/apache2/htdocs/* \
  /usr/local/apache2/htdocs/.htaccess

RUN chmod 444 \
  /usr/local/apache2/htdocs/.htaccess



