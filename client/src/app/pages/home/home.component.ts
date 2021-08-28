import { Component, OnInit } from '@angular/core'
import { FlashMessageService } from '@case-app/angular-library'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private flashMessageService: FlashMessageService) {}

  ngOnInit(): void {
    // Info message.
    this.flashMessageService.info('Welcome to CASE.')
  }
}
