#!/bin/bash
addgroup -S -g $BLAZEGRAPH_GID blazegraph
adduser -S -s /bin/false -G blazegraph -u $BLAZEGRAPH_UID blazegraph

# Make sure permissions are good
chown -R blazegraph:blazegraph "$JETTY_BASE"
chown -R blazegraph:blazegraph "$TMPDIR"

sed "s/@@TIMEOUT@@/$BLAZEGRAPH_TIMEOUT/" /var/lib/jetty/readonly_cors.tmp.xml | sed "s/@@READONLY@@/$BLAZEGRAPH_READONLY/" > /var/lib/jetty/readonly_cors.xml
echo $JETTY_HOME

su-exec blazegraph:blazegraph java $JAVA_OPTS -Xmx$BLAZEGRAPH_MEMORY -Djetty.overrideWebXml=readonly_cors.xml -Dcom.bigdata.rdf.sail.webapp.ConfigParams.propertyFile=blazegraph.properties -jar /usr/local/jetty/start.jar