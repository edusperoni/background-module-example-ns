import { Observable, OperatorFunction } from 'rxjs';

// make this available in Zone-less environments
function zoneDefined() {
  return typeof Zone !== 'undefined';
}

export type ZoneRunType = Pick<Zone, 'run'>;

/**
 * RxJS operator that will run the code in the zone that:
 * 1. was passed as a parameter
 * 2. the zone the subscribe runs
 * 3. the zone returned from the parameter function called when subscribe runs
 *
 * @param zone Desired zone. Either the Zone or a function that returns a Zone that will be called when the observable is created.
 */
export function runInsideZone<T>(zone?: ZoneRunType | (() => ZoneRunType)): OperatorFunction<T, T> {
  return (source) =>
    new Observable<T>((observer) => {
      let currentZone: ZoneRunType | undefined = zone instanceof Function ? zone() : zone;
      if (!currentZone) {
        currentZone = zoneDefined()
          ? Zone.current
          : {
            run: (fn) => fn(),
          };
      }
      source.subscribe({
        next: (x) => currentZone!.run(() => observer.next(x)),
        error: (err) => currentZone!.run(() => observer.error(err)),
        complete: () => currentZone!.run(() => observer.complete()),
      });
    });
}
