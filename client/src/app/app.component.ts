import { Component, HostListener, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import {
  abcConstants,
  AuthService,
  EventService,
  MenuItem,
  MetaService,
  User,
  VersionService,
  ViewportService,
} from 'abacus-angular-library'
import { Subscription } from 'rxjs'
import { menuItems } from './menu-items'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLogin = true
  isTouchResolution: boolean
  isCollapsed = false
  path: string
  menuItems: MenuItem[] = menuItems

  private currentUser: any
  private eventSubscriptions = new Subscription()
  private subscription = new Subscription()

  constructor(
    private metaService: MetaService,
    private router: Router,
    private eventService: EventService,
    private viewportService: ViewportService,
    private authService: AuthService,
    private versionService: VersionService
  ) {
    this.eventSubscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.eventService.routeChanged.next({ url: event.url })
        }
      })
    )
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((userRes: User) => {
      this.currentUser = userRes
    })

    this.viewportService.isTouchResolution.subscribe((newValue) => {
      this.isTouchResolution = newValue
    })

    this.setIsTouchResolution()

    this.subscription.add(
      this.eventService.routeChanged.subscribe((routeChanged) => {
        // Scroll top
        window.scrollTo(0, 0)

        this.path = routeChanged.url.includes('?')
          ? routeChanged.url.substring(0, routeChanged.url.indexOf('?'))
          : routeChanged.url
        this.isLogin =
          this.path.includes('/login') ||
          this.path.includes('forgot-password') ||
          this.path.includes('reset-password')

        if (
          !this.isLogin &&
          this.authService.isLoggedIn() &&
          !this.currentUser
        ) {
          this.getCurrentUser()
        }
      })
    )

    this.versionService.checkForNewVersions()
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setIsTouchResolution()
  }

  setIsTouchResolution(): void {
    this.viewportService.isTouchResolution.next(
      window.innerWidth < abcConstants.TOUCH_BREAKPOINT
    )
  }

  getCurrentUser(): void {
    this.authService.me().subscribe((userRes: any) => {
      this.authService.currentUser.next(userRes)
    })
  }
}
