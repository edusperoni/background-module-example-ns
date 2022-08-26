import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, of, ReplaySubject, Subject } from "rxjs";

@Injectable({
  providedIn: "platform",
})
export class PlatformSmsService {
  // http = inject(HttpClient);
  receivedSms$ = new ReplaySubject<string>(1);
}

@Injectable({
  providedIn: "root",
})
export class SmsService {
  http = inject(HttpClient);
  platformSmsService = inject(PlatformSmsService);

  receiveSms(data: string) {
    this.platformSmsService.receivedSms$.next(data);
    this.http.post("https://httpbin.org/post", { data }).subscribe((res) => {
      console.log(res);
    });

    // this.http
    //   .post<{
    //     message: string;
    //   }>("http://10.0.2.2:9000", { data })
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res.message);
    //     },
    //     error: (e) => {
    //       console.log("error", e);
    //     },
    //   });
  }
}
