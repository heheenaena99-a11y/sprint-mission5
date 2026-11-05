import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/assessments"
      className="text-[15px] font-bold text-link hover:underline"
    >
      ←&nbsp;&nbsp;평가 목록
    </Link>
  );
}
