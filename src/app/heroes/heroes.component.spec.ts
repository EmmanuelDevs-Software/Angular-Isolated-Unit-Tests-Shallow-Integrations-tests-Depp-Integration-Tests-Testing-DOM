import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
describe("HeroesComponent", () => {
  let component: any = HeroesComponent;
  let HEROES;
  let mockHeroService;
  beforeEach(() => {
    HEROES = [
      { id: 11, name: "Mr. Nice", strength: 10 },
      { id: 12, name: "Narco", strength: 5 },
      { id: 13, name: "Bombasto", strength: 8 },
    ];
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("should remove the indicated hero from the list", () => {
      //Important for subscribe method compare with the component line 37

      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(component.heroes.length).toBe(2);
    });

    it("should call deleteHero", () => {
      //Important for subscribe method compare with the component line 37
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
