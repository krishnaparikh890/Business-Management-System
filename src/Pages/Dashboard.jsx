import dashboardData from "../Data/Dashboard.json";
import { Users, ClipboardList, Rocket, Building2 } from "lucide-react";
import { FaUsers, FaClipboardList, FaRocket, FaBuilding } from "react-icons/fa";
 

const icons = {
  users: <FaUsers size={22} />,
  clipboard: <FaClipboardList size={22} />,
  rocket: <FaRocket size={22} />,
  building: <FaBuilding size={22} />,
};

const iconColors = {
  purple: "bg-purple-100 text-purple-500",
  blue: "bg-blue-100 text-blue-500",
  orange: "bg-orange-100 text-orange-500",
  green: "bg-green-100 text-green-500",
};

function StatusBadge({ status }) {
  const styles =
    status === "Approved"
      ? "bg-green-50 text-green-600"
      : status === "Pending"
      ? "bg-orange-50 text-orange-500"
      : "bg-red-50 text-red-600";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function DonutChart({ pending, approved, rejected, total }) {
  const pendingPct = (pending / total) * 100;
  const approvedPct = (approved / total) * 100;
  const rejectedPct = (rejected / total) * 100;

  const approvedStart = pendingPct;
  const rejectedStart = pendingPct + approvedPct;

  const gradient = `conic-gradient(
    #f59e0b 0% ${pendingPct}%,
    #22c55e ${approvedStart}% ${approvedStart + approvedPct}%,
    #ef4444 ${rejectedStart}% ${rejectedStart + rejectedPct}%
  )`;

  return (
    <div
      className="relative w-32 h-32 rounded-full flex items-center justify-center"
      style={{ background: gradient }}
    >
      <div className="absolute w-20 h-20 rounded-full bg-white" />
    </div>
  );
}

export default function Dashboard() {
  const {
    cards = [],
    memo = [],
    staff = [],
    vouchers = [],
    applications = {},
  } = dashboardData|| {};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {card.value}
                </h2>
                <p className="text-gray-400 text-sm mt-1">{card.title}</p>
              </div>
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center ${
                  iconColors[card.color]
                }`}
              >
                {icons[card.icon]}
              </div>
            </div>
            {card.trend && (
              <p
                className={`text-xs flex items-center gap-1 ${
                  card.trendUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {card.trendUp ? "↑" : "↓"} {card.trend}
              </p>
            )}
          </div>
        ))}
      </div>

      
      <div className="grid xl:grid-cols-2 gap-5 mt-6">
        
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-base font-semibold mb-4 text-gray-800">Memo</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-100">
                <th className="py-2 font-medium">S/N</th>
                <th className="py-2 font-medium">Memo Title</th>
                <th className="py-2 font-medium">Sent From</th>
                <th className="py-2 font-medium">Sent To</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {memo.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="py-3 text-gray-500">{item.sn}</td>
                  <td className="py-3 text-gray-700">{item.title}</td>
                  <td className="py-3 text-gray-500">{item.from}</td>
                  <td className="py-3 text-gray-500">{item.to}</td>
                  <td className="py-3">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-base font-semibold mb-4 text-gray-800">
            Staff List
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-100">
                <th className="py-2 font-medium">S/N</th>
                <th className="py-2 font-medium">Staff Name</th>
                <th className="py-2 font-medium">Staff Role</th>
                <th className="py-2 font-medium">Designation</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((person) => (
                <tr
                  key={person.id}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="py-3 text-gray-500">{person.sn}</td>
                  <td className="py-3 text-gray-700">{person.name}</td>
                  <td className="py-3 text-gray-500">{person.role}</td>
                  <td className="py-3 text-gray-500">{person.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      <div className="grid xl:grid-cols-2 gap-5 mt-6">
       
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-base font-semibold mb-4 text-gray-800">
            Payment Vouchers
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-100">
                <th className="py-2 font-medium">S/N</th>
                <th className="py-2 font-medium">Subject</th>
                <th className="py-2 font-medium">Date</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr
                  key={voucher.id}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="py-3 text-gray-500">{voucher.sn}</td>
                  <td className="py-3 text-gray-700">{voucher.subject}</td>
                  <td className="py-3 text-gray-500">{voucher.date}</td>
                  <td className="py-3">
                    <StatusBadge status={voucher.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-base font-semibold mb-6 text-gray-800">
            Staff Applications Card
          </h2>

          <div className="flex items-center justify-between gap-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">
                  {applications.total}
                </span>{" "}
                Total applications
              </p>

              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="font-semibold text-gray-700">
                  {applications.pending}
                </span>
                <span className="text-gray-400">Pending</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="font-semibold text-gray-700">
                  {applications.approved}
                </span>
                <span className="text-gray-400">Approved</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="font-semibold text-gray-700">
                  {applications.rejected}
                </span>
                <span className="text-gray-400">Rejected</span>
              </div>
            </div>

            <DonutChart
              pending={applications.pending}
              approved={applications.approved}
              rejected={applications.rejected}
              total={applications.total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}