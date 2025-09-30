FROM eclipse-temurin:21
WORKDIR /app

ENV VERSION=0.0.1-SNAPSHOT

COPY . .
RUN ./gradlew build

EXPOSE 10033
CMD ["java", "-jar", "-Dspring.profiles.active=prod", "build/libs/mangaserver-$VERSION.jar"]
