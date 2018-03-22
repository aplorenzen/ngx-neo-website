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

# Rewrite the httpd.conf, and enable the rewrite module if disabled.
RUN sed -i -e \
  's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' \
  /usr/local/apache2/conf/httpd.conf


