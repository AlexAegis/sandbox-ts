# Multicasting and shareing

## Multicast

In this "area" of operators, the most basic building block is `multicast`. It
needs a Subject (either directly or through a factory) and it subscribes to what
was there before and puts everything into that subject.

If you would handcraft something like this it would look like this:

```ts
const o1 = of(1, 2, 3);
const s = new Subject();

s.subscribe((n) => console.log(n)); // 1, 2, 3

o1.subscribe(s); // like multicast and connect
// order matters, water will flow down the sink if you open the tap before putting a glass under it.
```

With multicast like this:

```ts
const o1 = of(1, 2, 3);
const o2 = o1.pipe(multicast(new Subject())); //might have to do a cast here to ConnectableObservable if ts cant infer

o2.subscribe((n) => console.log(n)); // 1, 2, 3 after connect
o2.connect(); // multicast only subscribes on connect
```

It looks like it does nothing, still the same output. but all it does is that
it's separates parts of your pipeline. You know if you call complete on an
observable, the whole pipeline will essentially "shut down", unless you create
these cut-off points, do define some sort of segments in your pipeline. These
are like one-way valves, events only goes down.

## The next building block is `share`

Share is just a shorthand for `multicast(new Subject())` and a `refCount()`.

We talked about the first part, but what is refCount?

It just keeps track of the number of subscriptions, and automates `connect` for
us.

```ts
const o1 = of(1, 2, 3);
const o2 = o1.pipe(multicast(new Subject()), refCount());

o2.subscribe((n) => console.log(n)); // 1, 2, 3
```

## Observables

Observables are things you can subscribe to and can emit multiple things into
that subscription. Can also complete, and error out.

## Observer

Usually a set of functions that is an interface to a subscription. It can
recieve the emits, the errors, and the complete events. (subscribe recieves
these 3 functions separately. In the future it will like be inside a single
object that has this 3 methods, to be more consistent)

## Subject

Now lets talk about subjects. Subjects are Observables and Observers in one
package. You can make it emit, and you can subscribe into them.

## ReplaySubject

Same thing, but with a cache! It remembers the last `n` emits, and on
subscription these ones will be re-emitted into the new subscription.

## BehaviorSubject

ReplaySubject(1) but with a default value. This means that this subject will
always have something in it. And because of this you can access it
synchronously. With `.value`.

## shareReplay

Now you can probably figure this one out yourself. its the same as share but
with a ReplaySubject.
