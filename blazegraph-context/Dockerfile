FROM openjdk:8-buster

LABEL maintainer="balhoff@renci.org"


# use --env on the docker run command line to override
ENV BLAZEGRAPH_NAME=bigdata \
    BLAZEGRAPH_VERSION=RELEASE_2_1_5 \
    # JAVA_OPTS="-Xmx1g" \
    # JETTY_WEBAPPS=/var/lib/jetty/webapps \
    # BLAZEGRAPH_UID=888 \
    # BLAZEGRAPH_GID=888 \
    BLAZEGRAPH_RW_PATH=/blazegraph \
    BLAZEGRAPH_READONLY="true" \
    BLAZEGRAPH_TIMEOUT="60000" \
    BLAZEGRAPH_MEMORY="8G"
ENV BLAZEGRAPH_VERSION_URL https://github.com/blazegraph/database/releases/download/BLAZEGRAPH_RELEASE_${BLAZEGRAPH_VERSION}/blazegraph.jar

RUN mkdir $BLAZEGRAPH_RW_PATH \
&& cd $BLAZEGRAPH_RW_PATH \
&& curl -L -O $BLAZEGRAPH_VERSION_URL \
&& curl -L -O 'https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-servlets/9.2.3.v20140905/jetty-servlets-9.2.3.v20140905.jar'

ADD readonly_cors.xml ${BLAZEGRAPH_RW_PATH}/readonly_cors.tmp.xml
ADD entrypoint.sh ${BLAZEGRAPH_RW_PATH}/entrypoint.sh

RUN chmod +x ${BLAZEGRAPH_RW_PATH}/entrypoint.sh

# create the mount point for configuration files
RUN mkdir /data



# the port on which Blazegraph will be listening within the container
EXPOSE 8080

# By default, a writable working directory is expected,
# containing blazegraph.properties and blazegraph.jnl
WORKDIR /data

ENTRYPOINT ["/blazegraph/entrypoint.sh"]