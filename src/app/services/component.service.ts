import { ComponentEntity } from './../entities/component-entity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  private componentUrl: string = 'https://project-non-relational-databas.herokuapp.com/api/components';

  constructor(private httpClient: HttpClient) {}

  save(component: ComponentEntity): Observable<ComponentEntity> {
    return this.httpClient.post<ComponentEntity>(`${this.componentUrl}`, component);
  }

  getComponentsList(): Observable<ComponentEntity[]> {
    return this.httpClient.get<ComponentEntity[]>(this.componentUrl);
  }

  deleteById(id: number): Observable<ComponentEntity[]> {
    return this.httpClient.delete<ComponentEntity[]>(`${this.componentUrl}/${id}`);
  }

  findById(id: number): Observable<ComponentEntity> {
    return this.httpClient.get<ComponentEntity>(`${this.componentUrl}/${id}`);
  }

  update(entity: ComponentEntity): Observable<ComponentEntity> {
    return this.httpClient.put<ComponentEntity>(this.componentUrl, entity);
  }
}
