import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainGameComponent } from './main-game/main-game.component';
import { MemoryBlocksComponent } from './main-game/memory-blocks/memory-blocks.component';
import { BlockDisplayComponent } from './main-game/memory-blocks/block-display/block-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainGameComponent,
    MemoryBlocksComponent,
    BlockDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
