import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { PublicApiService } from '../../services/public-api.service'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { debounceTime, filter, takeUntil, throttleTime } from 'rxjs/operators'

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit, OnDestroy {
  private feedbackMessage: BehaviorSubject<string> = new BehaviorSubject<string>('')
  private feedbackMessage$: Observable<string> = this.feedbackMessage.asObservable()
  private destroy$ = new Subject()

  public feedbackForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    message: new FormControl('')
  })

  constructor(private apiService: PublicApiService) {}

  ngOnInit(): void {
    this.feedbackMessage$
      .pipe(
        debounceTime(500),
        throttleTime(1500),
        takeUntil(this.destroy$),
        filter(feedback => !!feedback)
      )
      .subscribe(feedback => {
        this.apiService.sendBndServiceBotMessage(feedback)
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public onSubmit(): void {
    const form = this.feedbackForm.getRawValue()
    const feedback = `${form.name}\n\n${form.phone}\n\n${form.message}`

    this.feedbackMessage.next(feedback.trim())
  }

  public clearField(field: string): void {
    this.feedbackForm.patchValue({ [field]: '' })
  }
}
