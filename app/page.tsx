'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import BloodPressureForm from './components/BloodPressureForm';
import BloodPressureChart from './components/BloodPressureChart';

export default function Home() {
  return (
    <Authenticator>
      {({ signOut }) => (
        <main className="min-h-screen p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">血圧管理アプリ</h1>
            <button
              onClick={signOut}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              ログアウト
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">血圧入力</h2>
                <BloodPressureForm />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">血圧推移</h2>
                <BloodPressureChart />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">アドバイス</h2>
              <p>
                ※ 以下の場合は医師に相談することをお勧めします：
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>最高血圧が140mmHg以上</li>
                  <li>最低血圧が90mmHg以上</li>
                  <li>最高血圧が100mmHg未満</li>
                  <li>最低血圧が60mmHg未満</li>
                </ul>
              </p>
            </div>
          </div>
        </main>
      )}
    </Authenticator>
  );
}
