/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Chat from './components/Chat';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[85vh]">
        <header className="bg-indigo-600 text-white p-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Aptech Admission Support</h1>
          <p className="text-indigo-100 text-sm">Ask me about courses, fees, and admissions.</p>
        </header>
        <main className="flex-1 overflow-hidden relative">
          <Chat />
        </main>
      </div>
    </div>
  );
}
