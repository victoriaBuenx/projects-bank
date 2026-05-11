FROM ubuntu:22.04

ENV SYMMETRIC_VERSION_SHORT=3.14
ENV SYMMETRIC_VERSION=3.14.7

RUN apt-get update && apt-get install -y default-jre wget unzip && \
    wget -O symmetric-server-${SYMMETRIC_VERSION}.zip https://sourceforge.net/projects/symmetricds/files/symmetricds/symmetricds-${SYMMETRIC_VERSION_SHORT}/symmetric-server-${SYMMETRIC_VERSION}.zip/download && \
    unzip symmetric-server-${SYMMETRIC_VERSION}.zip && \
    mv symmetric-server-${SYMMETRIC_VERSION} /opt/symmetricds && \
    rm symmetric-server-${SYMMETRIC_VERSION}.zip && \
    apt-get clean

WORKDIR /opt/symmetricds

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]

