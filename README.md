# MaxBarrass.com
My Blog

[![build_status](https://github.com/wildone/maxbarrass.com/workflows/ci/badge.svg)](https://github.com/wildone/maxbarrass.com/actions?workflow=ci)
[![github license](https://img.shields.io/github/license/wildone/maxbarrass.com)](https://github.com/wildone/maxbarrass.com) 
[![github issues](https://img.shields.io/github/issues/wildone/maxbarrass.com)](https://github.com/wildone/maxbarrass.com) 
[![github last commit](https://img.shields.io/github/last-commit/wildone/maxbarrass.com)](https://github.com/wildone/maxbarrass.com) 
[![github repo size](https://img.shields.io/github/repo-size/wildone/maxbarrass.com)](https://github.com/wildone/maxbarrass.com) 


## Updating this Repo

You can update this repo using your favorite IDE or use a web based editor

* [Prose.io - AEM.Design](http://prose.io/#wildone/maxbarrass.com/tree/master)

## Markdown Cheatsheet

When creating pages in this repo use the markdown syntax, you can find syntax here:

* [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## Icons

Icons can be selected form here [Fontawesome](http://fontawesome.io/icons/)

## Getting Started

* setup ```ruby```

* install dependecies run

```bash
./install.sh
```

* run server while editing

```bash
./serve.sh
```

# Google Ads

Config is located in `_data/advertising.yml` html should not need to be changed and located in `_includes/adds/adsense.html`

# Project Structure Description

Following is the description of important sections in the project. 

* `assets` - folder for all assets that appear on the site
* `_posts` - location for all Blog posts, add your markdown here and create a subfolder in `assests` for all your images etc
* `_layouts` - templates for pages
* `_pages` - admin pages for site
* `_data` - data config for page modules
* `_config.yml` - primary config for whole site

Additional Notes

* all items with `_` (underscore) are essentially hidden.
* to add new sections and items to navigation `_config.yml` and `_data/navigation.yml` should be updated
