import { Component, OnInit } from '@angular/core'
import { BreadcrumbService, FlashMessageService } from '@casejs/angular-library'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private flashMessageService: FlashMessageService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    // Info message.
    this.flashMessageService.info('Welcome to CASE.')

    this.breadcrumbService.breadcrumbLinks.next([
      {
        label: `Accueil`
      }
    ])
  }
}
