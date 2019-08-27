# NGX Growl

NGX Growl is a module that displays growl like messages

## Dependencies
 * @angular/common
 * @angular/core
 * ngx.logger
 
## Installation
```shell
npm install --save ngx-growl
```

Once installed you need to import our main module:
```js
import {GrowlModule} from 'ngx-growl';
```

The only remaining part is to list the imported module in your application module, passing in a config to intialize the logger.

```js
@NgModule({
  declarations: [AppComponent, ...],
  imports: [GrowlModule.forRoot({maxMessages: 10, displayTimeMs: 5000}), ...],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Config Options
 * maxMessages - The maximum number of messages allowed to be displayed at a time
 * displayTimeMs - The time a message will display before being automatically hidden in milliseconds


## Usage
To use NGX Growl, you will need to add it to your an application html file

```angular2html
<ngx-growl></ngx-growl>

```
  
 
Import the service
 
 ```typescript
import {GrowlService} from 'ngx-growl';

```

Intect the service
```typescript
  constructor(private growlService: GrowlService) {  }

```

 
Then call one of the methods
 
 ```typescript
this.growlService.addError(`You're Error message goes here`);
this.growlService.addError({heading: 'Oops', message: 'an error has occured'});


```
