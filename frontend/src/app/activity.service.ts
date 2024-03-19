// app/activity.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from './activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = 'http://localhost:5000/api/activities';

  constructor(private http: HttpClient) { }

  getAllActivities(token: string): Observable<Activity[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Activity[]>(this.baseUrl, { headers });
  }

  getActivityById(token: string, id: string): Observable<Activity> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Activity>(`${this.baseUrl}/${id}`, { headers });
  }

  addActivity(token: string, activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(headers);
    return this.http.post<Activity>(`${this.baseUrl}/create`, activity, { headers: headers });
  }

  updateActivity(token: string, activity: Activity): Observable<Activity> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Activity>(`${this.baseUrl}/update/${activity._id}`, activity, { headers });
  }

  deleteActivity(token: string, activityName: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.baseUrl}/delete/${activityName}`, { headers });
  }
}
