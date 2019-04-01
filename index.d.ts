import {LitElement} from "@polymer/lit-element";
import { DirectiveFn } from "lit-html";

declare class PatchDiffOptions {
    /**
     * set this to false should allow faster merging but it is not implemented yet
     */
    emitEvents: boolean;
    undefinedKeyword: '__$$U';
    deleteKeyword: '__$$D';
    spliceKeyword: '__$$S';
    protoKeyword: '__$$P';
    patchDeletions: boolean;
    patchAdditions: boolean;
    emitAdditions: boolean;
    emitUpdates: boolean;
    emitDifferences: boolean;
    maxKeysInLevel: number;
    maxLevels: number;
    maxListeners: number;
}

declare class PatchDiff {

    constructor(object, options: PatchDiffOptions);

    options: PatchDiffOptions;

    apply(patch: object, path?: string, options?: PatchDiffOptions): void;

    /**
     * @param path - must be a truthy value
     */
    set(fullDocument: any, path: string | number, options?: PatchDiffOptions): void;

    /**
     * @param path - must be a truthy value
     */
    remove(path: string | number, options?: PatchDiffOptions): void;

    splice(path: string, spliceOpts: { index: number, itemsToRemove, itemsToAdd }, options?: PatchDiffOptions): void;

    /**
     * @param path - must be a truthy value
     */
    get(path?: string | number | Function, callback?: Function): any | undefined ;

    on(path: string, fn: Function): void;

    /**
     * @returns {Function} unsubscribe function
     */
    subscribe(path?: string | Function, fn?: Function): Function;

    at(subPath: string): PatchDiff;

    observe(path: string, fn: Function): void; //alias for on
    override(fullDocument: object, path: string, options?: PatchDiffOptions): void; //alias for set
    static utils;
}

declare class ReplicaOptions extends PatchDiffOptions {
    readonly: boolean;
    subscribeRemoteOnCreate: boolean;
    dataObject: any;
}

export declare class Replica extends PatchDiff {
    constructor(remotePath: string, options?: ReplicaOptions);

    subscribeRemote(connection?, connectionCallback?);

    unsubscribeRemote();

    /**
     * @param subPath - must be a truthy value 
     */
    at(subPath: string | number): Replica;

    destroy();

    getWhenExists(path: string);

    data: ProxyHandler<any>;
    existence: Promise<any>;
    subscribed: Promise<object | undefined>;
}

export declare class ReplicaDiff {
    hasAdditions: boolean;
    hasDeletions: boolean;
    snapshot: any;
}

/**
 * Watch callback to be invoked on every change on path
 * If callback returns false value, then it will prevent default behaviour of calling requestUpdate
 */
export type ReplicaWatchCallback = (patch, diff: ReplicaDiff, valueAtPath: any) => boolean | void;

export declare class PolymerElementMixin {
    /**
     * @returns Unwatch function
     */
    watch(data: Replica | ProxyHandler<any>, path?: string | number, cb?: ReplicaWatchCallback): () => void;

    /**
     * Unsubscribes all watchers
     */
    clearAll(): void;
    replicaByData(data: Replica | ProxyHandler<any>): { replica: Replica, basePath: string };
}


export declare class LitElementMixin extends PolymerElementMixin {
    render(diff, data): void;
    directive()
    binder(replicaOrProxy: Replica | ProxyHandler<any>): (path: string) => DirectiveFn;

    /**
     * Invoked for you on disconnectedCallback
     */
    cleanDirectives():void;
    setupLitHtmlDirective
}

export declare class LiveReplicaLitElementMixin {
    liveReplica: LitElementMixin;
}
