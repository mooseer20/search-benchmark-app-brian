FROM gcc:latest

WORKDIR /usr/src/app

COPY . . 

RUN g++ -o search_server src/main.cpp -O1 -lpthread


CMD ["./search_server"]

