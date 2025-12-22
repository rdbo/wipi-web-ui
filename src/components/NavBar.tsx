import { A } from "@solidjs/router";

export default function NavBar() {
  return <nav class="flex w-full mb-2 shadow-gray-300 shadow-md">
      <div class="bg-white flex items-center w-max pl-4 pr-8 py-2">
        <img src="/assets/wipi.svg" class="h-10 mr-2"/>
        <h1 class="text-2xl font-black text-slate-900">WiPi Web UI</h1>
      </div>
      <div class="pr-4 w-max">
      </div>
  </nav>;
}
