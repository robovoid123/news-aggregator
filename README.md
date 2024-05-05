# News Aggregator

News Aggregator is an application build with ReactJS. This application pulls articles from different news api and displays it in a clean and easy to read format.

## Setup Guide

  1. Create and .env file replicating the .env.template file in the project root.
  2. Build docker image (
    docker docker build . -t "news-aggregator:v1.0"
  )
  3. Run the docker image (
    docker run -p 8080:8080 news-aggregator:v1.0
  )

## Features

  - Feed with personalization option (able to select source and categories)
  - Currently 3 news api is integrated within the application (NewsAPI.org, The New Yoke Times, The Guardian).
  - Search page with filter options (keyword search, categories filter, date range filter)
  - Preview page that lets you read available news articles. If api does not provide with complete news article and easy on-click link will take you to the original article.
  - Mobile friendly design. 
