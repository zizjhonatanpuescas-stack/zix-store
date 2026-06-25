export default function Skeleton({ className = '' }) { return <div className={`animate-pulse rounded-[2rem] bg-black/5 ${className}`} />; }
export function ProductSkeletons() { return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-96" />)}</div>; }
