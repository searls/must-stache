describe "bootstrap", ->
  it "defines MustStache", ->
    expect(MustStache).toBeDefined()

  it "defines MustStache.$ with jQuery", ->
    expect(MustStache.$().jquery).toBeDefined()

  it "defines MustStache._", ->
    expect(MustStache._([null,1,undefined]).compact()).toEqual([1])

  it "relinquishes window._", ->
    expect(_).not.toBeDefined()

  it "relinquishes window.extend", ->
    expect(extend).not.toBeDefined()

  it "makes extend available under MustStache", ->
    MustStache.extend('panda',{win:'yes'})
    expect(MustStache.panda.win).toBe('yes')