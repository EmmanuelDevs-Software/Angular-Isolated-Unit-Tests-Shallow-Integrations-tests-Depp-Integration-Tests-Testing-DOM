describe("first test pluralsight", () => {
  let sut;

  beforeEach(() => {
    sut = {};
  });

  it("Should be true if true", () => {
    //arrange
    sut.a = false;
    // act
    sut.a = true;
    //assert
    expect(sut.a).toBe(true);
  });
});
