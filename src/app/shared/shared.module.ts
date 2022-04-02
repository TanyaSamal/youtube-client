import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, MaterialModule],
  exports: [HttpClientModule, MaterialModule],
})
export class SharedModule {}
