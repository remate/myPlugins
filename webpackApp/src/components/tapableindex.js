import { SyncHook, SyncBailHook, AsyncParallelHook } from "tapable";
export default class taps {
    constructor() {
        console.log('tapinit')
        this.hooks = {
            beforeCom: new SyncHook(['status']),
            afterCom: new SyncBailHook(['name']),
            hacks: new AsyncParallelHook(['name']),
        }
        this.hooks.beforeCom.tap('taps', (stats) => {
            console.log(stats)
        })
        this.hooks.afterCom.tap('taps', (num) => {
            console.log(num)
            return;
        })
        // this.hooks.hacks.tapAsync('taps', (name, cb) => {
        //         console.log(name,1)
        //         cb();
        // })
        // this.hooks.hacks.tapAsync('taps', (name, cb) => {
        //     setTimeout(() => {
        //         console.log(name,2)
        //         cb();
        //     }, 4000);
        // })
        this.hooks.hacks.tapPromise('1', function (name, cb) {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    console.log(name, 1);
                    resolve();
                }, 1000);
            });
        });

        this.hooks.hacks.tapPromise('2', function (name, cb) {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    console.log(name, 2);
                    reject('wrong');// reject()的参数是一个不为null的参数时，最后的回调就不会再调用了
                }, 2000);
            });
        });
        this.start()
    }
    start() {
        // this.hooks.hacks.callAsync('hello', () => {
        //     console.log('end')
        // })
        // this.hooks.beforeCom.call('starts')
        // this.hooks.afterCom.call(1)
        this.hooks.hacks.promise('webpack')
            .then(() => {
                console.log('over');
            }, () => {
                console.log('error');
            });
    }
}