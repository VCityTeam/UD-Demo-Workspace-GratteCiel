FROM bde2020/strabon

# Enable CORS support for Strabon/tomcat frontend 
ADD web.xml /tomcat/conf/web.xml

# Cleanup
RUN unzip /la_doua.zip && \
    mv /La_Doua_2009-2018/*.rdf / && \
    rm -rf /La_Doua_2009-2018 /la_doua.zip
