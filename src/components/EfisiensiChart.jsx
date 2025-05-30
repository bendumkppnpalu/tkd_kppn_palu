import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const EfisiensiChart = ({ data, isMobile }) => {
  // Warna pie
  const COLORS = ['#facc15', '#fbbf24', '#f59e0b'];

  // Hitung efisiensi
  const processedData = data.map((item) => {
    const efisiensi =
      item.semula && item.menjadi
        ? ((item.semula - item.menjadi) / item.semula) * 100
        : 0;

    return {
      jenis_tkd: item.jenis_tkd,
      efisiensi: parseFloat(efisiensi.toFixed(2)),
    };
  });

  // Pie Chart untuk mobile
  if (isMobile) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md mt-8">
        <h2 className="text-xl font-semibold mb-2 text-center">Efisiensi Anggaran TKD (%)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={processedData}
              dataKey="efisiensi"
              nameKey="jenis_tkd"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {processedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Bar Chart untuk desktop
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Efisiensi Anggaran TKD (%)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={processedData}>
          <XAxis dataKey="jenis_tkd" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Bar dataKey="efisiensi" fill="#facc15" name="Efisiensi (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EfisiensiChart;
