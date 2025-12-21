import { A } from "@solidjs/router";

export default function NavBar() {
  return <nav class="flex w-full bg-rose-600 mb-2 border-b-2 border-rose-600">
      <div class="bg-white flex items-center w-max pl-4 pr-8 py-2">
        <img src="/assets/wipi.svg" class="h-10 mr-2"/>
        <h1 class="text-2xl font-black text-slate-900">WiPi Web UI</h1>
      </div>
      <div class="w-32 bg-gradient-to-r from-white to-rose-600">
      </div>
      <div class="pr-4 w-max">
      </div>
  </nav>;
}
