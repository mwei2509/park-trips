# We need at least firefox v55+ to operate in headless mode. Add edge testing package url so we can download firefox v58+
echo http://dl-cdn.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories
echo http://dl-cdn.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories

apk update && apk add \
  bash \
  curl \
  ncurses \
  postgresql-client
