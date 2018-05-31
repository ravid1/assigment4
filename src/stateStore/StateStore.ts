interface IStateStore {
    state: {};
}

class StateStoreService {
    listeners: Function[] =[];

   public set(key: string, val: any) {
        StateStore.getInstance()[key] = val;
        this.onStoreChanged();
    }

   public get(key: string) {
        return StateStore.getInstance()[key] || null;
    }
   public subscribe(listener:Function){
        this.listeners.push(listener);
    }

   private onStoreChanged(){
        for(const listener of this.listeners){
            listener();
        }
    }
}

class StateStore implements IStateStore{
    state: {};

    static instance: IStateStore;
    static getInstance() {
        if (!StateStore.instance) {
            StateStore.instance = new StateStore();
        }
        return StateStore.instance;
    }
}

export default StateStore;

export const stateStoreService = new StateStoreService();