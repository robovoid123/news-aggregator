# News Aggregator

## Setup Guide

  1. Create and .env file replicating the .env.template file in the project root.
  2. Build docker image (
    docker docker build . -t "news-aggregator:v1.0"
  )
  3. Run the docker image (
    docker run -p 8080:8080 news-aggregator:v1.0
  )