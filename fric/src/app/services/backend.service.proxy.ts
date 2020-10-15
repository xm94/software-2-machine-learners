import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Router } from '@angular/router';

export class BackendServicesProxy {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
      ) {}
}