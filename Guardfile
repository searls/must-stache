require './app'

group :a do
  guard 'sprockets2', :sprockets => App.sprockets, :digest => false, :gz => false do
    watch(%r{^assets/.+$})
    watch('app.rb')
  end
end

group :j do
  spec_location = "spec/%s_spec"
  guard 'jasmine-headless-webkit' do
    watch(%r{^src/(.*)\.(coffee|js)$}) { |m| newest_js_file(spec_location % m[1]) }
    watch(%r{^spec/helpers*})
    watch(%r{^spec/(.*)_spec\..*}) { |m| newest_js_file(spec_location % m[1]) }
  end
end