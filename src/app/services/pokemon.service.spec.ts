import {TestBed} from '@angular/core/testing';

import {PokemonService} from './pokemon.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {PokemonData} from "../models/pokemon.model";

const response: Partial<PokemonData> = {
  abilities:  [{
    ability: {name: "static", url: "https://pokeapi.co/api/v2/ability/9/"},
    is_hidden: false,
    slot: 1
  }, {
    ability: {name: "lightning-rod", url: "https://pokeapi.co/api/v2/ability/31/"},
    is_hidden: true,
    slot: 3
  }],
}
describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient, useValue: {get: ()=> of(response)}
      }],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return pokemon data', done=> {
    service.getPokemonByName('ditto').subscribe(data => {
      expect(data).toBeTruthy();
      console.log(data)
      done();
    })
  })

    it('should throw Error', done=> {
      const error = new Error('something went wrong')
      const http = TestBed.inject(HttpClient)
       spyOn(http, 'get').and.returnValue(throwError(() => error));
      service.getPokemonByName('test').subscribe(null, error => {
        expect(error).toEqual(error)
        done();
      })
  });
});
