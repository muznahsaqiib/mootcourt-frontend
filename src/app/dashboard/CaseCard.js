'use client';

import Link from 'next/link';
import { CASE_DETAILS_ROUTE } from '../../utils/routes.constant';

export default function CaseCard({ item }) {
  return (
    <Link href={CASE_DETAILS_ROUTE(item.id)} className="no-underline block group h-full">
      <div className="relative flex flex-col h-full min-h-[180px] p-6 rounded-2xl
        bg-rose-100 border border-rose-200 shadow-sm overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-rose-400 hover:bg-rose-200">

        {/* Top accent bar on hover */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-rose-600 to-rose-300
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Case type badge */}
        <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full self-start
          bg-rose-200 border border-rose-300 text-rose-800 text-xs font-semibold tracking-wider uppercase">
          <span>⚖️</span>
          {item.case_type || 'Civil'}
        </div>

        {/* Title — grows to fill space so all cards stay same height */}
        <h3 className="flex-1 text-lg font-semibold text-stone-800 leading-snug tracking-tight
          group-hover:text-rose-900 transition-colors duration-200">
          {item.title}
        </h3>

        {/* Footer */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-rose-200">
          <div className="flex-1 h-px bg-gradient-to-r from-rose-300 to-transparent" />
          <span className="text-xs font-semibold tracking-widest text-rose-400
            group-hover:text-rose-700 transition-colors duration-200">
            VIEW CASE →
          </span>
        </div>

      </div>
    </Link>
  );
}