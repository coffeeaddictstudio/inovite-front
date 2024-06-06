import {Inject, Injectable, NgZone, Optional, TemplateRef} from '@angular/core';
import {DialogPosition, MatDialog, MatDialogConfig as _MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/portal';
import {Subject} from 'rxjs';

const diractionMap = {left: 'left', right: 'left', top: 'top', bottom: 'top'};
const multyMap = {left: 1, right: -1, top: 1, bottom: -1};

interface AnimationOption {
    keyframes?: Keyframe[];
    keyframeAnimationOptions: KeyframeAnimationOptions;
}

export interface MatDialogConfig extends _MatDialogConfig {
    data?: any;
    animation?:
        | {
        to: 'aside' | 'top' | 'bottom' | 'left' | 'right';
        incomingOptions?: { keyframes?: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
        outgoingOptions?: { keyframes?: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
    }
        | {
        to?: 'aside' | 'top' | 'bottom' | 'left' | 'right';
        incomingOptions?: { keyframes: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
        outgoingOptions?: { keyframes: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
    };
    position?: DialogPosition & { rowStart?: string; rowEnd?: string };
}

@Injectable({
    providedIn: 'root',
})
export class MatCustomDialog {
    constructor(
        private dialog: MatDialog,
        private ngZone: NgZone,
        @Optional()
        @Inject('INCOMING_OPTION')
        private incomingOptions?: AnimationOption,
        @Optional()
        @Inject('OUTGOING_OPTION')
        private outgoingOptions?: AnimationOption,
    ) {
    }

    open<T, D = any, R = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config: MatDialogConfig,
    ): MatDialogRef<T, R> {

        const ref = this.dialog.open(componentOrTemplateRef, {
            ...config
        });
        const container = document.getElementsByTagName('mat-dialog-container')[document.getElementsByTagName('mat-dialog-container').length - 1] as HTMLElement;

        if (config.animation) {
            const incomingOptions: AnimationOption = {keyframeAnimationOptions: {duration: 150, easing: 'ease-in'}};
            const outgoingOptions: AnimationOption = {keyframeAnimationOptions: {duration: 250, easing: 'ease-out'}};

            const wrapperLength = document.getElementsByClassName('cdk-global-overlay-wrapper').length;
            const wrapper = document.getElementsByClassName('cdk-global-overlay-wrapper')[wrapperLength - 1];

            // @ts-ignore
            wrapper.children[0].getElementsByClassName('mat-dialog-container')[0].setAttribute('style', 'padding-top: ' + (wrapperLength - 1) * 20 + 'px');

            // @ts-ignore
            const animate = (keyframes: Keyframe[] | PropertyIndexedKeyframes | null | undefined, options: number | KeyframeAnimationOptions | undefined) => wrapper.animate(keyframes, options);

            const _afterClosed = new Subject();
            ref.afterClosed = () => _afterClosed.asObservable();

            const closeFunction = ref.close;

            let incomeKeyFrames = incomingOptions.keyframes;
            let outgoingKeyFrames = outgoingOptions.keyframes;

            if (config.animation.to) {
                // @ts-ignore
                const to = diractionMap[config.animation.to];
                const keyFrame100 = {};
                const keyFrame0 = {};
                // @ts-ignore
                keyFrame0[to] = 0;
                // @ts-ignore
                keyFrame100[to] = to === 'top' || to === 'bottom' ? container.clientHeight * multyMap[config.animation.to] + 'px' : container.clientWidth * multyMap[config.animation.to] + 'px';

                incomeKeyFrames = incomeKeyFrames || [keyFrame100, keyFrame0];
                outgoingKeyFrames = outgoingKeyFrames || [keyFrame0, keyFrame100];
            }
            animate(incomeKeyFrames, incomingOptions.keyframeAnimationOptions);
            const closeHandler = (dialogResult?: R) => {
                _afterClosed.next(dialogResult); // Pass the dialog result instead of null.
                const animation = animate(outgoingKeyFrames, outgoingOptions.keyframeAnimationOptions);
                animation.onfinish = () => {
                    (wrapper as HTMLElement).style.display = 'none';
                    this.ngZone.run(() => ref.close(dialogResult));
                };
                ref.close = closeFunction;
            };
            ref.close = (dialogResult?: R) => closeHandler(dialogResult);
        }

        return ref;
    }
}
