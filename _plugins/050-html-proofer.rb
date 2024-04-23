require "html-proofer"

# https://rubydoc.info/gems/html-proofer/HTMLProofer/Configuration

Jekyll::Hooks.register :site, :post_write do |site|
  HTMLProofer.check_directory(site.config["destination"], opts = {
    :check_html => true,
    :disable_external => true,
    :report_invalid_tags => true,
    :assume_extension => ".html",
    :allow_hash_href => true,
    :verbose => true,
    :swap_urls => { "%r{localhost:8100}" => "https://maxbarrass.com", "%r{localhost:8111}" => "https://maxbarrass.com", "%r{localhost}" => "https://maxbarrass.com" },
    :ignore_files => [".*/assets/.*", ".*/tools/.*"],
    :root_dir => "_site",
    :ignore_urls => [
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
