import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PokemonService} from "../services/pokemon.service";
import {of} from "rxjs";
import {response} from "../mocks/response.mock";
import {By} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  const selectors= {
    buttonClick: () => fixture.debugElement.query(By.css('button')).nativeElement
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonComponent ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [{
        provider:PokemonService,
        useValue: {
          getPokemonByName: () => of(response)
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not send name to service after click, when name is empty', () => {
    selectors.buttonClick().click()
    expect(component.name).toEqual('')
  })
  it('should have disabled button when name is empty', () => {
    selectors.buttonClick().click()
    expect(selectors.buttonClick().disabled).toEqual(true)
  })
  it('should send name to service after click', () => {
    component.pokemonForm.controls['name'].setValue('Ditto')
    fixture.detectChanges()
    selectors.buttonClick().click()
    expect(component.name).toEqual('Ditto')
  })
});
