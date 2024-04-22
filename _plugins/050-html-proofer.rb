require "html-proofer"

# https://rubydoc.info/gems/html-proofer/HTMLProofer/Configuration

Jekyll::Hooks.register :site, :post_write do |site|
  HTMLProofer.check_directory(site.config["destination"], opts = {
    :check_html => true,
    :check_img_http => true,
    :disable_external => true,
    :report_invalid_tags => true,
    :assume_extension => ".html",
    :allow_hash_href => true,
    :verbose => true,
    :internal_domains => ["localhost:8100","localhost:8111", "localhost"],
    :file_ignore => ["/assets/", "/tools/"],
    :root_dir => "_site",
    :href_ignore => [
      /.*#data=.*/,
      /localhost:.*/,
      /.*.localhost/,
      /.*.localhost/,
      /0.0.0.0:.*/,
      /192.168/,
      /\/\/.*/,
    ],
    :url_ignore => [
      /.*#data=.*/,
      /localhost:.*/,
      /.*.localhost/,
      /.*.localhost/,
      /0.0.0.0:.*/,
      /192.168/,
      /\/\/.*/,
    ],
    :extension => ".html",
    :log_level => :debug,
  }).run
end
