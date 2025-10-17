import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SamService, SamApiContract } from './sam.service';

// ...existing code...

@Component({
  selector: 'app-sam',
  templateUrl: './sam.html',
  styleUrls: ['./sam.scss'],
  standalone: false,
})
export class SamComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'agency',
    'value',
    'status',
    'postedDate',
  ];
  dataSource = new MatTableDataSource<SamApiContract>([]);

  totalContracts = 0;
  totalValue = 0;

  samService = inject(SamService);

  ngOnInit() {
    this.samService.getContractsUnder250k().subscribe((result) => {
      // Map API response to table format
      const contracts: SamApiContract[] = (result?.opportunities || []).map(
        (item: any) => ({
          id: item.noticeId,
          title: item.title,
          agency: item.agencyName,
          value: item.estimatedValue || 0,
          status: item.status,
          postedDate: item.postedDate,
        })
      );
      this.dataSource.data = contracts;
      this.totalContracts = contracts.length;
      this.totalValue = contracts.reduce((sum, c) => sum + c.value, 0);
    });
  }
}
