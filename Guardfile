# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# Run JS and CoffeeScript files in a typical Rails 3.1 fashion, placing Underscore templates in app/views/*.jst
# Your spec files end with _spec.{js,coffee}.

spec_location = "spec/%s-spec"

guard 'jasmine-headless-webkit' do
  watch(%r{^spec/(.*)\..*})
  watch(%r{^lib/vendor/(.*)\.(js|coffee)$})
  watch(%r{^lib/js/(.*)\.(js|coffee)$}) { |m| newest_js_file(spec_location % m[1]) }
end

