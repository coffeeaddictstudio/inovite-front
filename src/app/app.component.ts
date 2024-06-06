import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {IonicModule, Platform} from '@ionic/angular';
import OneSignal from '../../plugins/onesignal-cordova-plugin';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [StatusBar],
})
export class AppComponent {

    /**
     * Constructor
     */
    constructor(
        private _statusBar: StatusBar,
        private _platform: Platform,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        // set status color
        this._statusBar.styleDefault();

        // set status bar to white
        this._statusBar.backgroundColorByHexString('#ffffff');

        this._platform.ready()
            .then(() => {
                if (this._platform.is('cordova')) {
                    this.oneSignalInit();
                }
            });
    }

    oneSignalInit(): void
    {
        OneSignal.setAppId(environment.api);
        OneSignal.setNotificationOpenedHandler((jsonData) => {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        });

        // iOS - Prompts the user for notification permissions.
        //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
        OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
            console.log('User accepted notifications: ' + accepted);
        });
    }
}
