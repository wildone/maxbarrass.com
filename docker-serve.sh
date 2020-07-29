#!/usr/bin/env bash

cd /build/source

rvm install ruby --latest
gem install jekyll bundler i18 jemoji nokogiri -n /usr/local/bin
bundle install
bundle exec jekyll serve --host 0.0.0.0 --livereload --force_polling
