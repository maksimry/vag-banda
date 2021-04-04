import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {
  private readonly TG_BOT_API_KEY = '1711090038:AAHK9jrrRC2KUBVV9Gsr0HZRATac0szwRYo'
  private readonly TG_CHAT_ID = '@bndservice'
  private readonly url = `https://api.telegram.org/bot${this.TG_BOT_API_KEY}/sendMessage?chat_id=${this.TG_CHAT_ID}&text=`
  constructor(private http: HttpClient) {}

  public tgTest() {
    return this.http.get(this.url + 'test rybonie')
  }
}
