import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isToggle: boolean = true;
  toggleDark(): void {
    this.isToggle = !this.isToggle;
    document.body.classList.toggle("dark:from-gray-900")
    document.body.classList.toggle("dark:to-gray-800")
  }

}
