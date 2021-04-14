import { HeroComponent } from "./../hero/hero.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";

/**
 * MOCKING THE ROUTER LINK
 */
@Directive({
  selector: "[routerLink]",
  host: { "(click)": "onClick()" },
})
export class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

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
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      // schemas: [NO_ERRORS_SCHEMA],
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
      expect(heroComponentDEs[index].componentInstance.hero).toEqual(
        HEROES[index]
      );
    }
  });

  it(`Triggering Events Should call heroService.deleteHero when the Hero component's 
  delete button is clicked line 35 -> 37`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponents[0]
      .query(By.css("button"))
      .triggerEventHandler("click", { stopPropagation: () => {} });
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`Emitting Events Should call heroService.deleteHero when the Hero component's 
  delete button is clicked line 35 -> 37 with component instance`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    // tslint:disable-next-line: no-unused-expression
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`Raising Events Should call heroService.deleteHero when the Hero component's 
  delete button is clicked line 35 -> 37 with component instance`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    // tslint:disable-next-line: no-unused-expression
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    heroComponents[0].triggerEventHandler("delete", null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(" Interacting with input boxes, should ad a new hero to the hero list when the add button is clicked", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const name = "Diablo2";

    mockHeroService.addHero.and.returnValue(
      of({ id: 5, name: name, strength: 4 })
    );
    const inputElement = fixture.debugElement.query(By.css("input"))
      .nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css("button"))[0];

    inputElement.value = name;
    addButton.triggerEventHandler("click", null);

    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css("ul")).nativeElement
      .textContent;

    expect(heroText).toContain(name);
  });

  it("should have the correct route for the first hero", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css("a")).triggerEventHandler("click", null);

    expect(routerLink.navigatedTo).toBe("/detail/11");
  });
});
