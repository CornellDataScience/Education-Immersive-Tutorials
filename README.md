To start out, install `ruby` and `bundler`. Then, in this project's root directory, run `bundle install`.

To deploy locally, run `bundle exec jekyll serve --watch`. This will watch for changes and update the contents of `localhost:4000/Education-Immersive-Tutorials`. Changes to `_config.yaml` will NOT be watched; if you change that file, restart `bundle exec jekyll serve --watch`.

Add layouts to `/_layouts` as needed. Any tutorial-specific data, css, or resources should go in each tutorial's subdirectory; `/resources` and `/css` are for site-wide items and things needed for the main page.


