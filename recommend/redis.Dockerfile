FROM ubuntu:14.04

RUN echo "deb http://jp.archive.ubuntu.com/ubuntu/ trusty main restricted universe multiverse \n\
deb http://jp.archive.ubuntu.com/ubuntu/ trusty-updates main restricted universe multiverse \n\
deb http://jp.archive.ubuntu.com/ubuntu/ trusty-backports main restricted universe multiverse \n\
deb http://jp.archive.ubuntu.com/ubuntu/ trusty-security main restricted universe multiverse" > /etc/apt/sources.list

RUN         apt-get update && apt-get install -y redis-server
EXPOSE      6379
ENTRYPOINT  ["/usr/bin/redis-server"]

