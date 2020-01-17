<template>
  <div>
    <p>{{ msg }}</p>
    <p>{{ name }}</p>
    <span>现有食物共{{ foodCount }}个</span>
    <ul>
      <li v-for="(fea, key) in foods" :key="key">{{ fea }}</li>
    </ul>
    <input
      type="text"
      placeholder="输入食物，回车上屏"
      @keyup.enter="addFood"
    />
    <p>{{ employee.fullName }}</p>
    <p>{{ someData }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

// 类型注解
let name: string | number = "张三";
let age = 2; // 类型推论 NUmber
name = 23;

// 数组类型
let names: (string | number)[];
names = ["tom", "jerry", 1];
let personList: Array<string>;
personList = ["name", "hello", "22"];

// any 任意类型
let list: any[] = [1, "add", true];

// 函数中使用
function greeting(person: string): string {
  return "hello, " + person;
}
greeting("tom");

// void 类型
function warn(msg: string): void {
  console.warn("warn" + msg);
}

/*内置类型 string, number, object, boolean, void, any*/

/* ts函数中如果声明，就是必选参数 */
function sayHello(person: string, age?: number): string {
  return "hello, " + person;
}
sayHello("tom", 2);

/* 函数重载 */
function info(a: { name: string }): string;
function info(a: string): object;
function info(a: any): any {
  if (typeof a === "object") {
    return a.name;
  } else {
    return { name: a };
  }
}
info({ name: "ad" });

@Component
export default class Hello extends Vue {
  @Prop()
  private msg!: string; // 加上感叹号后表示msg必传
  @Prop({
    default: "可选名"
  })
  private name?: string; // ？表示可选
  // @Prop()
  // private obj!: { foo: string }; // 表示传入的obj必须由foo属性

  /* 普通的属性相当于data */
  private foods: string[] = ["牛奶", "面板", "意大利炮"];
  private employee: Employee = new Employee("张", "三");
  private someData: Feature = { id: 2, name: "2", version: "2" };

  // 计算属性
  get foodCount() {
    return this.foods.length;
  }

  @Emit() //没有参数的话将指定事件名
  private addFood(event: any): void {
    // 若没有返回值将以形参作为事件参数
    this.foods.push(event.target.value);
  }
  @Watch("foods")
  onFoodAdded(val: string, oldVal: any) {
    console.log(val, oldVal);
  }
  created(): void {
    console.log(this.employee.fullName);
    this.employee.fullName = "李 四";
  }

  async mounted() {
    const res: Response<Feature> = await getData<Feature>();
    this.someData = res.data;
  }

  private features: Feature[] = [];
}

// 类
class Employee {
  // private firstName;
  // private lastName
  constructor(firstName: string, lastName: string, public id?: number) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  private firstName: string = "张";
  private lastName: string = "三";
  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }
  set fullName(name: string) {
    let newName: Array<string> = name.split(" ");
    this.firstName = newName[0];
    this.lastName = newName[1];
  }
}

// feature 数组里隐式的指定也可以的
class Feature {
  constructor(public id: number, public name: string, public version: string) {}
}
let features: Feature[] = [
  // { id: 2, name: "2", version: 2 },
  { id: 2, name: "2", version: "123" }
];

/* 接口 ts的接口不要求实现 */
interface Animal {
  name: string;
  birthday: number;
  eat(): void;
  bark(): string;
}
function setName(animal: Animal, name: string): void {
  animal.name = name;
  console.log(`there we have a ${animal.name}`);
}
setName(
  {
    // ts的接口不要求实现,. 只要结构符合就行
    name: "2",
    birthday: 12,
    eat: () => {},
    bark(): string {
      return "汪汪汪";
    }
  },
  "小狗"
);

class Dog implements Animal {
  constructor(public name: string, public birthday: number) {
    console.log(`${this.name} was born!!`);
  }

  bark(): string {
    console.log("汪汪汪");
    return "汪汪汪";
  }

  eat(): void {
    console.log(`${this.name} is eating`);
  }
}
let xiaoJiu = new Dog("小久", 20181001);
setName(xiaoJiu, "大舅");
xiaoJiu.eat();

/* 泛型 */
interface Response<T> {
  ok: 0 | 1;
  data: T;
}
function getData<T>(): Promise<Response<T>> {
  const data: Feature = { id: 2, name: "编译型语言", version: "1.0" };
  return Promise.resolve(({ ok: 1, data } as unknown) as Response<T>);
}
</script>

<style lang="scss" scoped></style>
