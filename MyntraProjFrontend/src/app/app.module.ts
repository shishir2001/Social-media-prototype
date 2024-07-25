import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarAddboardSearchboardDeleteboardComponent } from './toolbar-addboard-searchboard-deleteboard/toolbar-addboard-searchboard-deleteboard.component';
import { ViewBoardsComponent } from './view-boards/view-boards.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChipsModule } from 'primeng/chips';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarAddboardSearchboardDeleteboardComponent,
    ViewBoardsComponent,
    ViewProductsComponent,
    SplashScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    InputTextModule,
    TooltipModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    TableModule,
    AccordionModule,
    CheckboxModule,
    DropdownModule,
    CardModule,
    OverlayPanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    ChipsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
