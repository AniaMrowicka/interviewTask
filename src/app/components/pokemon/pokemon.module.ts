import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PokemonComponent} from "./pokemon.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [PokemonComponent],
  exports: [
    PokemonComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class PokemonModule { }
