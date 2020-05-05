# Brew Ratio

## Description

This is a Rails API for https://github.com/rtviner/brew-ratio-client.  


## Getting Started

1. Fork this repository by pressing the "fork" button in GitHub.  
You should see a copy of the repository in your own GitHub account with "forked" underneath the project name.

2. Next, create a local copy of the repository by pasting the following command into the terminal.

    ```$ git clone https://github.com/rtviner/brew-ratio.git```

3. Switch to the project's directory:

    ```$ cd brew-ratio```

4. In the project directory, you can run:
    
    ```$ bundle install```

    To install the dependencies.

    ```$ rake db:create```

    ```$ rake db:migrate```

    ```$ rake db:seed```

    To create and seed the database.

5.  Start the server:

    ```$ bin/rails server```
    
  You should see the Rails "Welcome Aboard" message.


## Folder Structure

```
brew-ratio/
  app/
  bin/
  client/
  config/
  db/
  lib/
  log/
  public/
  test/
  tmp/
  vendor/
 ```
+ *app*: Models, Controllers, Views, Helpers
+ *bin*: App executables. bundle, rails, rake, spring.
+ *db*: Migrations








