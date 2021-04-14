import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
  flush,
  async,
} from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe("HeroDetailComponent", () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;
  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return "3";
          },
        },
      },
    };
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ id: 2, name: "Zelda", strength: 1000 })
    );
  });

  it("should render hero name in a h2 tag", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "ZELDA"
    );
  });

  it("should call updateHero when save is called fakeAsync", fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.save();
    // tick(250); // USING TICK FOR set the same ml to wait.
    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));
});




//   it("should call updateHero when save is called Async", async(() => {
//     //For use this test we need use the save method commented
//     mockHeroService.updateHero.and.returnValue(of({}));
//     fixture.detectChanges();

//     fixture.componentInstance.save();

//     fixture.whenStable().then(() => {
//       expect(mockHeroService.updateHero).toHaveBeenCalled();
//     });
//   }));
// });
