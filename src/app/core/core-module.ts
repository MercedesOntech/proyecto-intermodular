import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor, ErrorInterceptor, LoadingInterceptor } from './interceptors';

// Importar servicios (ya están providedIn: 'root', pero los exportamos para organización)
import {
  AuthService,
  UserService,
  TarjetService,
  FilmService,
  FilmTicketService,
  BarService,
  CommentService,
  LoadingService,
  EmailService,
  SearchService
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // Servicios (aunque tienen providedIn: 'root')
    AuthService,
    UserService,
    TarjetService,
    FilmService,
    FilmTicketService,
    BarService,
    CommentService,
    LoadingService,
    EmailService,
    SearchService,
    
    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  exports: [
    HttpClientModule
  ]
})
export class CoreModule {
  // Patrón para asegurar que CoreModule solo se importe una vez
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya está cargado. Importa CoreModule solo en el AppModule.');
    }
  }
}