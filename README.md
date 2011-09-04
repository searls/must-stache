# Must Stache - a Chrome Web Extension

This is the most important web extension you'll ever install. It's goal is to bring you joy by mustache.

Install the extension via the [Google Chrome Store here](https://chrome.google.com/webstore/detail/gnmngbknombiopoggilgiebonllnndhp).

## Running the specs

If you're interested in running the specs, we're using [jasmine-headless-webkit](http://johnbintz.github.com/jasmine-headless-webkit/) to test-drive the plugin. If you want to contribute to the extension, you'll need to be able to run and write specs, too.

Prerequisites that we have installed include [homebrew](https://github.com/mxcl/homebrew), qt, and [bundler](http://gembundler.com/).

To install qt, run:

    brew install qt

And after cloning, just run these commands to get started running the specs with [guard](https://github.com/guard/guard):

    bundle install
    bundle exec guard