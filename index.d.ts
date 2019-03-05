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
    patchAdditions: boolean
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

    set(fullDocument: object, path: string, options?: PatchDiffOptions): void;

    remove(path: string, options?: PatchDiffOptions): void;

    splice(path: string, spliceOpts: { index: number, itemsToRemove, itemsToAdd }, options?: PatchDiffOptions): void;

    get(path?: string | Function, callback?: Function): object | undefined ;

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

    at(subPath: string): Replica;

    destroy();

    getWhenExists(path: string);

    data: ProxyHandler<any>;
    existence: Promise<any>;
    subscribed: Promise<object | undefined>;
}
