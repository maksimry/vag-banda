import { Component } from '@angular/core'
import { AppRoutes } from '../../constants/app-routes'
import { Contacts } from '../../constants/contacts'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public readonly appRoutes = AppRoutes
  public readonly contacts = Contacts
}
