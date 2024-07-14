import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardskeletonComponent } from "./widgets/skeleton/cardskeleton/cardskeleton.component";
import { AsideskeletonComponent } from "./widgets/skeleton/asideskeleton/asideskeleton.component";
import { SkeletonComponent } from "./widgets/skeleton/product/skeleton.component";

@NgModule({
  declarations: [
    CardskeletonComponent,
    AsideskeletonComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CardskeletonComponent,
    AsideskeletonComponent,
    SkeletonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
