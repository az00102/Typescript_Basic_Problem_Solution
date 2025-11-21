# TypeScript‑এ Interface ও Type Alias

JavaScript দিয়ে কোড করা অনেক মজাই, কিন্তু একটা বড় সমস্যা হচ্ছে এটা
**dynamically typed**, তাই যে কোনো ভ্যারিয়েবল বা অবজেক্টে ভুল টাইপ এসাইন
করলে সেটা অনেক সময় **runtime‑এ** ধরা পড়ে। অর্থাৎ কোড লেখা সময়েই ভুল ধরা
যায় না, ফলে bug আসার ঝুঁকি থাকে। TypeScript ঠিক এই জায়গায় কাজ করে ---
compile‑time‑এ type check করে এবং কোডকে অনেক বেশি safe ও predictable করে
তোলে।

TypeScript‑এ টাইপ ডিফাইন করার জন্য দুইটা খুব পপুলার উপায় আছে --&
**interface** এবং **type alias**। এই দুইটার কাজ প্রায় একই মনে হতে পারে,
কিন্তু তাদের মধ্যে subtle পার্থক্য আছে এবং কাজ অনুযায়ী সঠিকটা বেছে নেওয়া
কোডকে আরও clean, maintainable ও bug‑free রাখে।

---

## Interface কী এবং কীভাবে কাজ করে

**Interface** দিয়ে তুমি একটি object-এর structure বা "shape" স্পষ্টভাবে
নির্ধারণ করতে পারো - যেমন, "এই অবজেক্টে name থাকবে string টাইপে, age
থাকবে number টাইপে" - এবং এটি enforce করে দেয় যে সেই অবজেক্ট যেখানেই
ব্যবহার হবে, সেই কাঠামো মেনে চলবে। এভাবে JavaScript-এর
অবজেক্ট‑structure‑এর ঢিলে‑ঢালা ভুল অনেক কমে যায়।

আরেকটা সুন্দর বিষয় হলো **declaration merging** - যদি তুমি একই নামের
interface একাধিকবার define করো, TypeScript সেগুলোকে একত্রে merge করে
নেয়। বড় প্রোজেক্ট বা লাইব্রেরি‑ডেভেলপমেন্টে এটা অনেক কাজে আসে, কারণ তুমি
পরবর্তী কোডবেসে নতুন প্রোপার্টি যোগ করতে পারো সহজেই।

```ts
interface User {
  name: string;
  age: number;
}

interface User {
  email?: string;
}

const u: User = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
};
```

---

## Type Alias কী এবং কখন ব্যবহার করা উচিত

**Type alias** (বা শুধু "type") অনেক বেশি flexible। এটা শুধু অবজেক্ট
টাইপেই সীমাবদ্ধ না --- তুমি প্রিমিটিভ টাইপ (`string`, `number`), **union
type**, **tuple**, বা এমনকি **intersection type** তৈরি করতে পারো।

```ts
type Status = "success" | "error" | "loading";

type Base = { id: number };
type Timestamp = { timestamp: number };

type LogEntry = Base & Timestamp;

const entry: LogEntry = {
  id: 1,
  timestamp: Date.now(),
};
```

type alias-এ টাইপ এক্সটেন্ড করার জন্য সাধারণত `&` (intersection) ব্যবহার
করা হয়।

```ts
type Person = { name: string };
type Employee = Person & { role: string };

const e: Employee = {
  name: "Bob",
  role: "developer",
};
```

---

## Declaration Merging: Interface VS Type

```ts
interface Person {
  name: string;
}
interface Person {
  age: number;
}
const p1: Person = { name: "Alice", age: 30 };

type PersonType = { name: string };
```

---

## সারাংশ

TypeScript‑এর interface ও type alias মিলিয়ে সেই ঝুঁকি
কমিয়ে দেয় এবং কোডের গুণমান বাড়ায়। Interface দিয়ে তুমি স্পষ্ট অবজেক্ট
চুক্তি enforce করতে পারো, আর type alias দিয়ে জটিল টাইপ কম্বিনেশন (যেমন
union, intersection) তৈরি করা যায়।

# TypeScript এ `any`, `unknown`, এবং `never` টাইপের পার্থক্য

TypeScript এ কিছু বিশেষ টাইপ আছে যেগুলোর কাজ আলাদা—`any`, `unknown` এবং `never`। এগুলো ঠিকভাবে বুঝলে কোড আরও বেশি সেফ, ক্লিন এবং predictable হয়।

---

## `any`

`any` হলো সবচেয়ে ফ্রি বা wildcard টাইপ। মানে এতে যেকোনো ধরনের ভ্যালু রাখা যায় এবং TypeScript কোনো চেক করে না। নতুন কোড শুরুর সময় বা JavaScript থেকে TypeScript এ আসার সময় এটা কাজে লাগে, কিন্তু বেশি ব্যবহার করলে টাইপ সিস্টেমের সুবিধা নষ্ট হয়ে যায়।

```ts
let data: any;
data = "hello";
data = 10;
data = { x: 1 };

console.log(data.toUpperCase()); // runtime error হতে পারে
```

---

## `unknown`

`unknown` অনেকটা `any`-এর মতো হলেও এটি নিরাপদ। Unknown টাইপের ভ্যালুতে তুমি direct কোনো অপারেশন করতে পারবে না—আগে টাইপ চেক করতে হবে।

```ts
let value: unknown = "hello";

value = 42;

// value.toUpperCase(); ❌ (compiler error)

if (typeof value === "string") {
  console.log(value.toUpperCase()); // এখন safe
}
```

---

## `never`

`never` দেখায় যে কোনো ভ্যালুই এখানে আসতে পারে না। সাধারণত এমন ফাংশনে ব্যবহৃত হয় যা কখনো রিটার্ন করে না (infinite loop বা error throw করে)। এছাড়া exhaustive check‑এও কাজে লাগে।

```ts
function throwErr(msg: string): never {
  throw new Error(msg);
}

function loopForever(): never {
  while (true) {}
}

type Option = "a" | "b";

function check(opt: Option) {
  if (opt === "a") console.log("A");
  else if (opt === "b") console.log("B");
  else {
    const impossible: never = opt; // এখানে কোনোদিনই পৌঁছানো উচিত নয়
  }
}
```

---

## সারাংশ

- `any` → সবচেয়ে flexible, কিন্তু unsafe
- `unknown` → flexible কিন্তু টাইপ চেক ছাড়া ব্যবহার করা যায় না, তাই safer
- `never` → এমন পরিস্থিতি বোঝায় যেখানে কোনো ভ্যালু কখনো থাকতে পারে না

এগুলোর সঠিক ব্যবহার TypeScript কোডকে আরও predictable, error‑free এবং maintainable করে তোলে।

---
