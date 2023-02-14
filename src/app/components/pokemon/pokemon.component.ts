import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PokemonService} from "../services/pokemon.service";
import {map, Observable, take, tap} from "rxjs";
import {Ability} from "../models/pokemon.model";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {
  pokemonForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', Validators.required),
  });
  abilities: Observable<Ability[]> | undefined
  name: string = "";

  constructor(private readonly formBuilder: FormBuilder, private readonly pokemonService: PokemonService) {
  }

  showNameAndAbilities() {
    this.name = this.pokemonForm.controls['name'].value;
    this.abilities = this.pokemonService.getPokemonByName(this.name).pipe(take(1),
           map(pokemonData => pokemonData.abilities))
  }

  hasErrors() {
    return this.pokemonForm.controls['name'].hasError('required')
  }
}
