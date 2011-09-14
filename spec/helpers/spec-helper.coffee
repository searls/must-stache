window.context = window.describe
window.$ = window.jQuery = MustStache.$
window.M = MustStache
window._ = MustStache._

beforeEach ->
  this.addMatchers
    toPrettyMuchEqual: (number) ->
      return Math.abs(this.actual - number) < 0.000001
