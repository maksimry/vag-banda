import { Component, OnDestroy, OnInit } from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { PublicApiService } from '../../services/public-api.service'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { debounceTime, filter, takeUntil, throttleTime } from 'rxjs/operators'
import {FeedbackMessageState} from '../../models/feedback-message-state'

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit, OnDestroy {
  private feedbackMessage: BehaviorSubject<string> = new BehaviorSubject<string>('')
  private feedbackMessage$: Observable<string> = this.feedbackMessage.asObservable()

  private readonly successMessageTemplate = 'Спасибо! Ваша заявка оформлена, в ближайшее время свями свяжется мастер.'
  private readonly errorMessageTemplate = 'Что-то пошло не так. Пожалуйста, повторите попытку ещё раз.'
  private readonly initMessageTemplate = 'Оствьте заявку'
  private readonly defaultStatusMessage: FeedbackMessageState = {
    done: false,
    success: false,
    text: this.initMessageTemplate
  }
  private statusMessage: BehaviorSubject<FeedbackMessageState> = new BehaviorSubject<FeedbackMessageState>(this.defaultStatusMessage)
  public statusMessage$: Observable<FeedbackMessageState> = this.statusMessage.asObservable()

  private destroy$ = new Subject()

  public feedbackForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
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
        this.apiService.sendBndServiceBotMessage(feedback).subscribe(
          () => this.successState(),
          () => this.errorState()
        )
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private successState(): void {
    if(this.feedbackForm.invalid) {
      return
    }
    const state: FeedbackMessageState = {
      done: true,
      success: true,
      text: this.successMessageTemplate
    }
    this.statusMessage.next(state)
  }
  private errorState(): void {
    const state: FeedbackMessageState = {
      done: true,
      success: false,
      text: this.errorMessageTemplate
    }
    this.statusMessage.next(state)
  }

  public onSubmit(): void {
    const form = this.feedbackForm.getRawValue()
    const feedback = `${form.name}\n\n${form.phone}\n\n${form.message}`

    this.feedbackMessage.next(feedback.trim())
  }

  public clearField(field: string): void {
    this.feedbackForm.patchValue({ [field]: '' })
  }

  public restoreStatus(): void {
    this.statusMessage.next({
      success: false,
      done: false,
      text: this.initMessageTemplate
    })
  }

}
