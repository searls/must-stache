# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# Run JS and CoffeeScript files in a typical Rails 3.1 fashion, placing Underscore templates in app/views/*.jst
# Your spec files end with _spec.{js,coffee}.

spec_location = "spec/%s_spec"

# uncomment if you use NerdCapsSpec.js
# spec_location = "spec/javascripts/%sSpec"

guard 'jasmine-headless-webkit' do
  watch(%r{^lib/(.*)\.(js|coffee)$}) { |m| newest_js_file(spec_location % m[1]) }
  watch(%r{^spec/(.*)_spec\..*}) { |m| newest_js_file(spec_location % m[1]) }
end

