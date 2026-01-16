import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { BsBoxSeam, BsPeople, BsTags, BsBell } from 'react-icons/bs';
export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, clients: 0, categories: 0 });
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(localStorage.total || 0);
  const [totalcategories, setotalcategories] = useState(localStorage.totalcategories || 0);
  const [totalclients, settotalclients] = useState(localStorage.totalclients || 0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const prodArea = {
        series: [{ name: 'Stock level', data: [31, 40, 28, 51, 42, 109, 100] }],
        chart: { type: 'area', height: 250, toolbar: { show: false } },
        colors: ['#6366f1'], stroke: { curve: 'smooth' },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] }
      };
      const prodBar = {
        series: [{ name: 'New Products', data: [11, 32, 45, 32, 34, 52, 41] }],
        chart: { type: 'bar', height: 250, toolbar: { show: false } },
        colors: ['#818cf8'], plotOptions: { bar: { borderRadius: 4 } },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] }
      };
      const clientDonut = {
        series: [44, 55, 13],
        chart: { type: 'donut', height: 250 },
        labels: ['VIP', 'Regular', 'New'],
        colors: ['#10b981', '#34d399', '#a7f3d0'],
        legend: { position: 'bottom' }
      };
      const clientRadar = {
        series: [{ name: 'Satisfaction', data: [80, 50, 30, 40, 100, 20] }],
        chart: { type: 'radar', height: 250 },
        xaxis: { categories: ['Support', 'Price', 'UX', 'Speed', 'Quality', 'Value'] },
        colors: ['#10b981']
      };
      const catColumn = {
        series: [{ name: 'Categories', data: [76, 85, 101, 98, 87, 105] }],
        chart: { type: 'bar', height: 250, toolbar: { show: false } },
        colors: ['#f59e0b'], xaxis: { categories: ['Tech', 'Food', 'Home', 'Toys', 'Auto', 'Art'] }
      };
      const catLine = {
        series: [{ name: 'Growth', data: [10, 41, 35, 51, 49, 62, 69] }],
        chart: { type: 'line', height: 250, toolbar: { show: false } },
        colors: ['#fbbf24'], stroke: { width: 4, curve: 'stepline' },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] }
      };

      const render = (id, options) => {
        const el = document.querySelector(id);
        if (el) {
          const c = new ApexCharts(el, options);
          c.render();
          return c;
        }
        return null;
      };

      // Initialization using the safety check
      window._dashboardCharts = [
        render("#prod-1", prodArea),
        render("#prod-2", prodBar),
        render("#client-1", clientDonut),
        render("#client-2", clientRadar),
        render("#cat-1", catColumn),
        render("#cat-2", catLine)
      ];
      setTotal(+localStorage.total + (+localStorage.added || 0) - (+localStorage.deleted || 0));
      setotalcategories((+localStorage.totalcategories || 0) + (+localStorage.addedCatgories || 0) - (+localStorage.deletedCatgories || 0));
      settotalclients((+localStorage.totalclients || 0) + (+localStorage.addedClients || 0) - (+localStorage.deletedClients || 0));
    }, 100); 

    return () => {
      // Cleanup
      clearTimeout(timer);
      if (window._dashboardCharts) {
        window._dashboardCharts.forEach(c => c && c.destroy());
      }
    };
  }, []);

  return (
    <main style={mainContainerStyle}>
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ color: '#0f172a', fontSize: '24px', fontWeight: '800', margin: 0 }}>Welcome to Your Dashboard</h1>
      </div>

      <div style={statsGridStyle}>
        <StatCard title="Total Products" value={total} icon={<BsBoxSeam />} color="#6366f1" />
        <StatCard title="Active Clients" value={totalclients} icon={<BsPeople />} color="#10b981" />
        <StatCard title="Categories" value={totalcategories} icon={<BsTags />} color="#f59e0b" />
        <StatCard title="System Alerts" value="12" icon={<BsBell />} color="#f43f5e" />
      </div>

      <div style={chartsGridStyle}>
        <div style={cardStyle}><h4 style={cardTitleStyle}>Product: Stock Trend</h4><div id="prod-1"></div></div>
        <div style={cardStyle}><h4 style={cardTitleStyle}>Client: Segmentation</h4><div id="client-1"></div></div>
        <div style={cardStyle}><h4 style={cardTitleStyle}>Category: Levels</h4><div id="cat-1"></div></div>
        <div style={cardStyle}><h4 style={cardTitleStyle}>Product: New Entries</h4><div id="prod-2"></div></div>
        {/* <div style={cardStyle}><h4 style={cardTitleStyle}>Client: Satisfaction</h4><div id="client-2"></div></div> */}
      </div>
    </main>
  );
}
const mainContainerStyle = { width: '100%', minHeight: '100vh', padding: '30px', boxSizing: 'border-box', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' };
const statsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' };
const chartsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', flex: 1 };
const cardStyle = { background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' };
const cardTitleStyle = { margin: '0 0 15px 0', color: '#475569', fontSize: '15px', fontWeight: '700', textTransform: 'uppercase' };

const StatCard = ({ title, value, icon, color }) => (
  <div style={cardStyle}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ background: `${color}15`, color: color, padding: '10px', borderRadius: '10px', fontSize: '20px' }}>{icon}</div>
    </div>
    <div style={{ marginTop: '10px' }}>
      <p style={{ margin: 0, color: '#64748b', fontSize: '13px', fontWeight: '600' }}>{title}</p>
      <h2 style={{ margin: 0, fontSize: '24px', color: '#1e293b' }}>{value}</h2>
    </div>
  </div>
);
