describe("bootstrap", function() {
  it("defines MustStache", function() {
    expect(MustStache).toBeDefined();
  });

  it("defines MustStache.$ with jQuery", function() {
    expect(MustStache.$().jquery).toBeDefined();
  });

  it("defines MustStache._", function() {
    expect(MustStache._([null,1,undefined]).compact()).toEqual([1]);
  });
});