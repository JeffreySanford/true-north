import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SamApiContract {
  id: string;
  title: string;
  agency: string;
  value: number;
  status: string;
  postedDate: string;
}

@Injectable({ providedIn: 'root' })
export class SamService {
  private apiUrl = '/api/sam-contracts';

  private http = inject(HttpClient);

  getContractsUnder250k(): Observable<any> {
    const params = new HttpParams()
      .set('noticeType', 'Presolicitation,Solicitation')
      .set('awardAmount', '0,250000')
      .set('sort', 'date')
      .set('status', 'Active');
    return this.http.get<any>(this.apiUrl, { params });
  }
}
