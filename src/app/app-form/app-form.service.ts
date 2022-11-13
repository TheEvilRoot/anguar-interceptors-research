import {Injectable} from "@angular/core";
import {catchError, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface IGithubProfile {
  login: string
  id: number
  node_id: string
  avatar_url: string | null
  gravatar_id: string | null
  url: string
  type: string
  name: string | null
  company: string | null
  location: string | null
}

@Injectable({
  providedIn: 'root',
})
export class AppFormService {

  constructor(
    public httpClient: HttpClient
  ) {
  }

  getGithubProfile(username: string): Observable<IGithubProfile> {
    return this.httpClient.get<IGithubProfile>(`https://api.github.com/users/${username}`)
  }

}
