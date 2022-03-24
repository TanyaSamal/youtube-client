import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule],
  exports: [FormsModule, MatInputModule, MatButtonModule, MatIconModule],
})
export class MaterialModule {}
