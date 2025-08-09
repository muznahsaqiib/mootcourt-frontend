'use client';

import Link from 'next/link';
import { CASE_DETAILS_ROUTE } from '../../utils/routes.constant';
export default function CaseCard({ item }) {
  return (
    <Link href={CASE_DETAILS_ROUTE(item.id)} className="no-underline">
      <div className="p-6 rounded-xl bg-rose-100 border border-stone-200 shadow-md transition-all duration-300 ease-in-out 
        transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">

        <h3 className="text-xl font-semibold text-stone-800 mb-2 tracking-tight">
          {item.title}
        </h3>

        <p className="text-sm text-stone-700">
          Case Type:{' '}
          <span className="text-rose-800 font-medium">
            {item.case_type}
          </span>
        </p>
      </div>
    </Link>
  );
}
