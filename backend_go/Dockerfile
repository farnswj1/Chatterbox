FROM golang:1.23.0-alpine AS build

WORKDIR /opt/app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . ./
RUN go build -o build -tags jsoniter

FROM alpine

EXPOSE 8080

WORKDIR /opt/app

COPY --from=build /opt/app/build ./

ENTRYPOINT ["./build"]
