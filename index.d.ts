// index.d.ts

declare module "moss-lang" {
  interface Result {
    data: any,
    context: any
  }
  function parse(text: string): Result
  function load(text: string): Result
}