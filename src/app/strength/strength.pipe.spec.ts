import { StrengthPipe } from "./strength.pipe";
describe("Testing the strength pipe", () => {
  it("should display weak if strength is 5", () => {
    let pipe = new StrengthPipe();
    let value = pipe.transform(5);
    expect(value).toEqual("5 (weak)");
  });

  it("should display strong if strength is 10", () => {
    let pipe = new StrengthPipe();
    let value = pipe.transform(10);
    expect(value).toEqual("10 (strong)");
  });

  it("should display strong if strength is 21", () => {
    let pipe = new StrengthPipe();
    let value = pipe.transform(21);
    expect(value).toEqual("21 (unbelievable)");
  });
});
