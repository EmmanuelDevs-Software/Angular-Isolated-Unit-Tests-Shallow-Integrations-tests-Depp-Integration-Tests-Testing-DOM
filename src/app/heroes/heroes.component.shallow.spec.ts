import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe("HerosComponent  (Shallow test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  /**
   * MOCKING CHILD
   */

  @Component({
    selector: "app-hero",
    template: "<div></div>",
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }

  /**
   * FINISH MOCKING CHILD
   */

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    HEROES = [
      { id: 11, name: "Mr. Nice", strength: 10 },
      { id: 12, name: "Narco", strength: 5 },
      { id: 13, name: "Bombasto", strength: 8 },
    ];
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      // schemas: [NO_ERRORS_SCHEMA], with NO_ERRORS_SCHEMA
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should set heroes correctly from the server", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it("should create one li for each hero, --ngFor--", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css("li")).length).toBe(3);
  });
});
