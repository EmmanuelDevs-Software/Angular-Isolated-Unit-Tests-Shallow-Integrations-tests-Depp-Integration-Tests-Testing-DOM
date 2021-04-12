import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("HeroComponene (shallow tests)", () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroComponent);
  });

  it("should have the correct hero", () => {
    fixture.componentInstance.hero = { id: 1, name: "Zelda", strength: 3 };

    expect(fixture.componentInstance.hero.name).toEqual("Zelda");
  });

  it("should render the hero name in an anchor tag nativeElement", () => {
    fixture.componentInstance.hero = { id: 1, name: "Zelda", strength: 3 };
    //Check the changes , important for test nativeElements
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("a").textContent).toContain(
      "Zelda"
    );
  });

  it("should render the hero name in an anchor tag debugElement", () => {
    fixture.componentInstance.hero = { id: 1, name: "Zelda", strength: 3 };
    //Check the changes , important for test nativeElements
    fixture.detectChanges();
    let deA = fixture.debugElement.query(By.css("a"));
    expect(deA.nativeElement.textContent).toContain("Zelda");
  });
});
