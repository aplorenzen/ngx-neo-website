FROM httpd:alpine

MAINTAINER Andreas Lorenzen <aplorenzen@gmail.com>

# Remove any files that may be in the public htdocs directory already.
RUN rm -r /usr/local/apache2/htdocs/*

# Install curl, just for healthchecking, without using local cache for the package lists
RUN apk --no-cache add curl

# Enable the rewrite module in apache2.
RUN sed -i \
  's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' \
  /usr/local/apache2/conf/httpd.conf

# Enable the deflate module in apache2.
RUN sed -i \
  's/#LoadModule deflate_module modules\/mod_deflate.so/LoadModule deflate_module modules\/mod_deflate.so/g' \
  /usr/local/apache2/conf/httpd.conf

# Enable the expire module in apache2, for server side caching
RUN sed -i \
  's/#LoadModule expires_module modules\/mod_expires.so/LoadModule expires_module modules\/mod_expires.so/g' \
  /usr/local/apache2/conf/httpd.conf

# Enable the file storage management module for the cache module in apache2
RUN sed -i \
  's/#LoadModule cache_module modules\/mod_cache.so/LoadModule cache_module modules\/mod_cache.so/g' \
  /usr/local/apache2/conf/httpd.conf

# Enable the file cache module in apache2, for client side caching
RUN sed -i \
  's/#LoadModule cache_disk_module modules\/mod_cache_disk.so/LoadModule cache_disk_module modules\/mod_cache_disk.so/g' \
  /usr/local/apache2/conf/httpd.conf

# Append to the published directory, that we want to rewrite any request that is not an actual file
# to the index.html page.
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/a### Rewrite rule was written from the Dockerfile when building the image ###\n\
    DirectoryIndex index.html\n\
    \n\
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript image/svg+xml\n\
    \n\
    ExpiresActive On\n\
        ExpiresByType image/gif "access plus 7 days"\n\
        ExpiresByType image/png "access plus 7 days"\n\
        ExpiresByType image/jpg "access plus 7 days"\n\
        ExpiresByType image/jpeg "access plus 7 days"\n\
        ExpiresByType text/javascript "access plus 7 days"\n\
        ExpiresByType application/javascript "access plus 7 days"\n\
        ExpiresByType image/svg+xml "access plus 7 days"\n\
        ExpiresByType text/css "access plus 7 days"\n\
    \n\
    RewriteEngine on\n\
        RewriteCond %{HTTP_HOST} ^www\.neoprime\.it$\n\
        RewriteRule ^/?$ "https\:\/\/neoprime\.it\/" [R=301,L]\n\
        RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]\n\
        RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d\n\
        RewriteRule ^ - [L]\n\
    \n\
    CacheHeader on\n\
    \n\
    ErrorDocument 404 /404/index.html\n' \
  /usr/local/apache2/conf/httpd.conf

# Comment out the default config that handles requests to /.htaccess and /.ht* with a special error message,
# Angular will handle all routing
RUN sed -i '/<Files "\.ht\*">/,/<\/Files>/c# This was commented out from the Dockerfile\n# <Files ".ht*">\n#     Require all denied\n# <\/Files>' \
  /usr/local/apache2/conf/httpd.conf

# Define a healthcheck that tests the root URL of the site
HEALTHCHECK --interval=5s --timeout=3s CMD curl --fail http://localhost:80/ || exit 1

# TODO: Replace in httpd.conf
# ServerAdmin you@example.com
# #ServerName www.example.com:80

# Copy all the files from the docker build context into the public htdocs of the apache container.
COPY ./ /usr/local/apache2/htdocs/

# Change owner of the publicly available files to root user and daemon group. Httpd threads run as daemon.
RUN chown -R root:daemon \
  /usr/local/apache2/htdocs/*

# Ensure that the files can only be read, even by the httpd server.
RUN chmod -R 440 \
  /usr/local/apache2/htdocs/*

# Ensure for all the directories created, that the files within them can be read. We need the
# execution access privilege on the directory for this. Dynamically apply this to all directories
# at least one level into the served root. (-mindepth 1, otherwise the served directory itself
# would be included - no need for that.
RUN find /usr/local/apache2/htdocs/ -mindepth 1 -type d -exec chmod +x {} \;
