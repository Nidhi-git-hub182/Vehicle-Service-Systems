import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/issue/')
      .then(res => {
        // This makes sure the chart and math always find the number
        const cleanData = res.data.map(item => ({
          ...item,
          final_cost: parseFloat(item.cost || item.total_cost || 0)
        }));
        setData(cleanData);
      })
      .catch(err => console.error(err));
  }, []);

  const totalRevenue = data.reduce((sum, item) => sum + item.final_cost, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Vehicle Service Revenue Dashboard</h1>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', textAlign: 'center', margin: '20px auto', maxWidth: '500px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: 0 }}>Total Revenue: ${totalRevenue.toLocaleString()}</h2>
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', height: '400px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="vehicle_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="final_cost" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
