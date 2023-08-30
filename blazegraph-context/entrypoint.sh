#!/bin/bash

# addgroup -S -g $BLAZEGRAPH_GID blazegraph
# adduser -S -s /bin/false -G blazegraph -u $BLAZEGRAPH_UID blazegraph
addgroup --system --gid $BLAZEGRAPH_GID blazegraph
adduser --system --shell /bin/false --no-create-home --uid $BLAZEGRAPH_UID blazegraph
adduser blazegraph blazegraph

# Make sure permissions are good
# chown -R blazegraph:blazegraph "$chown -R blazegraph:blazegraph "$JETTY_BASE""
# chown -R blazegraph:blazegraph "$TMPDIR"
chown -R blazegraph:blazegraph $BLAZEGRAPH_RW_PATH
chown -R blazegraph:blazegraph /data

sed "s/@@TIMEOUT@@/$BLAZEGRAPH_TIMEOUT/" $BLAZEGRAPH_RW_PATH/readonly_cors.tmp.xml | sed "s/@@READONLY@@/$BLAZEGRAPH_READONLY/" > /data/readonly_cors.xml
# echo $JETTY_HOME

# su-exec blazegraph:blazegraph java $JAVA_OPTS -Xmx$BLAZEGRAPH_MEMORY -Djetty.overrideWebXml=readonly_cors.xml -Dcom.bigdata.rdf.sail.webapp.ConfigParams.propertyFile=blazegraph.properties -jar /usr/local/jetty/start.jar
gosu $BLAZEGRAPH_UID:$BLAZEGRAPH_GID \
    java -Xmx$BLAZEGRAPH_MEMORY \
    -Dfile.encoding=UTF-8 \
    -Djetty.port=8080 \
    -Djetty.overrideWebXml=readonly_cors.xml \
    -Dbigdata.propertyFile=blazegraph.properties \
    -cp $BLAZEGRAPH_RW_PATH/blazegraph.jar:$BLAZEGRAPH_RW_PATH/jetty-servlets-9.2.3.v20140905.jar \
    com.bigdata.rdf.sail.webapp.StandaloneNanoSparqlServer
    