import { platformNativeScript } from "@nativescript/angular";
import { BackgroundModule } from "./background.module";
import { SmsService } from "./app/sms.services";
import { NgZone } from "@angular/core";

const bgModule = platformNativeScript().bootstrapModule(BackgroundModule);

@JavaProxy("com.angularnation.SmsReceiver")
@NativeClass
class SmsReceiver extends android.content.BroadcastReceiver {
  public async onReceive(
    context: globalAndroid.content.Context,
    intent: globalAndroid.content.Intent
  ) {
    const module = await bgModule;
    const smsService = module.injector.get(SmsService);
    const zone = module.injector.get(NgZone);
    // zone.run(() => {
    console.log("sms received!");
    if (intent.getAction() === "android.provider.Telephony.SMS_RECEIVED") {
      const bundle = intent.getExtras();
      let msgs = [];
      if (bundle != null) {
        try {
          const pdus = bundle.get("pdus");
          for (let i = 0; i < pdus.length; i++) {
            msgs.push(android.telephony.SmsMessage.createFromPdu(pdus[i]));
            const msgBody = msgs[i].getMessageBody();
            smsService.receiveSms(msgBody);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    // });
  }
}
