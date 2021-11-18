#!/usr/bin/env bash

cd /build

source .bashrc

cd /build/source

export LANG=en_US.UTF-8

if [[ "${PORT}" == "" ]]; then
  PORT=$(cat dev.port)
fi

if [[ "${PORT_LIVERELOAD}" == "" ]]; then
  PORT_LIVERELOAD=$(cat dev-livereload.port)
fi


gem install i18n jekyll bundler jemoji nokogiri -n /usr/local/bin

bundle install
bundle exec jekyll serve --trace --host 0.0.0.0 --port "${PORT}" --livereload --livereload_port "${PORT_LIVERELOAD}" --force_polling --future --incremental
