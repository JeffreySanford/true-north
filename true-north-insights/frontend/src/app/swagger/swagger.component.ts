import { Component, OnInit } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const SwaggerUIBundle: any;

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.html',
  styleUrl: './swagger.scss',
  standalone: false,
})
export class SwaggerComponent implements OnInit {
  ngOnInit(): void {
    SwaggerUIBundle({
      url: 'http://localhost:3000/api-json', // URL to your backend's OpenAPI spec
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      layout: 'BaseLayout'
    });
  }
}
