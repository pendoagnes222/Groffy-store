import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { FilterService } from './services/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Cypher Store';
  public searchTerm: string = "";
  
public show = false;

  public opened = true;
  private mediaWatcher;
  loggedIn: Boolean;
  constructor(private authService: AuthService, 
              private media: MediaObserver,
              private router: Router,
              private filterService: FilterService) {
                this.mediaWatcher = this.media.asObservable().pipe(filter((changes:MediaChange[])=> changes.length > 0), map((changes: MediaChange[])=> changes[0]))
                .subscribe((mediaChange: MediaChange) => {
                  this.handleMediaChange(mediaChange);
                });
                
      }

  

 private handleMediaChange(mediaChange: MediaChange) {
        if (this.media.isActive('lt-md')) {
                  this.opened =false;
                }
        else {
                  this.opened = true;
                  
                }
  }
  
  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
    
  }

  ngOnInit(): void {
    
    this.authService.loadUserCredentials();
    this.loggedIn = this.authService.isLoggedIn();
    
  }
ngAfterViewInit(): void {
  
}


  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filterService.search.next(this.searchTerm);    
  }

  logOut() {
    this.authService.logOut();
  }
}
