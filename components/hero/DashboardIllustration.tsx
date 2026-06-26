/**
 * DashboardIllustration
 *
 * A self-contained AI dashboard mock built from inline SVG shapes derived
 * from the supplied public/svg assets (file.svg → FileIcon, globe.svg →
 * GlobeIcon, window.svg → WindowIcon).
 *
 * No external image files or <img> tags — pure JSX SVG so colours inherit
 * CSS variables and the element is fully accessible.
 */

/* ── Inline icon atoms (paths copied verbatim from supplied SVGs) ── */

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z"
        clipRule="evenodd"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g clipPath="url(#globe-clip)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="globe-clip">
          <path fill="currentColor" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function WindowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Mini bar chart (uses only CSS vars) ── */
const BAR_DATA = [35, 55, 42, 70, 58, 85, 64, 92, 75, 100, 88, 95];

function MiniBarChart() {
  return (
    <div className="dash-bar-chart" aria-hidden="true">
      {BAR_DATA.map((h, i) => (
        <div
          key={i}
          className="dash-bar"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 40}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Sparkline SVG (area chart) ── */
function SparkLine() {
  // 10 points, normalised to 60px height, 200px wide
  const points = "0,55 22,45 44,48 66,32 88,38 110,22 132,28 154,14 176,18 198,8";
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="dash-sparkline"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6366f1"/>
          <stop offset="60%"  stopColor="#8b5cf6"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Area */}
      <path
        d={`M0,55 22,45 44,48 66,32 88,38 110,22 132,28 154,14 176,18 198,8 L198,60 L0,60 Z`}
        fill="url(#spark-fill)"
      />
      {/* Line */}
      <polyline
        points={points}
        stroke="url(#spark-grad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Active dot */}
      <circle cx="198" cy="8" r="3" fill="#06b6d4" stroke="#0a0a0f" strokeWidth="1.5"/>
    </svg>
  );
}

/* ── Metric card ── */
interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: React.ReactNode;
  animationDelay?: string;
}

function MetricCard({ label, value, delta, positive, icon, animationDelay = "0ms" }: MetricCardProps) {
  return (
    <div
      className="dash-metric card card-glass card-body-sm animate-fade-in-up"
      style={{ animationDelay }}
      aria-label={`${label}: ${value}`}
    >
      <div className="dash-metric__header">
        <span className="dash-metric__icon icon-box icon-box-accent">{icon}</span>
        <span className={`badge ${positive ? "badge-success" : "badge-error"} dash-metric__delta`}>
          {positive ? "↑" : "↓"} {delta}
        </span>
      </div>
      <p className="dash-metric__value">{value}</p>
      <p className="dash-metric__label">{label}</p>
    </div>
  );
}

/* ── Activity item ── */
interface ActivityItemProps {
  text: string;
  time: string;
  status: "success" | "processing" | "warning";
}

function ActivityItem({ text, time, status }: ActivityItemProps) {
  const dotClass =
    status === "success"    ? "dash-dot dash-dot--success" :
    status === "processing" ? "dash-dot dash-dot--processing" :
                              "dash-dot dash-dot--warning";
  return (
    <li className="dash-activity__item">
      <span className={dotClass} aria-hidden="true" />
      <span className="dash-activity__text">{text}</span>
      <time className="dash-activity__time">{time}</time>
    </li>
  );
}

/* ── Main component ── */
export function DashboardIllustration() {
  return (
    <figure
      className="dashboard-illustration animate-fade-in-right delay-200"
      aria-label="AI automation platform dashboard preview"
      role="img"
    >
      {/* ── Window chrome ── */}
      <div className="dash-chrome" aria-hidden="true">
        <span className="dash-chrome__dot dash-chrome__dot--red" />
        <span className="dash-chrome__dot dash-chrome__dot--yellow" />
        <span className="dash-chrome__dot dash-chrome__dot--green" />
        <span className="dash-chrome__title">
          <WindowIcon className="dash-chrome__icon" />
          Neural Ops · Dashboard
        </span>
      </div>

      {/* ── Dashboard body ── */}
      <div className="dash-body">

        {/* ── Top metrics row ── */}
        <div className="dash-metrics" role="list">
          <MetricCard
            label="Workflows Active"
            value="2,847"
            delta="12%"
            positive={true}
            icon={<GlobeIcon />}
            animationDelay="250ms"
          />
          <MetricCard
            label="Tasks Automated"
            value="94.3K"
            delta="8.1%"
            positive={true}
            icon={<FileIcon />}
            animationDelay="350ms"
          />
          <MetricCard
            label="Avg Response"
            value="142ms"
            delta="23%"
            positive={true}
            icon={<WindowIcon />}
            animationDelay="450ms"
          />
        </div>

        {/* ── Main content grid ── */}
        <div className="dash-grid">

          {/* Chart panel */}
          <div className="dash-panel card card-glass animate-fade-in-up delay-400">
            <div className="dash-panel__header">
              <span className="dash-panel__title text-heading-sm">Automation Throughput</span>
              <span className="badge badge-highlight">Live</span>
            </div>
            <SparkLine />
            <div className="dash-panel__footer">
              <span className="text-caption">Last 30 days</span>
              <span className="text-caption" style={{ color: "var(--clr-emerald-400)" }}>+34.2% vs last month</span>
            </div>
          </div>

          {/* Right column: bar chart + activity */}
          <div className="dash-right-col">

            {/* Bar chart */}
            <div className="dash-panel dash-panel--sm card card-glass animate-fade-in-up delay-300">
              <div className="dash-panel__header">
                <span className="dash-panel__title text-heading-sm">Agent Load</span>
                <span className="badge badge-accent">12 agents</span>
              </div>
              <MiniBarChart />
            </div>

            {/* Activity feed */}
            <div className="dash-panel dash-panel--sm card card-glass animate-fade-in-up delay-500">
              <div className="dash-panel__header">
                <span className="dash-panel__title text-heading-sm">Activity</span>
              </div>
              <ul className="dash-activity" aria-label="Recent activity">
                <ActivityItem text="Pipeline #48 completed"  time="2s ago"  status="success" />
                <ActivityItem text="Agent rebalancing…"      time="14s ago" status="processing" />
                <ActivityItem text="New model deployed"      time="1m ago"  status="success" />
                <ActivityItem text="Rate limit warning"      time="3m ago"  status="warning" />
              </ul>
            </div>

          </div>
        </div>

        {/* ── Status bar ── */}
        <div className="dash-status-bar" aria-hidden="true">
          <span className="dash-status-bar__dot animate-pulse-glow-cyan" />
          <span className="text-caption">All systems operational</span>
          <span className="dash-status-bar__divider" />
          <span className="text-caption">99.98% uptime</span>
          <span className="dash-status-bar__divider" />
          <span className="text-caption">48 regions active</span>
        </div>

      </div>
    </figure>
  );
}
