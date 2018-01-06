# Homies Project

Homies is a full stack web application built with Ruby on Rails for the backend and React on the front end. It is a social platform that acts as a content aggregate that allows users to share entertainment news to their friends and family through intimate social groups. The app uses the Watson API to data mine information about user interests and make user specific recommendations. 

## Final product

![This is the discovery page](https://github.com/rickysychan/Homies/blob/master/docs/discovery%20page.png)
![this is the circles page](https://github.com/rickysychan/Homies/blob/master/docs/Circles%20page.png)
![search page](https://github.com/rickysychan/Homies/blob/master/docs/Search%20result.png)

## Dependencies

    "babel-core": "6.23.1",
    "babel-loader": "6.3.1",
    "babel-preset-es2015": "6.22.0",
    "babel-preset-react": "6.23.0",
    "babel-preset-stage-0": "6.22.0",
    "css-loader": "0.26.1",
    "eslint": "3.15.0",
    "eslint-plugin-react": "6.9.0",
    "node-sass": "4.5.0",
    "sass-loader": "6.0.0",
    "sockjs-client": "^1.1.2",
    "style-loader": "0.13.1",
    "webpack": "2.2.1",
    "webpack-dev-server": "2.3.0"
    "axios": "^0.17.0",
    "history": "^3.3.0",
    "material-ui": "^0.19.4",
    "react": "15.4.2",
    "react-dom": "15.4.2",
    "react-router": "^3.2.0",
    "react-router-dom": "^4.2.2"
    gem 'rails', '~> 5.1.4'
    gem 'puma', '~> 3.7'
    gem 'jwt'
    gem 'simple_command'
    gem 'jbuilder', '~> 2.5'
    gem 'redis', '~> 3.0'
    gem 'bcrypt', '~> 3.1.7'
    gem 'pg'
    gem 'twitter'
    gem 'themoviedb'
    gem 'giantbomb-api', '~> 1.6.0'
    gem 'excon'
    gem 'bcrypt'
    gem 'capistrano-rails', group: :development
    gem 'rack-cors', :require => 'rack/cors'
    gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
    gem 'dotenv-rails'
    gem 'spring'
    gem 'spring-watcher-listen', '~> 2.0.0'
    gem 'faker'


## Getting started

- Install all dependencies (using the 'npm install' command in Homies-react, and 'bundle install' in Homies-API)
- Run the developement web-server using the 'npm run local' command on 'homies-react' director and 'bin/rails s -p 3001' on 'Homies-api' directory
