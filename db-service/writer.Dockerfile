FROM golang:1.21.0-bullseye

WORKDIR /app

COPY . .

RUN go build ./cmd/writer/main.go

ENTRYPOINT [ "./main" ]
