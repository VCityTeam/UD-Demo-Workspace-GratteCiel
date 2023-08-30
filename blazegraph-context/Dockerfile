FROM openjdk:8-buster

LABEL maintainer="balhoff@renci.org"


# use --env on the docker run command line to override
ENV BLAZEGRAPH_NAME=bigdata \
    BLAZEGRAPH_VERSION=BLAZEGRAPH_RELEASE_2_1_5 \
    # JAVA_OPTS="-Xmx1g" \
    JETTY_WEBAPPS=/var/lib/jetty/webapps \
    BLAZEGRAPH_UID=888 \
    BLAZEGRAPH_GID=888 \
    BLAZEGRAPH_RW_PATH=/blazegraph \
    BLAZEGRAPH_READONLY="true" \
    BLAZEGRAPH_TIMEOUT="60000" \
    BLAZEGRAPH_MEMORY="8G" \
    GOSU_VERSION=1.16
ENV BLAZEGRAPH_VERSION_URL=https://github.com/blazegraph/database/releases/download/${BLAZEGRAPH_VERSION}/blazegraph.jar

# Gosu setup from https://github.com/tianon/gosu/tree/master
RUN set -eux; \
# save list of currently installed packages for later so we can clean up
	savedAptMark="$(apt-mark showmanual)"; \
	apt-get update; \
	apt-get install -y --no-install-recommends ca-certificates gnupg wget; \
	rm -rf /var/lib/apt/lists/*; \
	\
	dpkgArch="$(dpkg --print-architecture | awk -F- '{ print $NF }')"; \
	wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$dpkgArch"; \
	wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$dpkgArch.asc"; \
	\
# verify the signature
	export GNUPGHOME="$(mktemp -d)"; \
	gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4; \
	gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu; \
	gpgconf --kill all; \
	rm -rf "$GNUPGHOME" /usr/local/bin/gosu.asc; \
	\
# clean up fetch dependencies
	apt-mark auto '.*' > /dev/null; \
	[ -z "$savedAptMark" ] || apt-mark manual $savedAptMark; \
	apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
	\
	chmod +x /usr/local/bin/gosu; \
# verify that the binary works
	gosu --version; \
	gosu nobody true

RUN mkdir $BLAZEGRAPH_RW_PATH \
&& cd $BLAZEGRAPH_RW_PATH \
&& curl -L -O $BLAZEGRAPH_VERSION_URL \
&& curl -L -O 'https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-servlets/9.2.3.v20140905/jetty-servlets-9.2.3.v20140905.jar'

ADD readonly_cors.xml ${BLAZEGRAPH_RW_PATH}/readonly_cors.tmp.xml
ADD entrypoint.sh ${BLAZEGRAPH_RW_PATH}/entrypoint.sh
RUN chmod +x ${BLAZEGRAPH_RW_PATH}/entrypoint.sh

# create the mount point for configuration files
RUN mkdir /data
ADD blazegraph.properties /data/blazegraph.properties



# the port on which Blazegraph will be listening within the container
EXPOSE 8080

# By default, a writable working directory is expected,
# containing blazegraph.properties and blazegraph.jnl
WORKDIR /data

ENTRYPOINT ["/blazegraph/entrypoint.sh"]