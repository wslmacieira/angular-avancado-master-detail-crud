import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { CategoryService } from "../../categories/shared/category.service";

import { Entry } from "./entry.model";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries"

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToEntries)
    )
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`

    return this.http.get(url).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToEntry)
    )
  }

  create(entry: Entry): Observable<Entry> {

    // Observable<Observable<Entry>> se usar o map 
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category

        // Observable<Entry>
        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleErro),
          map(this.jsonDataToEntry)
        )
      })
    )
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category

        return this.http.put(url, entry).pipe(
          catchError(this.handleErro),
          map(() => entry)
        )
      })
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`

    return this.http.delete(url).pipe(
      catchError(this.handleErro),
      map(() => null)
    )
  }

  // PRIVATE METHODS

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    // Objeto Generico
    // console.log(jsonData[0] as Entry)
    // New Objeto 
    // console.log(Object.assign(new Entry(), jsonData[0]))

    const entries: Entry[] = []
    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element)
      entries.push(entry)
    })
    return entries
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData)
  }

  private handleErro(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO =>", error)
    return throwError(error)
  }
}
