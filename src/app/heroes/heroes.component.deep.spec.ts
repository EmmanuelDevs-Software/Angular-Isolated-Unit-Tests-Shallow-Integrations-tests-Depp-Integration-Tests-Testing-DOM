import { HeroComponent } from "./../hero/hero.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("HerosComponent  (Deep test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

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
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render each hero as a HeroComponent", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //run ngOnInit
    fixture.detectChanges();

    let heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentDEs.length).toBe(3);
  });

  it("should render each hero as a HeroComponent, find by name", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //run ngOnInit
    fixture.detectChanges();

    let heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentDEs[0].componentInstance.hero.name).toEqual("Mr. Nice");
    expect(heroComponentDEs[1].componentInstance.hero.name).toEqual("Narco");
    expect(heroComponentDEs[2].componentInstance.hero.name).toEqual("Bombasto");
  });

  it("should render each hero as a HeroComponent, find by name , using FOR LOOP", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //run ngOnInit
    fixture.detectChanges();

    let heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    for (let index = 0; index < heroComponentDEs.length; index++) {
      expect(heroComponentDEs[index].componentInstance.hero).toEqual(HEROES[index]);
    }
  });
});
