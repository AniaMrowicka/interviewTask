import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {PokemonData} from "../models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) { }

  getPokemonByName(name: string): Observable<PokemonData> {
    return this.httpClient.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(catchError(err =>  throwError(err)));
  }
}
