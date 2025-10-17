import { Controller, Get, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('api/sam-contracts')
export class SamController {
  constructor(private readonly http: HttpService) {}

  @Get()
  getSamContracts(
    @Query('noticeType') noticeType = 'Presolicitation,Solicitation',
    @Query('awardAmount') awardAmount = '0,250000',
    @Query('sort') sort = 'date',
    @Query('status') status = 'Active'
  ): Observable<any> {
    const apiKey = process.env['SAM_GOV_API_KEY'];
    const url = `https://api.sam.gov/opportunities/v2/search`;
    const params = {
      api_key: apiKey,
      noticeType,
      awardAmount,
      sort,
      status,
    };
    return this.http
      .get<any>(url, { params })
      .pipe(map((response) => response.data));
  }
}
