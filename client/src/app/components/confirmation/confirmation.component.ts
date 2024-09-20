import { Component, OnDestroy } from '@angular/core';
import { ShowSummaryService } from '../../services/showSummary/show-summary.service';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [IconImgComponent, HeaderComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnDestroy {
  constructor(private showSummaryService: ShowSummaryService) {}

  ngOnDestroy(): void {
    this.showSummaryService.updateShowSummaryStatus(true);
  }
}
