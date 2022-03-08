import { Component, HostListener, OnInit } from '@angular/core'
import { NavigationEnd, Router, Scroll } from '@angular/router'
import {
  caseConstants,
  AuthService,
  EventService,
  MenuItem,
  User,
  VersionService,
  ViewportService,
  TopMenuLink
} from '@case-app/angular-library'
import { Subscription } from 'rxjs'
import { menuItems } from './menu-items'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogin = true
  isTouchResolution: boolean
  isCollapsed = false
  path: string
  menuItems: MenuItem[] = menuItems

  topMenuLinks: TopMenuLink[] = [
    {
      label: 'Go to user list',
      icon: 'icon-user',
      routePath: '/users',
      permissionsOr: ['browseUsers']
    }
  ]

  private currentUser: any

  constructor(
    private router: Router,
    private eventService: EventService,
    private viewportService: ViewportService,
    private authService: AuthService,
    private versionService: VersionService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.eventService.routeChanged.next({ url: event.url })
      } else if (event instanceof Scroll && event.anchor) {
        setTimeout(() => {
          const element: HTMLElement = document.getElementById(event.anchor)
          if (element) {
            element.scrollIntoView()
          }
        }, 100)
      }
    })
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((userRes: User) => {
      this.currentUser = userRes
    })

    this.viewportService.isTouchResolution.subscribe((newValue) => {
      this.isTouchResolution = newValue
    })

    this.setIsTouchResolution()

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

      if (!this.isLogin && this.authService.isLoggedIn() && !this.currentUser) {
        this.getCurrentUser()
      }
    })

    this.versionService.checkForNewVersions()
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setIsTouchResolution()
  }

  setIsTouchResolution(): void {
    this.viewportService.isTouchResolution.next(
      window.innerWidth < caseConstants.TOUCH_BREAKPOINT
    )
  }

  getCurrentUser(): void {
    this.authService.me().subscribe((userRes: any) => {
      this.authService.currentUser.next(userRes)
    })
  }
}
