FROM ubuntu:14.04

RUN echo "deb http://jp.archive.ubuntu.com/ubuntu/ trusty main restricted universe multiverse \n\
deb http://jp.archive.ubuntu.com/ubuntu/ trusty-updates main restricted universe multiverse \n\
deb http://jp.archive.ubuntu.com/ubuntu/ trusty-backports main restricted universe multiverse \n\
deb http://jp.archive.ubuntu.com/ubuntu/ trusty-security main restricted universe multiverse" > /etc/apt/sources.list

RUN apt-get update && apt-get install -y \
    python-numpy \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/

RUN apt-get update && apt-get install -y \
    python-pip \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/
  
ADD requirements /var/tmp/requirements

RUN pip install -r /var/tmp/requirements/batch.txt

# RUN pip install -r /var/tmp/requirements/web.txt
