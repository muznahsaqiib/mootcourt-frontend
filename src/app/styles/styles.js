// src/app/styles/styles.js

const styles = {
    container: "min-h-screen z-[1] overflow-hidden bg-stone-50/80 text-neutral-900",

    // ── NAVBAR ──
    navbar: "flex justify-between items-center px-8 py-3 mb-6 bg-white/90 backdrop-blur-xl border-b border-rose-100 shadow-sm fixed top-0 left-0 right-0 z-50",
    logo: "text-2xl font-bold text-neutral-900 no-underline hover:opacity-75 transition-opacity duration-200",

    // ── DROPDOWNS ──
    dropdownBtn: "flex items-center gap-2 bg-rose-800 text-stone-50 px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-rose-900 hover:shadow-md active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-1",
    dropdownMenu: "absolute mt-2 right-0 w-52 bg-white border border-rose-100 rounded-xl shadow-xl z-50 backdrop-blur-xl overflow-hidden animate-fade-in-down",
    dropdownItem: "w-full text-left px-4 py-2.5 text-sm text-neutral-700 font-medium hover:bg-rose-50 hover:text-rose-800 transition-colors duration-150",

    // ── BUTTONS ──
    primaryBtn: "inline-flex items-center justify-center gap-2 bg-rose-800 text-stone-50 px-6 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-rose-900 hover:shadow-md active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-1",
    secondaryBtn: "inline-flex items-center justify-center gap-2 border border-rose-300 text-rose-800 bg-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-rose-50 hover:border-rose-500 active:scale-95 transition-all duration-200",

    // ── HERO ──
    heroTitle: "text-4xl md:text-5xl font-bold bg-gradient-to-br from-rose-800 via-rose-700 to-rose-900 bg-clip-text text-transparent mb-5 leading-tight tracking-tight",
    heroSubtext: "text-lg md:text-xl text-stone-500 mb-8 leading-relaxed max-w-xl mx-auto",
    heromain: "flex flex-col items-center justify-center px-6 py-20 pt-32 text-center",

    // ── TOGGLE ──
    toggleContainer: "relative inline-flex bg-rose-50 border border-rose-200 rounded-lg p-1 shadow-inner text-sm font-medium",
    toggleBtn: "relative z-10 px-6 py-2 rounded-md transition-all duration-200 font-medium",
    toggleActive: "text-rose-800 bg-white shadow border border-rose-200",
    toggleInactive: "text-stone-500 hover:text-rose-600",

    // ── MODAL ──
    modalOverlay: "fixed inset-0 bg-rose-950/20 backdrop-blur-sm flex items-center justify-center z-50",
    modalBox: "bg-white text-neutral-900 rounded-2xl p-10 shadow-2xl border border-rose-100 relative max-w-lg w-full",
    modalClose: "absolute top-3 right-4 text-xl font-bold text-stone-400 hover:text-rose-600 cursor-pointer transition-colors duration-150",

    // ── SECTIONS ──
    vrImg: "rounded-2xl shadow-lg overflow-hidden w-full h-64 bg-rose-50 border border-rose-100 flex items-center justify-center text-stone-400",
    box: "flex items-center gap-4 bg-white rounded-2xl shadow border border-rose-100 px-6 py-5 w-80 hover:bg-rose-50 hover:border-rose-300 hover:shadow-md hover:-translate-y-1 transition-all duration-250 cursor-pointer",
    evaluationBox: "bg-white rounded-2xl shadow border border-rose-100 p-8 flex flex-col justify-between h-full",
    evaluationItem: "space-y-3 text-neutral-700 text-base leading-relaxed list-disc list-inside",
    chartBox: "bg-white border border-rose-100 rounded-2xl shadow p-8 flex flex-col justify-between h-full",
    demoBox: "relative overflow-hidden rounded-2xl shadow-lg w-full max-w-4xl mx-auto aspect-video bg-rose-50 border-2 border-dashed border-rose-200 flex items-center justify-center text-stone-400",

    // ── FOOTER ──
    footer: "bg-rose-900 text-stone-100 py-8 mt-20",
    footer_div: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    footer_items: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0",

    // ── LOADING SPINNER ──
    LoadingSpinner: "fixed inset-0 z-[9999] bg-white/60 backdrop-blur-sm flex items-center justify-center",
    loadingDiv: "w-16 h-16 border-[3px] border-rose-100 border-t-rose-600 rounded-full animate-spin",
    div: "absolute inset-0 flex items-center justify-center pointer-events-none",
};

export default styles;