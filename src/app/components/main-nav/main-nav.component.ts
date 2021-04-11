import { Component } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { AppRoutes } from '../../constants/app-routes'

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  public readonly appRoutes = AppRoutes
  public readonly geoLocationAddress = 'Киевская, 8a'
  public readonly geoLocationDistrict = 'Софиеская борщаговка'
  public readonly geoLocationUrl = `http://maps.google.com/?q=${this.geoLocationDistrict}, ${this.geoLocationAddress}`

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  )

  constructor(private breakpointObserver: BreakpointObserver) {}
}
