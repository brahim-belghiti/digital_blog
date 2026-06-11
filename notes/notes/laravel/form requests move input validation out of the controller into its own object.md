---
type: claim
aliases:
  - laravel-form-requests
id: laravel-form-requests
title: Form Requests
tags:
  - laravel
  - architecture
  - validation
---

# Form Requests

A Form Request is a class that moves input validation out of the controller into its own object. Laravel resolves it through the service container and runs validation before your controller method is reached. If validation fails, the method never executes.

```php
class StoreSeriesAnswersRequest extends FormRequest
{
    public function rules()
    {
        return [
            'answers'               => 'required|array',
            'answers.*.question_id' => 'required|integer',
            'answers.*.selected'    => 'required|array',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $series = Series::findOrFail($this->route('seriesId'));
            $ids = $series->questions->pluck('id')->toArray();
            foreach ($this->answers as $answer) {
                if (!in_array($answer['question_id'], $ids)) {
                    $validator->errors()->add('answers', "Question doesn't belong to this series");
                }
            }
        });
    }
}
```

`withValidator` is where you add contextual validation — rules that need database state to evaluate, not just input shape.

## What it gives you

- The controller receives `$request->validated()` — clean, already-checked data.
- Domain validation (in Actions) never receives malformed input.
- Validation rules are readable in isolation, not buried in controller logic.

## Difference from domain validation

Form Requests check input structure: is the format correct, are required fields present, do ids reference real records? This is structural validation. Domain validation — whether an operation is permitted given business rules — belongs in pure functions or Action classes.

→ [[a controller has one job, translate an HTTP request into an HTTP response|thin controllers]]: the controller is reduced to a type hint + `$request->validated()` call.
→ [[action classes encapsulate one business operation in one class|action classes]]: the Action receives clean data from the Form Request.
